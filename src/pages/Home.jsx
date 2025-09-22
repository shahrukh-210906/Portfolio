import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useInView } from "react-intersection-observer";
import { StarBackground } from "@/components/StarBackground";
import { DayBackground } from "@/components/DayBackground";

const SectionObserver = ({ id, children, setActiveSection }) => {
  const { ref } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) {
        setActiveSection(id);
      }
    },
  });

  return <div ref={ref}>{children}</div>;
};

export const Home = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <div className="min-h-screen bg-transparent text-foreground overflow-x-hidden">
      {theme === 'dark' ? <StarBackground /> : <DayBackground />}
      
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <SectionObserver id="hero" setActiveSection={setActiveSection}>
          <HeroSection theme={theme} />
        </SectionObserver>
        <SectionObserver id="about" setActiveSection={setActiveSection}>
          <AboutSection theme={theme} />
        </SectionObserver>
        <SectionObserver id="skills" setActiveSection={setActiveSection}>
          <SkillsSection theme={theme} />
        </SectionObserver>
        <SectionObserver id="projects" setActiveSection={setActiveSection}>
          <ProjectsSection theme={theme} />
        </SectionObserver>
        <SectionObserver id="contact" setActiveSection={setActiveSection}>
          <ContactSection theme={theme} />
        </SectionObserver>
      </main>

      <Footer />
    </div>
  );
};