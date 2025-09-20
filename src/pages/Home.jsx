import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { useInView } from "react-intersection-observer";

// This component is now defined outside of Home for stability
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

export const Home = () => {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarBackground />
      <Navbar activeSection={activeSection} />
      
      <main>
        <SectionObserver id="hero" setActiveSection={setActiveSection}>
          <HeroSection />
        </SectionObserver>
        <SectionObserver id="about" setActiveSection={setActiveSection}>
          <AboutSection />
        </SectionObserver>
        <SectionObserver id="skills" setActiveSection={setActiveSection}>
          <SkillsSection />
        </SectionObserver>
        <SectionObserver id="projects" setActiveSection={setActiveSection}>
          <ProjectsSection />
        </SectionObserver>
        <SectionObserver id="contact" setActiveSection={setActiveSection}>
          <ContactSection />
        </SectionObserver>
      </main>

      <Footer />
    </div>
  );
};