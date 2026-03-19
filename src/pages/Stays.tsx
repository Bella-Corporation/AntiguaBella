import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import useScrollReveal from "@/hooks/useScrollReveal";
import ResortFooter from "@/components/ResortFooter";

import villaBeachfront from "@/assets/villa-beachfront.jpg";
import villaBeachPool from "@/assets/villa-beach-pool.jpg";
import villaHillside from "@/assets/villa-hillside.jpg";
import suiteOcean from "@/assets/suite-ocean.jpg";
import poolView from "@/assets/pool-view.jpg";
import resortAerial from "@/assets/resort-aerial.jpg";

const villas = [
  {
    name: "AntiguaBella",
    tagline: "Where elegance meets the Caribbean shore",
    description:
      "Our flagship villa collection offering the pinnacle of island luxury. Expansive open-plan living with floor-to-ceiling glass, private infinity pools, and direct beach access — every detail curated for an unforgettable stay.",
    image: villaBeachfront,
    features: ["Private infinity pool", "Direct beach access", "Butler service", "Outdoor rain shower"],
    size: "2,400 sq ft",
    guests: "2–8 Guests",
    price: "From $3,100 / night",
  },
  {
    name: "AntiguaSoleil",
    tagline: "Sun-drenched luxury with panoramic views",
    description:
      "Perched above the coastline to capture golden light from dawn to dusk. Warm natural materials, sweeping terraces, and a private plunge pool frame panoramic ocean vistas that stretch to the horizon.",
    image: villaBeachPool,
    features: ["Panoramic ocean views", "Private plunge pool", "Sunset terrace", "King bed suite"],
    size: "1,800 sq ft",
    guests: "2–6 Guests",
    price: "From $2,200 / night",
  },
  {
    name: "Sugar Moon",
    tagline: "Romantic seclusion under Caribbean skies",
    description:
      "An intimate retreat nestled among lush tropical gardens, designed for tranquillity and romance. Moonlit dining on your private terrace, open-air bathing, and the gentle rhythm of the sea as your soundtrack.",
    image: villaHillside,
    features: ["Garden terrace", "Open-air bath", "Private dining", "Yoga deck"],
    size: "1,400 sq ft",
    guests: "2–4 Guests",
    price: "From $1,650 / night",
  },
  {
    name: "NewMoon",
    tagline: "Contemporary design in a timeless setting",
    description:
      "A modern architectural gem with clean lines and luxurious finishes. Italian marble, curated art, and bespoke furnishings create an atmosphere of understated sophistication with captivating sea views.",
    image: suiteOcean,
    features: ["Sea-view balcony", "Italian marble bath", "Lounge area", "Evening turndown"],
    size: "1,000 sq ft",
    guests: "2–3 Guests",
    price: "From $1,200 / night",
  },
  {
    name: "MoonBreeze",
    tagline: "Effortless island living with a gentle breeze",
    description:
      "Light-filled interiors open to breezy verandas with views of swaying palms and turquoise waters. A relaxed yet refined villa perfect for families or friends seeking the authentic Caribbean experience.",
    image: poolView,
    features: ["Wraparound veranda", "Pool access", "Family-friendly", "Kitchenette"],
    size: "1,600 sq ft",
    guests: "2–6 Guests",
    price: "From $1,450 / night",
  },
];

const highlights = [
  {
    title: "42 Private Villas & Suites",
    body: "Each residence is an individual masterpiece, architecturally distinct and thoughtfully positioned for maximum privacy and breathtaking views.",
  },
  {
    title: "Award-Winning Design",
    body: "Blending Caribbean vernacular with contemporary minimalism — natural stone, aged timber, and glass curated to frame the landscape.",
  },
  {
    title: "Dedicated Villa Host",
    body: "Your personal host attends to every detail from pre-arrival preferences to daily rituals, ensuring an effortlessly bespoke experience.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Stays = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src={resortAerial}
          alt="Aerial view of AntiguaBella resort villas"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsla(0,0%,0%,0.45) 0%, hsla(0,0%,0%,0.25) 50%, hsla(0,0%,0%,0.55) 100%)",
          }}
        />

        {/* Back nav */}
        <div className="absolute top-0 left-0 right-0 z-20 py-6 md:py-8 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors duration-300"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              <span className="luxury-subheading text-[10px] tracking-[0.22em]">Back</span>
            </Link>
            <a href="/" className="luxury-heading text-foreground/90 text-lg md:text-xl tracking-wide">
              Antigua<span className="gold-text">Bella</span>
            </a>
            <Link
              to="/book"
              className="luxury-subheading text-[10px] tracking-[0.22em] text-foreground/50 hover:text-foreground/80 transition-colors duration-300"
            >
              Book
            </Link>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 md:pb-20 px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="luxury-subheading text-primary mb-4 border border-foreground px-4 py-1.5 inline-block"
          >
            Accommodations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="luxury-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4"
          >
            Your Private <span className="italic">Sanctuary</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="luxury-divider mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="luxury-body text-foreground/50 max-w-lg text-sm md:text-base"
          >
            Exquisite residences designed to harmonize with the natural beauty
            of Antigua, offering an unparalleled sense of place and privacy.
          </motion.p>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="bg-card border-y border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 md:py-20">
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="text-center md:text-left"
              >
                <h3 className="luxury-heading text-lg text-foreground mb-3">{item.title}</h3>
                <p className="luxury-body text-muted-foreground/60 text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Villa Listings */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="space-y-24 md:space-y-32">
            {villas.map((villa, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={villa.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                    !isEven ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden rounded-2xl ${!isEven ? "lg:order-2" : ""}`}>
                    <img
                      src={villa.image}
                      alt={`${villa.name} at AntiguaBella`}
                      className="w-full h-[380px] md:h-[480px] object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(180deg, transparent 60%, hsla(0,0%,0%,0.3) 100%)",
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className={`flex flex-col justify-center ${!isEven ? "lg:order-1" : ""}`}>
                    <p className="luxury-subheading text-primary mb-3 text-[10px]">{villa.tagline}</p>
                    <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-4">
                      {villa.name}
                    </h2>
                    <div className="luxury-divider mb-5 !mx-0" />
                    <p className="luxury-body text-muted-foreground/60 text-sm leading-[1.8] mb-6">
                      {villa.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      <span className="luxury-subheading text-[10px] text-foreground/40">
                        {villa.size}
                      </span>
                      <span className="text-foreground/15">|</span>
                      <span className="luxury-subheading text-[10px] text-foreground/40">
                        {villa.guests}
                      </span>
                      <span className="text-foreground/15">|</span>
                      <span className="luxury-subheading text-[10px] text-primary/80">
                        {villa.price}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-8">
                      {villa.features.map((f) => (
                        <span
                          key={f}
                          className="luxury-body text-foreground/40 text-[13px] flex items-center gap-2"
                        >
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: "hsl(var(--primary))" }}
                          />
                          {f}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/book"
                      className="luxury-btn-outline self-start"
                    >
                      Reserve
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-card py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div data-reveal="slide-up" className="section-header mb-12">
            <p className="luxury-subheading text-primary mb-4">Gallery</p>
            <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-5">
              A Glimpse of <span className="italic">Paradise</span>
            </h2>
            <div className="luxury-divider mb-6" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[villaBeachfront, poolView, villaBeachPool, suiteOcean, villaHillside, resortAerial].map(
              (img, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-xl aspect-[4/3]"
                >
                  <img
                    src={img}
                    alt={`Resort gallery image ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.05]"
                  />
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="luxury-subheading text-primary mb-4">Begin Your Journey</p>
            <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-5">
              Ready to <span className="italic">Escape?</span>
            </h2>
            <div className="luxury-divider mb-6" />
            <p className="luxury-body text-muted-foreground/60 text-sm leading-relaxed mb-10">
              Our reservations team is ready to curate your perfect stay.
              Every detail, thoughtfully arranged.
            </p>
            <Link to="/book" className="luxury-btn-outline">
              Make a Reservation
            </Link>
          </motion.div>
        </div>
      </section>

      <ResortFooter />
    </div>
  );
};

export default Stays;
