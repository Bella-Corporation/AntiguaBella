import { useRef } from "react";
import resortAerial from "@/assets/resort-aerial.jpg";

const IntroSection = () => {
  const ref = useRef(null);

  return (
    <section id="about" className="section-padding bg-background">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <p className="luxury-subheading text-primary/60 mb-4">The Platform</p>
            <h2 className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-7">
              Access Without
              <br />
              <span className="italic">Compromise</span>
            </h2>
            <div className="luxury-divider mx-0 mb-7" />
            <p className="luxury-body text-muted-foreground mb-5">
              AntiguaBella connects discerning travelers to a handpicked
              collection of Antigua's most extraordinary stays, experiences,
              and private services.
            </p>
            <p className="luxury-body text-muted-foreground/50 text-[13px]">
              No noise. No compromise. Just the island, at its finest.
            </p>
          </div>

          <div>
            <div className="rounded-2xl overflow-hidden border border-border/15">
              <img
                src={resortAerial}
                alt="Aerial view of Antigua's coastline"
                className="w-full h-[460px] lg:h-[560px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
