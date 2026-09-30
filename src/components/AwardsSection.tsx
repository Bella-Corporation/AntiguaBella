import { Link } from "react-router-dom";
import { Award, KeyRound, Globe, Star } from "lucide-react";

const accolades = [
  { name: "Private Selection", detail: "Two exceptional villas, curated for discerning travelers", icon: Award },
  { name: "Inquiry-Led Model", detail: "Manual review before availability is confirmed", icon: KeyRound },
  { name: "Personal Coordination", detail: "Every stay is arranged and followed up directly", icon: Globe },
  { name: "Calm Route Clarity", detail: "Public surfaces prioritize accurate intent", icon: Star },
];

const AwardsSection = () => {
  return (
    <section className="section-padding bg-card border-t border-border/10">
      <div data-reveal="slide-up" className="mx-auto max-w-7xl">
        <div className="mb-8 text-center md:mb-12">
          <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary/60 mb-6">Principles</p>
          <h2 data-reveal="slide-up" data-reveal-delay="220" className="luxury-heading text-[clamp(1.55rem,6.5vw,1.85rem)] leading-[1.2] text-foreground md:text-[2.2rem] lg:text-[2.5rem]">
            What Guides <span className="italic">AntiguaBella</span>
          </h2>
        </div>

        <div className="mx-auto mb-10 grid max-w-5xl grid-cols-1 gap-7 sm:mb-14 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {accolades.map((award, i) => (
            <div key={award.name} data-reveal="slide-up" data-reveal-delay={String(380 + i * 90)} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border/30 md:mb-6 md:h-14 md:w-14">
                <award.icon className="h-5 w-5 text-primary/60 md:h-6 md:w-6" strokeWidth={1.2} />
              </div>
              <h3 className="luxury-heading text-lg lg:text-xl text-foreground mb-2">
                {award.name}
              </h3>
              <p className="font-light text-muted-foreground/50 text-[13px]">
                {award.detail}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal="fade" data-reveal-delay="700" className="text-center">
          <div className="luxury-divider mb-8 md:mb-14" />
          <p className="mx-auto mb-6 max-w-xl text-[1.05rem] font-light italic leading-[1.65] text-foreground/50 md:mb-8 md:text-[1.3rem] md:leading-[1.7] lg:text-[1.5rem]" style={{ fontFamily: "'Playfair Display', serif" }}>
            "Deliberate curation, calm communication, and concierge-led follow-through."
          </p>
          <p className="luxury-subheading text-[10px] text-primary/40 mb-8 md:mb-10">
            — AntiguaBella v0.0.1
          </p>
          <Link to="/request" className="luxury-btn-bold inline-block">
            Begin Your Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
