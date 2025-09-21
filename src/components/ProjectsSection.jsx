import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Portfolio Landing Page",
    description: "A beautiful landing page app using React and Tailwind.",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "Vite"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "scortIQ",
    description:"An AI-powered learning platform for Indian students, offering personalized tutoring for the NCERT curriculum.",
    image: "/projects/project2.png",
    tags: ["React", "Tailwind", "Node.js"],
    demoUrl: "https://scort-iq.vercel.app/",
    githubUrl: "https://github.com/shahrukh-210906/scortIQ",
  },
  {
    id: 3,
    title: "RCB Fan Page",
    description:
      "A dynamic, animated fan website celebrating the Royal Challengers Bangalore's fictional 2025 IPL championship victory.",
    image: "/projects/project3.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://shahrukh-210906.github.io/RCB-FAN-PAGE/",
    githubUrl: "https://github.com/shahrukh-210906/RCB-FAN-PAGE.git",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group rounded-lg overflow-hidden shadow-sm bg-card/60 dark:bg-card/20 backdrop-blur-md border border-border/50 dark:border-border/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors"
                  >
                    <ExternalLink size={28} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors"
                  >
                    <Github size={28} />
                  </a>
                </div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs font-medium border rounded-full bg-primary/20 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2"> {project.title}</h3>
                <p className="text-muted-foreground text-sm flex-grow">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/shahrukh-210906"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};