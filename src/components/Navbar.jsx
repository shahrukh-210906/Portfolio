import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = ({ activeSection, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isMenuOpen]);

  const mobileMenuVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };
  
  const activePillHref = hoveredHref || `#${activeSection}`;

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-40 transition-all duration-300 top-0 bg-white/30 dark:bg-card/20 backdrop-blur-md shadow-sm border-b border-white/50 dark:border-border/20",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <a
            className="text-xl font-bold text-primary flex items-center"
            href="#hero"
          >
            <span className="relative z-10">
              Portfolio
            </span>
          </a>

          <div 
            className="hidden md:flex space-x-2 relative items-center"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                onMouseEnter={() => setHoveredHref(item.href)}
              >
                <span className={cn(
                    "relative z-10",
                    activePillHref === item.href ? "text-white" : "text-foreground/80"
                )}>
                  {item.name}
                </span>
                
                {activePillHref === item.href && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-6 w-6 text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-foreground z-50"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed inset-0 bg-white/30 dark:bg-card/20 backdrop-blur-md z-40 flex flex-col items-center justify-center md:hidden"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-5 right-5 p-2 text-foreground z-50"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col space-y-8 text-2xl items-center">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-8 w-8 text-yellow-400" />
                  ) : (
                    <Moon className="h-8 w-8 text-gray-600" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};