import { Award, KeyRound, Globe, Star } from "lucide-react";

const accolades = [
  { name: "Condé Nast Gold List", detail: "2024 & 2025", icon: Award },
  { name: "Michelin Keys", detail: "Two Keys Distinction", icon: KeyRound },
  { name: "TripAdvisor", detail: "Travelers' Choice 2025", icon: Globe },
  { name: "Forbes Travel Guide", detail: "Five-Star Rating", icon: Star },
];

const AwardsSection = () => {
  return (
    <section className="section-padding bg-card border-t border-border/10">
      <div data-reveal="slide-up" className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary/60 mb-6">Recognition</p>
          <h2 data-reveal="slide-up" data-reveal-delay="220" data-scroll-cue className="luxury-heading text-[1.7rem] md:text-[2.2rem] lg:text-[2.5rem] text-foreground leading-[1.2]">
            World-Class <span className="italic">Accolades</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14 max-w-5xl mx-auto">
          {accolades.map((award, i) => (
            <div key={award.name} data-reveal="slide-up" data-reveal-delay={String(380 + i * 90)} className="text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-border/30 flex items-center justify-center">
                <award.icon className="w-6 h-6 text-primary/60" strokeWidth={1.2} />
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
          <div className="luxury-divider mb-14" />
          <p className="font-light text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem] text-foreground/50 italic leading-[1.7] mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            "A rare platform that understands the difference between
            luxury and excess. Antigua, finally done right."
          </p>
          <p className="luxury-subheading text-[10px] text-primary/40">
            — Condé Nast Traveler
          </p>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
