import { Moon, Sun } from "lucide-react";

const items = [{ name: "Work", href: "#projects" }, { name: "About", href: "#about" }, { name: "Contact", href: "#contact" }];

export const Navbar = ({ activeSection, theme, toggleTheme }) => (
  <nav className={`hero-nav ${activeSection === "hero" ? "on-hero" : ""}`} aria-label="Main navigation">
    <a className="nav-monogram" href="#hero" aria-label="Mohd Shahrukh — home">MS<span>.</span></a>
    <div className="nav-pill">
      {items.map((item) => <a key={item.href} href={item.href} aria-current={item.href === `#${activeSection}` ? "location" : undefined}>{item.name}</a>)}
    </div>
    <button className="nav-theme" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  </nav>
);
