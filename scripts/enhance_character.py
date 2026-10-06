"""Enhance supplied footage, preserving framing and cleaning its logo area."""
from pathlib import Path
import sys, subprocess, cv2, numpy as np
sys.path.insert(0,str(Path('../../work/media-tools').resolve()))
import imageio_ffmpeg
cap=cv2.VideoCapture('source-assets/character.mp4')
writer=cv2.VideoWriter('source-assets/character-clean.avi',cv2.VideoWriter_fourcc(*'FFV1'),24,(1280,720))
mask=np.zeros((720,1280),np.uint8)
cv2.rectangle(mask,(1130,568),(1192,636),255,-1)
count=0
while True:
    ok,frame=cap.read()
    if not ok:break
    # Inpaint only a small empty-background region; retain all character pixels.
    frame=cv2.inpaint(frame,mask,9,cv2.INPAINT_TELEA)
    writer.write(frame);count+=1
writer.release();cap.release()
assert count==240
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
subprocess.run([ffmpeg,'-hide_banner','-y','-i','source-assets/character-clean.avi','-vf','minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,scale=1920:1080:flags=lanczos,unsharp=5:5:0.35:5:5:0','-t','10','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart','../../outputs/character-enhanced-1080p60.mp4'],check=True)
print('Enhanced export complete')

