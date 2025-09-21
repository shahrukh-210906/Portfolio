import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "JavaScript", level: 80, category: "frontend", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "React", level: 80, category: "frontend", url: "https://react.dev/" },
  { name: "Tailwind CSS", level: 80, category: "frontend", url: "https://tailwindcss.com/" },
  { name: "Bootstrap", level: 85, category: "frontend", url: "https://getbootstrap.com/" },

  // Backend
  { name: "Node.js", level: 70, category: "backend", url: "https://nodejs.org/" },
  { name: "Express", level: 75, category: "backend", url: "https://expressjs.com/" },
  { name: "MongoDB", level: 70, category: "backend", url: "https://www.mongodb.com/" },
  { name: "PostgreSQL", level: 65, category: "backend", url: "https://www.postgresql.org/" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools", url: "https://git-scm.com/" },
  { name: "Vercel", level: 70, category: "tools", url: "https://vercel.com/" },
  { name: "Notion", level: 70, category: "tools", url: "https://www.notion.so/" },
  { name: "VS Code", level: 95, category: "tools", url: "https://code.visualstudio.com/" },
];

const categories = ["all", "frontend", "backend", "tools"];

const getSkillLevel = (level) => {
  if (level >= 90) return "Pro";
  if (level >= 80) return "Intermediate";
  return "Beginner";
};

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

export const SkillsSection = () => {
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
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize cursor-pointer",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
              className="p-6 rounded-lg bg-card/60 dark:bg-card/20 backdrop-blur-md shadow-sm border border-border/50 dark:border-border/20 text-left block transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              variants={skillVariants}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg group-hover:text-primary">
                  {skill.name}
                </h3>
                <span className="text-sm font-semibold text-primary">
                  {getSkillLevel(skill.level)}
                </span>
              </div>
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