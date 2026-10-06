import { useEffect, useRef } from "react";

export function HeroCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const dot = ref.current;
    const section = dot.closest("section");
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const move = (event) => {
      if (!media.matches || event.pointerType === "touch") return;
      const rect = section.getBoundingClientRect();
      dot.style.transform = `translate(${event.clientX - rect.left}px, ${event.clientY - rect.top}px)`;
      dot.classList.add("is-visible");
      dot.classList.toggle("is-hovering", Boolean(event.target.closest("a, button")));
    };
    const hide = () => dot.classList.remove("is-visible");
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", hide);
    media.addEventListener("change", hide);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", hide);
      media.removeEventListener("change", hide);
    };
  }, []);
  return <div className="hero-cursor" ref={ref} aria-hidden="true"><span /></div>;
}
