import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CharacterCanvas } from "./CharacterCanvas";
import { HeroCursor } from "./HeroCursor";

export const HeroSection = () => (
  <section id="hero" className="tracking-hero" aria-labelledby="hero-title">
    <CharacterCanvas />
    <HeroCursor />
    <div className="hero-topline" aria-hidden="true"><span>MOHD SHAHRUKH</span><span>DEVELOPMENT / FILM</span></div>
    <div className="hero-copy">
      <p className="hero-eyebrow">Hi, I’m</p>
      <h1 id="hero-title">Mohd <span>Shahrukh.</span></h1>
      <p className="hero-bio">Web developer. Visual storyteller.<br />I build responsive, accessible websites<br className="hero-desktop-break" /> and bring ideas to life through film.</p>
      <div className="hero-actions">
        <a className="hero-button hero-button-solid" href={`${import.meta.env.BASE_URL}resume/Resume.pdf`} target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={18} aria-hidden="true" /></a>
        <a className="hero-button hero-button-glass" href="#contact">Let’s talk <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </div>
    <a className="hero-scroll" href="#projects"><span>EXPLORE MY WORK</span><ArrowDown size={18} aria-hidden="true" /></a>
    <span className="hero-edition" aria-hidden="true">CODE MEETS CREATIVITY</span>
  </section>
);
