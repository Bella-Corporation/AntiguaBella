import PropertyPicture from "@/components/PropertyPicture";
import { sharedCoastAerial } from "@/data/sharedMedia";

const IslandSection = () => {
  return (
    <section id="island" className="section-padding bg-background" aria-labelledby="island-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal="slide-up" className="lg:col-span-5">
          <p className="luxury-subheading mb-4 text-primary">Antigua</p>
          <h2
            id="island-heading"
            data-scroll-cue
            className="luxury-heading mb-7 text-3xl leading-[1.18] text-foreground md:text-4xl lg:text-[2.75rem]"
          >
            The island
            <br />
            <span className="italic">around the stay</span>
          </h2>
          <div className="luxury-divider mx-0 mb-7" />
          <p className="luxury-body mb-5 text-muted-foreground">
            Harbors, open water, and green hills are the setting for a stay in Antigua.
            The residences sit in that landscape. Time on the water, in town, or along
            the shore is arranged through the same personal inquiry.
          </p>
        </div>

        <div data-reveal="fade" data-reveal-delay="160" className="lg:col-span-7">
          <PropertyPicture
            photo={sharedCoastAerial}
            alt={sharedCoastAerial.alt}
            sizes="(min-width: 1024px) 58vw, 100vw"
            pictureClassName="block w-full"
            className="h-[340px] w-full object-cover object-top sm:h-[480px] sm:object-[center_28%] lg:h-[560px] lg:object-[center_30%]"
          />
        </div>
      </div>
    </section>
  );
};

export default IslandSection;
