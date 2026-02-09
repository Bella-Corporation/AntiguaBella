import { Instagram, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X / Twitter" },
];

const ResortFooter = () => {
  return (
    <footer id="begin" className="border-t border-border/10 text-foreground">
      {/* Newsletter / Begin section */}
      <div className="section-padding">
        <div data-reveal="slide-up" className="mx-auto max-w-7xl text-center">
          <div>
            <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary/60 mb-5">Begin</p>
            <h2 data-reveal="slide-up" data-reveal-delay="220" className="luxury-heading text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] text-foreground mb-8 leading-[1.15]">
              Ready When <span className="italic">You Are</span>
            </h2>
            <p data-reveal="slide-up" data-reveal-delay="340" className="luxury-body text-muted-foreground mb-10 max-w-md mx-auto text-[18px]">
              Leave your details. Our concierge will reach out personally.
            </p>
            <div data-reveal="fade" data-reveal-delay="460" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-border/30 rounded-none px-5 py-4 text-[15px] text-foreground placeholder:text-muted-foreground/35 focus:border-primary/25 focus:outline-none transition-all duration-300"
              />
              <button className="luxury-btn-outline py-4 px-10 whitespace-nowrap press-feedback text-[12px]">
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Combined footer */}
      <div data-reveal="fade" data-reveal-delay="200" className="border-t border-border/8 py-6 px-6 lg:px-12 mx-auto">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <p className="luxury-heading text-sm">
              Antigua<span className="gold-text">Bella</span>
            </p>
            <span className="text-muted-foreground/30 text-[11px]">© 2021</span>
            <a
              href="mailto:concierge@antiguabella.com"
              className="text-muted-foreground/40 hover:text-primary text-[10px] uppercase tracking-[0.2em] transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          <a href="#" aria-label="Instagram" className="social-icon-gold p-2">
            <Instagram size={16} strokeWidth={1.3} />
          </a>
          <a href="#" aria-label="Facebook" className="social-icon-gold p-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="social-icon-gold p-2">
            <Twitter size={16} strokeWidth={1.3} />
          </a>

          <div className="flex gap-6">
            {["Privacy", "Sitemap", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 hover:text-primary/40 transition-colors duration-300"
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
