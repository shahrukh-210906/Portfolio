import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const Home = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [motionEnabled, setMotionEnabled] = useState(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    try { return localStorage.getItem("portfolio-motion") !== "off"; } catch { return true; }
  });
  useEffect(() => {
    try { localStorage.setItem("portfolio-motion", motionEnabled ? "on" : "off"); } catch { /* Motion control remains available. */ }
  }, [motionEnabled]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { if (media.matches) setMotionEnabled(false); };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const targets = [...document.querySelectorAll(".studio-ribbon, #skills")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-in-view", entry.isIntersecting)));
    targets.forEach((target) => observer.observe(target));
    const visibility = () => document.documentElement.classList.toggle("page-hidden", document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect(); targets.forEach((target) => target.classList.remove("is-in-view"));
      document.removeEventListener("visibilitychange", visibility);
      document.documentElement.classList.remove("page-hidden");
    };
  }, []);
  useEffect(() => {
    const sections = [...document.querySelectorAll("main > section[id]")];
    let scheduled = 0;
    const update = () => {
      scheduled = 0;
      const line = Math.min(window.innerHeight * 0.3, 220);
      const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= line);
      setActiveSection(current?.id || "hero");
    };
    const onScroll = () => { if (!scheduled) scheduled = requestAnimationFrame(update); };
    const initialTarget = sections.find((section) => `#${section.id}` === window.location.hash);
    if (initialTarget) initialTarget.scrollIntoView({ behavior: "instant", block: "start" });
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(scheduled); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  useEffect(() => {
    if (!motionEnabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = [...document.querySelectorAll(".section-heading, .section-kicker, .project-card, .about-portrait, .about-copy, .practice-grid article, .stack-card, .contact-copy, .contact-form")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    elements.forEach((element) => {
      element.classList.add("scroll-reveal");
      if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add("is-revealed");
      else observer.observe(element);
    });
    return () => { observer.disconnect(); elements.forEach((element) => element.classList.remove("scroll-reveal", "is-revealed")); };
  }, [motionEnabled]);
  return (
    <div className={`portfolio-shell ${motionEnabled ? "motion-enabled" : "motion-paused"}`}>
      <a className="skip-link" href="#projects">Skip to selected work</a>
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
      <div className="studio-rail" aria-hidden="true"><span>SHAHRUKH / CREATIVE DEVELOPMENT</span><span>{String(["hero", "projects", "about", "skills", "contact"].indexOf(activeSection) + 1).padStart(2,"0")} / 05</span></div>
      <main>
        <HeroSection motionEnabled={motionEnabled} />
        <div className="studio-ribbon"><p className="sr-only">Web development, visual stories, and ideas brought to life.</p><div className="ribbon-track" aria-hidden="true">{[0,1,2,3].map((i) => <span key={i}>CREATIVE DEVELOPMENT <b className="ribbon-star" /> VISUAL STORIES <b className="ribbon-star" /> IDEAS INTO EXPERIENCES <b className="ribbon-star" /></span>)}</div></div>
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
      <button className="motion-toggle" onClick={() => setMotionEnabled((value) => !value)} aria-label={motionEnabled ? "Pause animations" : "Resume animations"}>{motionEnabled ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}<span>Motion {motionEnabled ? "on" : "off"}</span></button>
    </div>
  );
};
