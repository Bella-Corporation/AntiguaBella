import expBoat from "@/assets/exp-boat.jpg";
import expCooking from "@/assets/exp-cooking.jpg";
import expFarm from "@/assets/exp-farm.jpg";
import expSnorkel from "@/assets/exp-snorkel.jpg";

const experiences = [
  {
    title: "Private Charters",
    tagline: "Your own vessel. Your own horizon.",
    image: expBoat,
  },
  {
    title: "Culinary Journeys",
    tagline: "Island flavors, chef-led.",
    image: expCooking,
  },
  {
    title: "Island Discovery",
    tagline: "Beyond the shoreline.",
    image: expFarm,
  },
  {
    title: "Ocean & Reef",
    tagline: "Caribbean waters, explored.",
    image: expSnorkel,
  },
];

const ExperiencesSection = () => {
  return (
    <section id="experiences" className="section-padding bg-card">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-28 items-start mb-20 lg:mb-28">
          <div className="lg:col-span-5">
            <p className="luxury-subheading text-primary/60 mb-6">Experiences</p>
            <h2 className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-10">
              Beyond the
              <br />
              <span className="italic">Expected</span>
            </h2>
            <div className="luxury-divider mx-0 mb-10" />
            <p className="luxury-body text-muted-foreground max-w-sm">
              Every experience on the platform is vetted, private, and
              designed for travelers who prefer depth over spectacle.
            </p>
          </div>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border/15 image-card-hover"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-[260px] lg:h-[340px] object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-[1.06] group-hover:rotate-[0.3deg]"
              />
              {/* Bottom-up gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent group-hover:from-black/80 group-hover:via-black/40 group-hover:to-black/10 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3 className="luxury-heading text-lg lg:text-[1.35rem] text-foreground mb-1" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                  {exp.title}
                </h3>
                <p className="luxury-body text-foreground/60 text-[13px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  {exp.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 lg:mt-24">
          <a href="#begin" className="luxury-btn-outline">
            Browse Experiences
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
