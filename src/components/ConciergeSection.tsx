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
    <section id="concierge" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-28 lg:mb-36">
          <p className="luxury-subheading text-primary/60 mb-6">The Concierge</p>
          <h2 className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-10">
            Your Antigua,
            <br />
            <span className="italic">Designed</span>
          </h2>
          <div className="luxury-divider mb-10" />
          <p className="luxury-body text-muted-foreground max-w-md mx-auto">
            Every journey through AntiguaBella begins with understanding.
            We design around you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 lg:gap-20 max-w-5xl mx-auto">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center">
              <div className="w-11 h-11 mx-auto mb-7 rounded-full border border-border/30 flex items-center justify-center">
                <pillar.icon className="w-[18px] h-[18px] text-primary/60" strokeWidth={1.2} />
              </div>
              <h3 className="luxury-heading text-lg lg:text-xl text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="luxury-body text-muted-foreground text-[13px] max-w-[260px] mx-auto">
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
