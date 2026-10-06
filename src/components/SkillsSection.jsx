import { useState } from "react";
import { Code2, Database, GitBranch } from "lucide-react";

const groups = [
  { name: "Frontend", icon: Code2, description: "The interface people see and use.", tools: ["HTML / CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap"] },
  { name: "Backend", icon: Database, description: "The systems behind the experience.", tools: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
  { name: "Tools", icon: GitBranch, description: "The everyday toolkit that makes it happen.", tools: ["Git / GitHub", "Vercel", "Notion", "VS Code"] },
];

export const SkillsSection = () => {
  const [filter, setFilter] = useState("All");
  const shown = groups.filter((group) => filter === "All" || filter === group.name);
  return <section id="skills" className="editorial-section stack-section" aria-labelledby="skills-title"><span className="section-watermark" aria-hidden="true">BUILD</span><div className="section-shell">
    <div className="section-heading"><div><p className="section-kicker"><span>03 /</span> THE TOOLKIT</p><h2 id="skills-title">Good ideas.<br /><em>The tools to build them.</em></h2></div><p className="section-intro">From the first interface to the final deployment,<br />these are the technologies I work with.</p></div>
    <div className="skill-filters" role="group" aria-label="Filter technologies">{["All", ...groups.map((g) => g.name)].map((name) => <button key={name} aria-pressed={filter === name} aria-controls="skill-results" onClick={() => setFilter(name)}>{name}</button>)}</div>
    <p className="sr-only" role="status">Showing {filter === "All" ? "all 13 technologies" : `${shown[0].tools.length} ${filter.toLowerCase()} technologies`}</p>
    <div id="skill-results" className={`stack-grid ${filter !== "All" ? "stack-filtered" : ""}`}>
      {shown.map(({ name, icon: Icon, description, tools }) => <article className="stack-card" key={name}><div className="stack-card-top"><Icon size={25} aria-hidden="true" /><span className="small-label">{tools.length} TOOLS</span></div><h3>{name}</h3><p>{description}</p><ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></article>)}
    </div>
  </div></section>;
};
