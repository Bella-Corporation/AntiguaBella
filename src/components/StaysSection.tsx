import villaBeachfront from "@/assets/villa-beachfront.jpg";
import villaBeachPool from "@/assets/villa-beach-pool.jpg";
import villaHillside from "@/assets/villa-hillside.jpg";

const villas = [
  {
    name: "Beachfront Villas",
    description:
      "Steps from the shore with uninterrupted sea views and private terraces opening directly onto pristine white sand.",
    image: villaBeachfront,
  },
  {
    name: "Beach Pool Villas",
    description:
      "Oceanfront living with your own private plunge pool, a seamless blend of indoor-outdoor Caribbean luxury.",
    image: villaBeachPool,
  },
  {
    name: "Hillside Garden Pool Villas",
    description:
      "Nestled among lush tropical gardens with panoramic ocean vistas, private pools, and enchanting natural surroundings.",
    image: villaHillside,
  },
];

const StaysSection = () => {
  return (
    <section id="stays" className="section-padding">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="section-header">
          <p className="luxury-subheading text-primary mb-6">Accommodations</p>
          <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Your Private <span className="italic">Sanctuary</span>
          </h2>
          <div className="luxury-divider mb-8" />
          <p className="luxury-body text-muted-foreground max-w-lg mx-auto">
            Each villa is thoughtfully designed to harmonize with the natural beauty of the
            island, offering an unparalleled sense of place and privacy.
          </p>
        </div>

        {/* Villa Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {villas.map((villa) => (
            <div key={villa.name} className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500" style={{ background: 'hsl(0 0% 7%)', border: '1px solid hsl(41 54% 54% / 0.2)', boxShadow: 'none' }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px -4px hsl(41 54% 54% / 0.25), 0 0 40px -8px hsl(41 54% 54% / 0.1)'; e.currentTarget.style.borderColor = 'hsl(41 54% 54% / 0.45)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'hsl(41 54% 54% / 0.2)'; }}>
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={villa.image}
                  alt={`${villa.name} at AntiguaBella resort`}
                  className="w-full h-[320px] lg:h-[380px] object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-all duration-700" />

                {/* Explore overlay on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="luxury-subheading text-[10px] text-primary">
                    Explore →
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 lg:p-7">
                <h3 className="luxury-heading text-xl lg:text-[1.35rem] text-foreground mb-3">
                  {villa.name}
                </h3>
                <p className="luxury-body text-muted-foreground/60 text-[13px] leading-[1.7]">
                  {villa.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 lg:mt-24 text-center">
          <a href="#begin" className="luxury-btn-outline">
            View All Villas
          </a>
        </div>
      </div>
    </section>
  );
};

export default StaysSection;
