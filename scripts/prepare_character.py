"""Inspect a character video, then extract 64 clockwise WebP poses + center.

pip install opencv-python numpy
python scripts/prepare_character.py public/character.mp4 --inspect
python scripts/prepare_character.py public/character.mp4 --anchors 0.5 1 1.5 2 2.5 3 3.5 4 4.5 --center 5

Anchor times must be visually verified: UP, UP-RIGHT, RIGHT, DOWN-RIGHT,
DOWN, DOWN-LEFT, LEFT, UP-LEFT, UP again. Do not assume uniform video timing.
"""
import argparse
import json
from pathlib import Path
import cv2
import numpy as np

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("video", type=Path)
parser.add_argument("--inspect", action="store_true")
parser.add_argument("--anchors", nargs=9, type=float)
parser.add_argument("--center", type=float)
parser.add_argument("--face", nargs=2, type=float, default=[0.5, 0.4], help="Face center as fractions of source width/height")
parser.add_argument("--output", type=Path, default=Path("public/frames"))
parser.add_argument("--max-width", type=int, default=1440)
args = parser.parse_args()
cap = cv2.VideoCapture(str(args.video))
if not cap.isOpened():
    parser.error(f"Cannot open video: {args.video}")
fps = cap.get(cv2.CAP_PROP_FPS)
count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
if fps <= 0 or count < 2:
    parser.error("Video has no usable timeline")
duration = (count - 1) / fps
print(json.dumps({"fps": fps, "frames": count, "duration": duration, "width": int(cap.get(3)), "height": int(cap.get(4))}, indent=2))

def read_at(second):
    cap.set(cv2.CAP_PROP_POS_FRAMES, round(second * fps) % count)
    ok, frame = cap.read()
    if not ok:
        raise RuntimeError(f"Cannot decode frame at {second}s")
    return frame

if args.inspect:
    # 36 timestamped samples for visual identification of the directional anchors.
    tiles = []
    for second in np.linspace(0, duration, 36):
        frame = read_at(float(second))
        scale = min(240 / frame.shape[1], 180 / frame.shape[0])
        small = cv2.resize(frame, None, fx=scale, fy=scale)
        tile = np.zeros((210, 240, 3), dtype=np.uint8)
        y, x = (180-small.shape[0])//2, (240-small.shape[1])//2
        tile[y:y+small.shape[0], x:x+small.shape[1]] = small
        cv2.putText(tile, f"{second:.3f}s / frame {round(second * fps)}", (6, 198), cv2.FONT_HERSHEY_SIMPLEX, .42, (255,255,255), 1)
        tiles.append(tile)
    sheet = np.vstack([np.hstack(tiles[i:i+6]) for i in range(0,36,6)])
    path = args.video.parent / "character-contact-sheet.jpg"
    if not cv2.imwrite(str(path), sheet):
        raise RuntimeError("Cannot write contact sheet")
    print(f"Inspect the contact sheet: {path}")
else:
    if args.anchors is None or args.center is None:
        parser.error("Extraction requires 9 visually verified --anchors and --center")
    if not (all(0 <= t <= duration for t in args.anchors[:-1]) and 0 <= args.center <= duration and 0 <= args.anchors[-1] <= duration + count/fps):
        parser.error("Pose times must be within the video timeline")
    if not all(0 <= n <= 1 for n in args.face) or args.max_width < 1:
        parser.error("Invalid face coordinates or output width")
    args.output.mkdir(parents=True, exist_ok=True)
    center = read_at(args.center)
    # Flat-background reference color: median of four corner patches.
    h, w = center.shape[:2]
    patch = max(1, min(h, w)//40)
    corners = np.concatenate([center[:patch,:patch].reshape(-1,3), center[:patch,-patch:].reshape(-1,3), center[-patch:,:patch].reshape(-1,3), center[-patch:,-patch:].reshape(-1,3)])
    b, g, r = np.median(corners, axis=0).astype(int)
    background = f"#{r:02x}{g:02x}{b:02x}"
    def write(name, frame):
        if frame.shape[1] > args.max_width:
            frame = cv2.resize(frame, (args.max_width, round(frame.shape[0]*args.max_width/frame.shape[1])), interpolation=cv2.INTER_AREA)
        if not cv2.imwrite(str(args.output/name), frame, [cv2.IMWRITE_WEBP_QUALITY, 92]):
            raise RuntimeError(f"Cannot write {name}")
    write("center.webp", center)
    names = []
    for index in range(64):
        segment, step = divmod(index, 8)
        second = args.anchors[segment] + (args.anchors[segment+1]-args.anchors[segment])*step/8
        name = f"frame-{index:02d}.webp"
        write(name, read_at(second))
        names.append(name)
    # Publish the manifest only after every frame was successfully written.
    manifest = {"enabled": True, "background": background, "face": args.face, "center": "center.webp", "frames": names}
    (args.output/"manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Prepared 64 directional frames + center in {args.output}; background {background}")
cap.release()

