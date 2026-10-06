import { ArrowUpRight, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { toast } = useToast();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}`);
    window.location.href = `mailto:buddy2196@hotmail.com?subject=${subject}&body=${body}`;
    toast({ title: "Continue in your email app", description: "Review and send the draft. If your email app did not open, use the email link." });
  };
  return <section id="contact" className="editorial-section contact-section" aria-labelledby="contact-title"><span className="section-watermark" aria-hidden="true">HELLO</span><div className="section-shell">
    <p className="section-kicker"><span>04 /</span> LET’S MAKE SOMETHING</p>
    <div className="contact-grid">
      <div className="contact-copy"><h2 id="contact-title">Have an idea?<br /><em>Let’s talk.</em></h2><p>A website, a collaboration, or just a conversation.<br />I’d love to hear what you have in mind.</p>
        <a className="contact-email" href="mailto:buddy2196@hotmail.com">buddy2196@hotmail.com <ArrowUpRight size={24} aria-hidden="true" /></a>
        <ul className="contact-details"><li><Phone size={16} aria-hidden="true" /><a href="tel:+919548254478">+91 9548254478</a></li><li><MapPin size={16} aria-hidden="true" /><span>Woxsen University, Hyderabad</span></li></ul>
        <div className="social-links"><a href="https://github.com/shahrukh-210906" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens a new tab)"><Github size={19} /></a><a href="https://www.linkedin.com/in/mohd-shahrukh-913b2b36b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens a new tab)"><Linkedin size={19} /></a><a href="https://www.instagram.com/shahrukh_210906" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens a new tab)"><Instagram size={19} /></a></div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} aria-label="Prepare an email enquiry"><h3>Start a conversation.</h3><p id="form-help">Write a little about your idea. This opens an email draft for you to review and send.</p>
        <label htmlFor="name">Your name<input id="name" name="name" required autoComplete="name" placeholder="How should I call you?" maxLength={100} /></label>
        <label htmlFor="email">Email address<input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" maxLength={254} /></label>
        <label htmlFor="message">What do you have in mind?<textarea id="message" name="message" required rows={4} placeholder="Tell me a little about your project…" maxLength={2000} /></label>
        <button className="design-button" type="submit" aria-describedby="form-help"><Mail size={18} aria-hidden="true" /> Open email draft <ArrowUpRight size={18} aria-hidden="true" /></button>
      </form>
    </div>
  </div></section>;
};
