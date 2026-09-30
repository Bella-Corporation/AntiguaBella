import PropertyPicture from "@/components/PropertyPicture";
import { sharedCoastAerial } from "@/data/sharedMedia";

const IslandSection = () => {
  return (
    <section id="island" className="section-padding bg-background" aria-labelledby="island-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal="slide-up" className="lg:col-span-5">
          <p className="luxury-subheading mb-4 text-primary">Antigua</p>
          <h2
            id="island-heading"
            className="luxury-heading mb-5 text-[clamp(1.85rem,7vw,2.15rem)] leading-[1.15] text-foreground md:mb-7 md:text-4xl lg:text-[2.75rem] lg:leading-[1.18]"
          >
            The island
            <br />
            <span className="italic">around the stay</span>
          </h2>
          <div className="luxury-divider mx-0 mb-5 md:mb-7" />
          <p className="luxury-body mb-5 text-muted-foreground">
            Harbors, open water, and green hills are the setting for a stay in Antigua.
            The residences sit in that landscape. Time on the water, in town, or along
            the shore is arranged through the same personal inquiry.
          </p>
        </div>

        <div className="overflow-hidden lg:col-span-7">
          <div data-reveal="settle" data-reveal-delay="160">
            <PropertyPicture
              photo={sharedCoastAerial}
              alt={sharedCoastAerial.alt}
              sizes="(min-width: 1024px) 58vw, 100vw"
              pictureClassName="block w-full"
              className="aspect-[3/2] h-auto w-full object-cover object-[center_38%] sm:aspect-auto sm:h-[420px] lg:h-[560px] lg:object-[center_30%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IslandSection;
