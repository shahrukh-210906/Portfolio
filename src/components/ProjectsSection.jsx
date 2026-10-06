import { ArrowUpRight, Github, Route, Dumbbell, Compass, CalendarDays, MessagesSquare, GraduationCap, Trophy, Music2, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

const projects = [
  { title: "Trip Expense Tracker", type: "TRAVEL / FULL STACK", icon: Route, description: "Shared trips, expenses, and a group kitty in one place. Tracks who paid, splits costs, and calculates settlement, with offline saving and live updates.", tags: ["React", "Express", "MongoDB", "Socket.IO"], source: "https://github.com/shahrukh-210906/trip-expense-tracker", detail: "Shared expenses. Clear settlements." },
  { title: "LiftEat", type: "FITNESS / FULL STACK", icon: Dumbbell, description: "A fitness companion for workout and food logs, lifting progress, and AI coaching informed by the account’s own activity.", tags: ["React", "TypeScript", "Express", "MongoDB"], source: "https://github.com/shahrukh-210906/LiftEat", detail: "Train. Log. Understand your progress." },
  { title: "WonderLust", type: "TRAVEL / FULL STACK", icon: Compass, description: "A place to discover your next escape. A web platform for listing, exploring, and booking unique travel accommodations.", tags: ["Node.js", "Express", "MongoDB"], demo: "https://wonderlust-7m5h.onrender.com/", source: "https://github.com/shahrukh-210906/WONDERLUST", detail: "Discover your next escape." },
  { title: "BookIt", type: "SCHEDULING / FULL STACK", icon: CalendarDays, description: "Faculty and student dashboards for managing availability and booking appointments, with separate sign-in experiences and appointment updates.", tags: ["React", "Vite", "QR scanning"], source: "https://github.com/shahrukh-210906/BOOKIT", detail: "Less back-and-forth. More time to meet." },
  { title: "Twiller", type: "SOCIAL / FULL STACK", icon: MessagesSquare, description: "A social feed project with post composition, profile editing, and authentication, built with a Next.js interface and an Express backend.", tags: ["Next.js", "TypeScript", "Firebase", "Express"], source: "https://github.com/shahrukh-210906/twiller", detail: "A space for posts and conversations." },
  { title: "scortIQ", type: "EDUCATION / AI", icon: GraduationCap, description: "Personalized tutoring for Indian students, with an AI-powered learning experience built around the NCERT curriculum.", tags: ["React", "Tailwind CSS", "Node.js"], demo: "https://scort-iq.vercel.app/", source: "https://github.com/shahrukh-210906/scortIQ", detail: "Learning, with a little more guidance." },
  { title: "RCB Fan Page", type: "SPORT / INTERACTION", icon: Trophy, description: "An animated fan experience for Royal Challengers Bangalore, bringing team spirit to the web through motion and interaction.", tags: ["HTML", "CSS", "JavaScript"], demo: "https://shahrukh-210906.github.io/RCB-FAN-PAGE/", source: "https://github.com/shahrukh-210906/RCB-FAN-PAGE", detail: "Built around the energy of the game." },
  { title: "Spotify Clone", type: "MUSIC / INTERFACE STUDY", icon: Music2, description: "A Spotify-inspired interface study with a library sidebar, playlist cards, and music-player layout, built in HTML and CSS.", tags: ["HTML", "CSS", "Layout design"], source: "https://github.com/shahrukh-210906/SPOTIFY-CLONE", detail: "An exploration of a familiar listening UI." },
  { title: "Mood Manager", type: "WELLBEING / WEB EXPERIENCE", icon: Heart, description: "A mood-based web experience with separate happy, sad, and angry pages, offering reflections and interactive reminders.", tags: ["HTML", "CSS", "JavaScript"], source: "https://github.com/shahrukh-210906/Mood-Manager", detail: "A small moment to pause and reflect." },
];

export const ProjectsSection = ({ motionEnabled = true }) => {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const progressBar = progressRef.current;
    if (!motionEnabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = [...section.querySelectorAll(".work-choreography")];
    let raf = 0, visible = false;
    const update = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
      progressBar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => { if (!raf && visible) raf = requestAnimationFrame(update); };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("work-entered"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    section.classList.add("work-motion-ready");
    targets.forEach((target) => observer.observe(target));
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    visibility.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      observer.disconnect(); visibility.disconnect(); cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      section.classList.remove("work-motion-ready");
      targets.forEach((target) => target.classList.remove("work-entered"));
      progressBar.style.transform = "scaleX(1)";
    };
  }, [motionEnabled]);
  return (
  <section ref={sectionRef} id="projects" className="editorial-section work-section" aria-labelledby="work-title"><span className="section-watermark" aria-hidden="true">WORK</span>
    <div className="section-shell">
      <div className="work-ledger work-choreography"><span>SELECTED PROJECTS</span><span>01 — {String(projects.length).padStart(2, "0")}</span><div className="work-progress" aria-hidden="true"><span ref={progressRef} /></div></div>
      <div className="section-heading work-choreography">
        <div><p className="section-kicker"><span>01 /</span> SELECTED WORK</p><h2 id="work-title"><span className="work-title-mask"><span>Ideas, brought</span></span><span className="work-title-mask"><em>to life.</em></span></h2></div>
        <p className="section-intro">A selection of websites I’ve built.<br />Different challenges. One focus:<br />thoughtful, useful experiences.</p>
      </div>
      <nav className="work-index work-choreography" aria-label="Jump to a project">{projects.map((project, index) => <a key={project.title} href={`#work-project-${index + 1}`}><span>0{index + 1}</span>{project.title}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</nav>
      <div className="project-grid work-project-list">
        {projects.map((project, index) => <article id={`work-project-${index + 1}`} key={project.title} style={{ "--work-direction": index % 2 === 0 ? "1" : "-1" }} className="project-card work-choreography work-project-row">
          <div className="work-project-identity" aria-hidden="true"><span className="work-row-number">{String(index + 1).padStart(2, "0")}</span><project.icon size={28} strokeWidth={1.2} /><span className="work-row-rule" /></div>
          <div className="project-info">
            <p className="small-label">{project.type}</p><h3><span>{project.title}</span></h3><p className="project-description">{project.description}</p>
            <ul className="tag-list" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </div>
          <div className="work-row-actions"><p>{project.detail}</p><div className="project-links">{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live site (opens a new tab)`}><span className="work-link-window"><span>View live site</span><span aria-hidden="true">Explore project</span></span><ArrowUpRight size={18} aria-hidden="true" /></a>}<a href={project.source} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source on GitHub (opens a new tab)`}><Github size={17} aria-hidden="true" /><span className="work-link-window"><span>View source</span><span aria-hidden="true">Open GitHub</span></span><ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
          <span className="work-row-sweep" aria-hidden="true" />
        </article>)}
      </div>
      <a className="text-link work-more work-choreography" href="https://github.com/shahrukh-210906" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={18} aria-hidden="true" /></a>
    </div>
  </section>
  );
};
