
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const HeroSection = ({ theme }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Mohd
            </span>
            <span className="opacity-0 animate-fade-in"> Shahrukh</span>
            <br />
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2 ">
              {" "}
              WEB
            </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              DEVELOPER
            </span>
            
          </h1>

          <div className="pt-4 flex gap-4 justify-center opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className={cn(
              "px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95",
              theme === 'dark'
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                : "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/40"
            )}>
              My Work
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