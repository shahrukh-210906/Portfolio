import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  { title: "WonderLust", type: "TRAVEL & DISCOVERY", description: "A place to discover your next escape. A web platform for listing, exploring, and booking unique travel accommodations.", image: "project1.png", tags: ["Node.js", "Express", "MongoDB"], demo: "https://wonderlust-7m5h.onrender.com/", source: "https://github.com/shahrukh-210906/WONDERLUST" },
  { title: "scortIQ", type: "EDUCATION & AI", description: "Personalized tutoring for Indian students, with an AI-powered learning experience built around the NCERT curriculum.", image: "project2.png", tags: ["React", "Tailwind CSS", "Node.js"], demo: "https://scort-iq.vercel.app/", source: "https://github.com/shahrukh-210906/scortIQ" },
  { title: "RCB Fan Page", type: "SPORT & INTERACTION", description: "An animated fan experience for Royal Challengers Bangalore, bringing team spirit to the web through motion and interaction.", image: "project3.png", tags: ["HTML", "CSS", "JavaScript"], demo: "https://shahrukh-210906.github.io/RCB-FAN-PAGE/", source: "https://github.com/shahrukh-210906/RCB-FAN-PAGE" },
];

export const ProjectsSection = () => (
  <section id="projects" className="editorial-section work-section" aria-labelledby="work-title"><span className="section-watermark" aria-hidden="true">WORK</span>
    <div className="section-shell">
      <div className="section-heading">
        <div><p className="section-kicker"><span>01 /</span> SELECTED WORK</p><h2 id="work-title">Ideas, brought<br /><em>to life.</em></h2></div>
        <p className="section-intro">A selection of websites I’ve built.<br />Different challenges. One focus:<br />thoughtful, useful experiences.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => <article key={project.title} className={`project-card ${index === 0 ? "project-featured" : ""}`}>
          <div className={`project-preview preview-${index}`}>
            <div className="preview-browser"><div className="browser-bar" aria-hidden="true"><span /><span /><span /><div>{project.title.toLowerCase().replaceAll(" ", "")}</div></div>
              <img src={`${import.meta.env.BASE_URL}projects/${project.image}`} alt={`${project.title} website preview`} loading="lazy" width="1280" height="720" />
            </div>
            <span className="project-number" aria-hidden="true">0{index + 1}</span>
          </div>
          <div className="project-info">
            <p className="small-label">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p>
            <ul className="tag-list" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <div className="project-links"><a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live site (opens a new tab)`}>View live site <ArrowUpRight size={18} aria-hidden="true" /></a><a href={project.source} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source on GitHub (opens a new tab)`}><Github size={17} aria-hidden="true" /> Source</a></div>
          </div>
        </article>)}
      </div>
      <a className="text-link work-more" href="https://github.com/shahrukh-210906" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={18} aria-hidden="true" /></a>
    </div>
  </section>
);
