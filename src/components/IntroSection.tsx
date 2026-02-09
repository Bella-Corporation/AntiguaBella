import { useRef, useEffect, useState } from "react";
import resortAerial from "@/assets/resort-aerial.jpg";

const IntroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay slightly so the slide feels intentional
          setTimeout(() => setVisible(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
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

          <div className="overflow-hidden">
            <div
              className="rounded-2xl overflow-hidden border border-border/15"
              style={{
                transform: visible ? "translateX(0)" : "translateX(100%)",
                transition: "transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
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
