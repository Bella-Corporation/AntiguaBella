import { Instagram, Facebook, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "X / Twitter" },
];

const ResortFooter = () => {
  return (
    <footer id="begin" className="border-t border-border/10 text-foreground">
      {/* Newsletter / Begin section */}
      <div className="section-padding">
        <div className="mx-auto max-w-7xl text-center">
          <div>
            <p className="luxury-subheading text-primary/60 mb-6">Begin</p>
            <h2 className="luxury-heading text-[1.7rem] md:text-[2.2rem] lg:text-[2.5rem] text-foreground mb-10 leading-[1.2]">
              Ready When <span className="italic">You Are</span>
            </h2>
            <p className="luxury-body text-muted-foreground mb-14 max-w-sm mx-auto">
              Leave your details. Our concierge will reach out personally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-border/30 rounded-none px-5 py-3.5 text-[13px] text-foreground placeholder:text-muted-foreground/35 focus:border-primary/25 focus:outline-none transition-all duration-300"
              />
              <button className="luxury-btn-outline py-3.5 px-8 whitespace-nowrap press-feedback">
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Combined footer */}
      <div className="border-t border-border/8 py-16 lg:py-20 px-6 lg:px-12 mx-auto">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left — Brand + Contact */}
          <div className="text-center md:text-left">
            <p className="luxury-heading text-lg mb-2">
              Antigua<span className="gold-text">Bella</span>
            </p>
            <p className="luxury-body text-muted-foreground/50 text-[12px] mb-4">
              © 2025 AntiguaBella
            </p>
            <a
              href="mailto:concierge@antiguabella.com"
              className="luxury-btn-outline py-2.5 px-6 text-[9px]"
            >
              Contact
            </a>
          </div>

          {/* Center — Social */}
          <div className="flex flex-col items-center gap-4">
            <p className="luxury-subheading text-primary/50 text-[10px]">Follow</p>
            <div className="flex gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-muted-foreground/30 hover:text-primary transition-colors duration-400"
                >
                  <social.icon size={18} strokeWidth={1.3} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Legal */}
          <div className="flex gap-8">
            {["Privacy", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="luxury-subheading text-[9px] text-muted-foreground/30 hover:text-primary/40 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResortFooter;
