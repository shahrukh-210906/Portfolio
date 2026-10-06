# Mohd Shahrukh — Portfolio

React 18, Vite, Tailwind CSS. Existing projects, skills, and theme support, with a red editorial design throughout inspired by the supplied cursor-tracking tutorial.

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

python scripts/prepare_character.py source-assets/character.mp4 --anchors 1.25 2.55 3.55 4.65 5.45 6.95 8.05 8.95 11.25 --center 0 --face 0.49 0.43 --skip-interval 5.7 6.2

The last timestamp extends past the 10-second duration and wraps to the beginning. The source background is a red gradient; frames preserve it. Mobile uses a bottom fade into the sampled edge color.

## Portfolio design

An editorial design spans the whole site: bright crimson and deep burgundy palettes, serif headings, red accents, and consistent surfaces. Selected work follows the character hero, with a wide featured project and two secondary cards. Live and source links remain visible on touch devices. About combines the supplied character portrait with development and film interests. Skills are organized by category, with accessible keyboard-operated filters and announced results. Contact provides direct links and a labeled email-draft form; the footer and 404 page use the same design system.

The old animated star/day backgrounds and percentage skill meters are no longer rendered. Theme preferences persist, reduced motion is supported, and a skip link leads to selected work. Browser checks cover 320/375-pixel mobile and 1280-pixel desktop layouts, both themes, navigation, skill filters, and required-field validation without sending a message.

Motion includes a scrolling studio ribbon, staggered scroll reveals, rotating stars, icon movement, project-preview rotation, portrait zoom, arrow feedback, and hero text entrance. A persistent Motion toggle pauses decorative motion and character tracking. Reduced-motion settings are respected; looping effects pause offscreen and when the tab is hidden. All content stays readable with motion paused. Decorative lettering is hidden from screen readers.

The earlier assets cropped the original video's right edge at x=1120 to exclude the Gemini mark from all 65 poses. The face position becomes 0.56, 0.43. Use --crop-right 1120 during extraction. Section backgrounds reuse mirrored clean background pixels from the original footage, preserving its warm red palette.

### Enhanced character media
The supplied 24 FPS source is cleaned in a small empty-background region rather than cropped, preserving its full 1280×720 framing. `scripts/enhance_character.py` uses lossless intermediate frames, motion-compensated interpolation to 60 FPS, Lanczos upscaling to 1920×1080, and H.264 encoding. This is an enhanced source, not newly generated native 1080p detail.

The current hero uses 96 directional WebP poses at 1280×720, sampled from the enhanced timeline, plus the neutral pose. This keeps browser memory below that of preloading 96 full-HD frames. Pointer geometry is cached instead of reading layout on every pointer movement, and frames are decoded before the animation becomes ready. Existing pause, visibility and reduced-motion controls still apply.

Extraction: `python scripts/prepare_character.py ../../outputs/character-enhanced-1080p60.mp4 --anchors 1.25 2.55 3.55 4.65 5.45 6.95 8.05 8.95 11.25 --center 0 --face 0.49 0.43 --skip-interval 5.7 6.2 --frame-count 96 --max-width 1280`

### Work section
Nine public projects are curated from the GitHub account: Trip Expense Tracker, LiftEat, WonderLust, BookIt, Twiller, scortIQ, RCB Fan Page, Spotify Clone and Mood Manager. Descriptions and technologies for the six additions were checked against public README files, manifests and source structure. Source-only projects do not receive invented live links. Screenshot previews are removed from the Work markup.

Work has its own reveal observer, independent of the other sections: masked title slides, alternating row entrances, delayed descriptions/tags/actions, rolling link labels, and a hover/focus background sweep. A horizontally scrollable project index links to stable rows. Motion pauses when requested and reduced-motion visitors see content immediately.
