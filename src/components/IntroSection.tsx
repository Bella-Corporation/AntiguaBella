import PropertyPicture from "@/components/PropertyPicture";
import { antiguaBellaAbout } from "@/data/antiguabellaMedia";

const IntroSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 md:gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary/60 mb-4">The Platform</p>
            <h2 data-reveal="slide-up" data-reveal-delay="220" className="luxury-heading mb-5 text-[clamp(1.85rem,7vw,2.15rem)] leading-[1.15] text-foreground md:mb-7 md:text-4xl lg:text-[2.75rem] lg:leading-[1.18]">
              Access Without
              <br />
              <span className="italic">Compromise</span>
            </h2>
            <div data-reveal="fade" data-reveal-delay="340" className="luxury-divider mx-0 mb-5 md:mb-7" />
            <div data-reveal="slide-up" data-reveal-delay="420">
              <p className="luxury-body text-muted-foreground mb-5">
                AntiguaBella is a luxury villa rental brand in Antigua. Two
                exceptional residences — AntiguaBella and AntiguaSoleil — are
                available exclusively by personal inquiry. No booking engines,
                no automated confirmations.
              </p>
              <p className="luxury-body text-muted-foreground/60 mb-5 text-[14px] leading-[1.8]">
                Submit your requirements and we review, confirm availability,
                and coordinate every detail with you directly.
              </p>
              <p className="luxury-body text-muted-foreground/40 text-[13px]">
                No noise. No compromise. Just the island, at its finest.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/15">
            <div data-reveal="settle" data-reveal-delay="350">
              <PropertyPicture
                photo={antiguaBellaAbout}
                alt={antiguaBellaAbout.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                pictureClassName="block w-full"
                className="aspect-[4/3] h-auto w-full object-cover object-[center_45%] sm:aspect-auto sm:h-[380px] lg:h-[560px] lg:object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
