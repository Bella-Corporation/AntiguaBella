import { Compass, MessageSquare, Map } from "lucide-react";

const pillars = [
  {
    icon: MessageSquare,
    title: "Personal Concierge",
    description: "A single point of contact who understands your preferences and handles every detail before you arrive.",
  },
  {
    icon: Compass,
    title: "Curated Itineraries",
    description: "Tailored day-by-day plans built around your pace, your interests, and the island's best-kept offerings.",
  },
  {
    icon: Map,
    title: "Island Intelligence",
    description: "An evolving guide to Antigua's finest — from secluded beaches to private dining, updated by locals who know.",
  },
];

const ConciergeSection = () => {
  return (
    <section id="concierge" className="section-padding bg-background">
      <div data-reveal="slide-up" className="mx-auto max-w-7xl">
        <div className="text-center mb-14 lg:mb-20">
          <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary/60 mb-4">The Concierge</p>
          <h2 data-reveal="slide-up" data-reveal-delay="220" className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-7">
            Your Antigua,
            <br />
            <span className="italic">Designed</span>
          </h2>
          <div data-reveal="fade" data-reveal-delay="340" className="luxury-divider mb-7" />
          <p data-reveal="slide-up" data-reveal-delay="420" className="luxury-body text-muted-foreground max-w-md mx-auto">
            Every journey through AntiguaBella begins with understanding.
            We design around you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 lg:gap-20 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} data-reveal="slide-up" data-reveal-delay={String(520 + i * 100)} className="text-center">
              <div className="w-16 h-16 mx-auto mb-7 rounded-full border border-border/30 flex items-center justify-center">
                <pillar.icon className="w-7 h-7 text-primary/60" strokeWidth={1.2} />
              </div>
              <h3 className="luxury-heading text-xl lg:text-2xl text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="font-light text-muted-foreground/60 text-[14px] leading-[1.7] max-w-[280px] mx-auto">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConciergeSection;
