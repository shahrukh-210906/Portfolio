import { ArrowUp } from "lucide-react";

export const Footer = () => <footer className="site-footer"><div className="section-shell footer-inner"><a className="footer-brand" href="#hero" aria-label="Mohd Shahrukh — home">MS<span>.</span></a><p>© {new Date().getFullYear()} Mohd Shahrukh.<br /><span>Built with curiosity. Made with care.</span></p><a className="footer-top" href="#hero">Back to top <ArrowUp size={18} aria-hidden="true" /></a></div></footer>;
