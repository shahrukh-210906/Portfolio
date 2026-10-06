import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFound = () => <main className="not-found"><div className="section-shell"><p className="section-kicker"><span>404 /</span> A LITTLE DETOUR</p><h1>This page took<br /><em>a different path.</em></h1><p>The page you’re looking for isn’t here. My work is just a click away.</p><Link className="text-link" to="/"><ArrowLeft size={18} aria-hidden="true" /> Back to the portfolio</Link></div></main>;
