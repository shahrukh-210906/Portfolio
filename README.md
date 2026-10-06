# Mohd Shahrukh — Portfolio

React 18, Vite, Tailwind CSS. Existing projects, skills, and theme support, with a red editorial hero inspired by the supplied cursor-tracking tutorial.

## Run

```
npm ci
npm run dev
npm run build
```

## Character assets

The supplied 10-second character video has been processed into 64 directional WebP frames plus a neutral pose (about 3 MB total). The renderer activates only when a complete frame manifest and all 65 images load; it falls back to the MS monogram if any asset is missing.

1. Put the finished identity-consistent directional video at `source-assets/character.mp4`.
2. Install offline preparation tools: `pip install opencv-python numpy`.
3. Run `python scripts/prepare_character.py source-assets/character.mp4 --inspect` and inspect the timestamped contact sheet.
4. Identify UP, UP-RIGHT, RIGHT, DOWN-RIGHT, DOWN, DOWN-LEFT, LEFT, UP-LEFT, and the return to UP, plus a neutral center timestamp. Supply those actual timestamps as nine `--anchors` values and `--center`. Do not guess timings.
5. Run extraction with those values. `--face X Y` sets the face center in normalized source coordinates; verify it against the actual image. The script writes 64 WebP frames, `center.webp`, and `manifest.json` under `public/frames/`, and samples the flat background color from the neutral image's corners.
6. Verify direction mapping, cropping, background seams, and identity continuity on desktop and mobile before publishing. The current video returns through neutral between upper-left and up; that sector follows the source motion rather than inventing a continuous circular turn.

The browser never loads or seeks the MP4. It preloads stills, follows the shortest circular angular path at a time-adjusted response factor, and draws exactly one opaque frame. The center deadzone uses the face coordinates after cover scaling/cropping. Touch and reduced-motion users see the neutral frame. Observers and listeners clean up on unmount; animation work pauses when hidden or outside the viewport.

The glass navigation provides Work, About, and Contact links at all sizes. Résumé links use the built public PDF. Contact links use the displayed contact information. The contact form opens an email draft rather than falsely claiming delivery; a visitor must send it in their email application.

Reproduce the included frames:

python scripts/prepare_character.py source-assets/character.mp4 --anchors 1.25 2.55 3.55 4.65 5.75 6.95 8.05 8.95 11.25 --center 0 --face 0.49 0.43

The last timestamp extends past the 10-second duration and wraps to the beginning. The source background is a red gradient; frames preserve it. Mobile uses a bottom fade into the sampled edge color.
