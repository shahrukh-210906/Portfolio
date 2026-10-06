import { ArrowUpRight, Code2, Clapperboard } from "lucide-react";

export const AboutSection = () => (
  <section id="about" className="editorial-section about-section" aria-labelledby="about-title"><span className="section-watermark" aria-hidden="true">STORY</span>
    <div className="section-shell">
      <p className="section-kicker"><span>02 /</span> A LITTLE ABOUT ME</p>
      <div className="about-grid">
        <div className="about-portrait"><img src={`${import.meta.env.BASE_URL}frames/center.webp`} alt="Stylized portrait of Mohd Shahrukh" loading="lazy" width="1280" height="720" /><span>MOHD SHAHRUKH / DEVELOPER & STORYTELLER</span></div>
        <div className="about-copy"><h2 id="about-title">A developer’s mind.<br /><em>A storyteller’s eye.</em></h2>
          <p>I’m Mohd Shahrukh, a web developer and tech enthusiast with a love for filmmaking. I build responsive, accessible web applications and enjoy finding elegant solutions to complex problems.</p>
          <p>Whether I’m writing code or capturing a frame, I care about the details that make an experience feel right. I’m always exploring new tools and learning better ways to bring ideas to life.</p>
          <a className="text-link" href={`${import.meta.env.BASE_URL}resume/Resume.pdf`} target="_blank" rel="noopener noreferrer">Read my résumé <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="practice-grid">
        <article><Code2 size={26} aria-hidden="true" /><div><h3>Built for the web.</h3><p>Responsive interfaces and modern applications, with usability and performance in mind.</p></div></article>
        <article><Clapperboard size={26} aria-hidden="true" /><div><h3>Seen through a lens.</h3><p>Capturing visuals and telling stories through film. A creative perspective that carries into my work.</p></div></article>
      </div>
    </div>
  </section>
);
