import { useEffect, useRef, useState } from "react";

const TAU = Math.PI * 2;
const loadImage = (url) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = url;
});

export function CharacterCanvas({ motionEnabled = true }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [posterReady, setPosterReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const canvas = canvasRef.current;
    const section = canvas.closest("section");
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const controller = new AbortController();
    let disposed = false;
    let frames, center, manifest, raf = 0, angle = 0, target = 0;
    let neutral = true, visible = true, previous = -2, lastTime = 0;
    let width = 0, height = 0;

    const draw = (image) => {
      const scale = Math.max(width / image.width, height / image.height);
      context.fillStyle = manifest.background;
      context.fillRect(0, 0, width, height);
      context.drawImage(image, (width - image.width * scale) / 2, 0, image.width * scale, image.height * scale);
    };
    const tick = (time) => {
      raf = 0;
      if (disposed || !frames || !visible || document.hidden) return;
      const delta = Math.atan2(Math.sin(target - angle), Math.cos(target - angle));
      const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16.67;
      angle += delta * (1 - Math.pow(0.74, elapsed / 16.67));
      lastTime = time;
      const index = neutral || !motionEnabled || motion.matches || !fine.matches ? -1 : Math.round(((angle % TAU + TAU) % TAU) / TAU * frames.length) % frames.length;
      if (index !== previous) { draw(index < 0 ? center : frames[index]); previous = index; canvas.dataset.frame = String(index); }
      if (!neutral && motionEnabled && !motion.matches && fine.matches && Math.abs(delta) > 0.001) raf = requestAnimationFrame(tick);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Resizing clears canvas pixels even when offscreen; keep a complete still painted.
      if (center && manifest) draw(previous >= 0 ? frames[previous] : center);
      previous = -2; schedule();
    };
    const move = (event) => {
      if (!motionEnabled || !manifest || event.pointerType === "touch" || motion.matches || !fine.matches) return;
      const rect = canvas.getBoundingClientRect();
      const scale = Math.max(rect.width / center.width, rect.height / center.height);
      const dx = event.clientX - rect.left - ((rect.width - center.width * scale) / 2 + center.width * scale * manifest.face[0]);
      const dy = event.clientY - rect.top - (center.height * scale * manifest.face[1]);
      neutral = Math.hypot(dx, dy) < Math.min(rect.width, rect.height) * 0.12;
      // Frame zero is UP; positive angles move clockwise through the compass.
      target = Math.atan2(dy, dx) + Math.PI / 2;
      schedule();
    };
    const reset = () => { neutral = true; previous = -2; schedule(); };
    const visibility = () => { lastTime = 0; schedule(); };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; lastTime = 0; schedule(); });
    resizeObserver.observe(canvas); observer.observe(section);
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset); fine.addEventListener("change", reset);
    document.addEventListener("visibilitychange", visibility);
    fetch(`${import.meta.env.BASE_URL}frames/manifest.json`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("No character frames"); return response.json(); })
      .then(async (data) => {
        if (data.enabled === false) return;
        if (data.frames?.length !== 64 || !/^#[0-9a-f]{6}$/i.test(data.background) || !Array.isArray(data.face) || data.face.length !== 2 || !data.face.every((n) => Number.isFinite(n) && n >= 0 && n <= 1)) throw new Error("Invalid character manifest");
        const base = `${import.meta.env.BASE_URL}frames/`;
        const images = await Promise.all([loadImage(base + data.center), ...data.frames.map((name) => loadImage(base + name))]);
        if (disposed) return;
        manifest = data; [center, ...frames] = images;
        section.style.setProperty("--hero-red", manifest.background);
        resize(); draw(center); setReady(true);
      })
      .catch(() => { /* Missing/incomplete assets keep the intentional monogram fallback. */ });
    return () => {
      disposed = true; controller.abort(); cancelAnimationFrame(raf);
      resizeObserver.disconnect(); observer.disconnect();
      section.removeEventListener("pointermove", move); section.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset); fine.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [motionEnabled]);

  return <>
    <canvas ref={canvasRef} className={`hero-character ${ready ? "is-ready" : ""}`} aria-hidden="true" />
    {!ready && <img className="hero-character hero-poster" src={`${import.meta.env.BASE_URL}frames/center.webp`} alt="" onLoad={() => setPosterReady(true)} onError={() => setPosterReady(false)} />}
    {!ready && !posterReady && <div className="hero-monogram" aria-hidden="true"><span className="monogram-outline">MS</span><span className="monogram-label">BUILDING DIGITAL EXPERIENCES</span></div>}
  </>;
}
