import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";


export const ContactSection = ({ theme }) => {
  const { toast } = useToast();


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}`);
    window.location.href = `mailto:buddy2196@hotmail.com?subject=${subject}&body=${body}`;
    toast({ title: "Email draft opened", description: "Review and send your message in your email app." });  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-transparent">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I&apos;m always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              {" "}
              Contact Information
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium text-start"> Email</h4>
                  <a
                    href="mailto:buddy2196@hotmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    buddy2196@hotmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium text-start"> Phone</h4>
                  <a
                    href="tel:+919548254478"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 9548254478
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium text-start"> Location</h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Woxsen University, Hyderabad
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a href="https://www.linkedin.com/in/mohd-shahrukh-913b2b36b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin />
                </a>
                <a href="https://www.instagram.com/shahrukh_210906" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram/>
                </a>
              </div>
            </div>
          </div>

          <div
            className="p-8 rounded-lg shadow-sm bg-card/60 dark:bg-card/20 backdrop-blur-md border border-border/50 dark:border-border/20"
          >
            <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

            <p className="text-sm mb-6">This opens your email app with a draft for you to review and send.</p><form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Mohd Shahrukh..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="buddy2196@hotmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"

                className={cn(
                  "w-full flex items-center justify-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95",
                  theme === 'dark'
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    : "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/40"
                )}
              >
                Open Email Draft
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
