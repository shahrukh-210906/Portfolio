import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> HI, I'M</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              SHAH RUKH
            </span>
            <br />
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2 ">
              {" "}
              DEVELOPER.
            </span>
          </h1>

          <div className="pt-4 flex gap-4 justify-center opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button-gradient">
              My Work
            </a>
            <a href="#contact" className="cosmic-button-outline">
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};