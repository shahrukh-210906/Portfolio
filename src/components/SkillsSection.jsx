import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Code, Cpu, Server, Puzzle, GitGraph, AppWindow, CodeXml, Languages, Database, Feather } from "lucide-react";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", icon: <CodeXml /> },
  { name: "JavaScript", level: 80, category: "frontend", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: <Languages /> },
  { name: "React", level: 80, category: "frontend", url: "https://react.dev/", icon: <Cpu /> },
  { name: "Tailwind CSS", level: 80, category: "frontend", url: "https://tailwindcss.com/", icon: <Puzzle /> },
  { name: "Bootstrap", level: 85, category: "frontend", url: "https://getbootstrap.com/", icon: <Puzzle /> },

  // Backend
  { name: "Node.js", level: 70, category: "backend", url: "https://nodejs.org/", icon: <Server /> },
  { name: "Express", level: 75, category: "backend", url: "https://expressjs.com/", icon: <Server /> },
  { name: "MongoDB", level: 70, category: "backend", url: "https://www.mongodb.com/", icon: <Database /> },
  { name: "PostgreSQL", level: 65, category: "backend", url: "https://www.postgresql.org/", icon: <Database /> },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools", url: "https://git-scm.com/", icon: <GitGraph /> },
  { name: "Vercel", level: 70, category: "tools", url: "https://vercel.com/", icon: <AppWindow /> },
  { name: "Notion", level: 70, category: "tools", url: "https://www.notion.so/", icon: <Feather /> },
  { name: "VS Code", level: 95, category: "tools", url: "https://code.visualstudio.com/", icon: <Code /> },
];


const categories = ["all", "frontend", "backend", "tools"];

// Animation variants for Framer Motion
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const skillVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export const SkillsSection = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-transparent" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 capitalize cursor-pointer",
                activeCategory === category
                  ? theme === 'dark'
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/40"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredSkills.map((skill) => (
            <motion.a
              key={skill.name}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-card/60 dark:bg-card/20 backdrop-blur-md shadow-sm border border-border/50 dark:border-border/20 text-center block transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              variants={skillVariants}
            >
              <div className="flex justify-center items-center mb-4 text-primary">
                {skill.icon}
              </div>
              <h3 className="font-semibold text-lg group-hover:text-primary mb-2">
                {skill.name}
              </h3>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-primary h-2 rounded-full origin-left"
                  initial={{ width: "0%" }}
                  animate={{ width: inView ? `${skill.level}%` : "0%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};