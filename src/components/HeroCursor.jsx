import { useEffect, useRef } from "react";

export function HeroCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const dot = ref.current;
    const section = dot.closest("section");
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let rect = section.getBoundingClientRect(), raf = 0, x = 0, y = 0;
    const refreshRect = () => { rect = section.getBoundingClientRect(); };
    const paint = () => { raf = 0; dot.style.transform = `translate(${x}px, ${y}px)`; };
    const resizeObserver = new ResizeObserver(refreshRect);
    resizeObserver.observe(section);
    const move = (event) => {
      if (!media.matches || event.pointerType === "touch") return;
      x = event.clientX - rect.left; y = event.clientY - rect.top;
      if (!raf) raf = requestAnimationFrame(paint);
      dot.classList.add("is-visible");
      dot.classList.toggle("is-hovering", Boolean(event.target.closest("a, button")));
    };
    const hide = () => dot.classList.remove("is-visible");
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", hide);
    media.addEventListener("change", hide);
    window.addEventListener("scroll", refreshRect, { passive: true });
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", hide);
      media.removeEventListener("change", hide);
      window.removeEventListener("scroll", refreshRect);
      resizeObserver.disconnect(); cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="hero-cursor" ref={ref} aria-hidden="true"><span /></div>;
}
