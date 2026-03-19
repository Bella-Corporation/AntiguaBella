import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, X, Calendar, Users, Trash2, ShoppingBag } from "lucide-react";
import { format } from "date-fns";

import villaBeachfront from "@/assets/villa-beachfront.jpg";
import villaBeachPool from "@/assets/villa-beach-pool.jpg";
import villaHillside from "@/assets/villa-hillside.jpg";
import expBoat from "@/assets/exp-boat.jpg";
import expCooking from "@/assets/exp-cooking.jpg";
import expSnorkel from "@/assets/exp-snorkel.jpg";
import spaWellness from "@/assets/spa-wellness.jpg";

type CartItemType = "villa" | "experience" | "car";

interface CartItem {
  id: string;
  type: CartItemType;
  name: string;
  description: string;
  image: string;
  price: number;
  dates: { from: Date; to: Date };
  guests?: number;
  selected: boolean;
}

const initialItems: CartItem[] = [
  {
    id: "v1",
    type: "villa",
    name: "AntiguaBella",
    description: "Beachfront villa with private infinity pool & butler service",
    image: villaBeachfront,
    price: 3100,
    dates: { from: new Date(2026, 3, 10), to: new Date(2026, 3, 17) },
    guests: 4,
    selected: true,
  },
  {
    id: "v2",
    type: "villa",
    name: "Sugar Moon",
    description: "Romantic seclusion among lush tropical gardens",
    image: villaHillside,
    price: 1650,
    dates: { from: new Date(2026, 3, 10), to: new Date(2026, 3, 14) },
    guests: 2,
    selected: true,
  },
  {
    id: "e1",
    type: "experience",
    name: "Private Charter",
    description: "Full-day yacht charter through the Antiguan coastline",
    image: expBoat,
    price: 2800,
    dates: { from: new Date(2026, 3, 12), to: new Date(2026, 3, 12) },
    guests: 4,
    selected: true,
  },
  {
    id: "e2",
    type: "experience",
    name: "Culinary Journey",
    description: "Chef-led island cooking experience with local ingredients",
    image: expCooking,
    price: 450,
    dates: { from: new Date(2026, 3, 13), to: new Date(2026, 3, 13) },
    guests: 2,
    selected: true,
  },
  {
    id: "e3",
    type: "experience",
    name: "Reef Snorkeling",
    description: "Guided coral reef exploration with professional divers",
    image: expSnorkel,
    price: 320,
    dates: { from: new Date(2026, 3, 15), to: new Date(2026, 3, 15) },
    guests: 4,
    selected: false,
  },
  {
    id: "c1",
    type: "car",
    name: "Range Rover Sport",
    description: "Luxury SUV with GPS, AC & full insurance included",
    image: spaWellness,
    price: 280,
    dates: { from: new Date(2026, 3, 10), to: new Date(2026, 3, 17) },
    selected: true,
  },
];

const categoryLabels: Record<CartItemType, string> = {
  villa: "Villas",
  experience: "Experiences",
  car: "Car Rentals",
};

const categoryOrder: CartItemType[] = ["villa", "experience", "car"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const getNights = (from: Date, to: Date) => {
  const diff = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 1);
};

const Bag = () => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const selectedItems = items.filter((i) => i.selected);

  const totalPrice = selectedItems.reduce((sum, item) => {
    const nights = getNights(item.dates.from, item.dates.to);
    return sum + item.price * nights;
  }, 0);

  const groupedItems = categoryOrder
    .map((type) => ({
      type,
      label: categoryLabels[type],
      items: items.filter((i) => i.type === type),
    }))
    .filter((g) => g.items.length > 0);

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-center py-8 px-6 relative">
        <Link
          to="/"
          className="absolute left-6 lg:left-12 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span className="text-xs uppercase tracking-[0.2em] font-sans">Back</span>
        </Link>
        <Link to="/" className="luxury-heading tracking-wide text-[1.6rem] lg:text-[2rem]">
          <span className="text-foreground/90">
            Antigua<span className="gold-text">Bella</span>
          </span>
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 pb-32">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="luxury-subheading text-primary mb-4">Your Selection</p>
          <h1 className="luxury-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Shopping <span className="italic">Bag</span>
          </h1>
          <div className="luxury-divider mb-4" />
          <p className="text-sm text-muted-foreground/60 font-sans">
            {selectedItems.length} of {items.length} items selected
          </p>
        </motion.div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-12 h-12 text-muted-foreground/20 mx-auto mb-6" />
            <p className="luxury-heading text-xl text-foreground/50 mb-3">Your bag is empty</p>
            <p className="text-sm text-muted-foreground/40 font-sans mb-8">
              Explore our villas, experiences, and rentals to begin curating your stay.
            </p>
            <Link to="/stays" className="luxury-btn-outline">
              Browse Stays
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 items-start">
            {/* Items Column */}
            <div className="space-y-10">
              {groupedItems.map((group) => (
                <div key={group.type}>
                  <p className="luxury-subheading text-[10px] text-muted-foreground/50 mb-5">
                    {group.label}
                  </p>
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {group.items.map((item, i) => {
                        const nights = getNights(item.dates.from, item.dates.to);
                        const isMultiDay = nights > 1;
                        const itemTotal = item.price * nights;

                        return (
                          <motion.div
                            key={item.id}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={fadeUp}
                            layout
                            className={`
                              group relative rounded-2xl overflow-hidden border transition-all duration-500
                              ${item.selected
                                ? "border-primary/20 bg-card"
                                : "border-border/20 bg-card/50 opacity-60"
                              }
                            `}
                            style={{ boxShadow: item.selected ? "var(--shadow-soft)" : "none" }}
                          >
                            <div className="flex flex-col sm:flex-row">
                              {/* Image */}
                              <div className="relative sm:w-40 md:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/30 hidden sm:block" />
                              </div>

                              {/* Content */}
                              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between min-h-[140px]">
                                <div>
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <div>
                                      <h3 className="luxury-heading text-lg text-foreground mb-1">
                                        {item.name}
                                      </h3>
                                      <p className="text-[13px] text-muted-foreground/50 font-sans leading-relaxed">
                                        {item.description}
                                      </p>
                                    </div>

                                    {/* Toggle / Remove */}
                                    <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                                      <button
                                        onClick={() => toggleItem(item.id)}
                                        className={`
                                          w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300
                                          ${item.selected
                                            ? "border-primary bg-primary/15"
                                            : "border-muted-foreground/30 bg-transparent"
                                          }
                                        `}
                                      >
                                        {item.selected && (
                                          <motion.svg
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-3 h-3 text-primary"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                          >
                                            <path d="M5 12l5 5L20 7" />
                                          </motion.svg>
                                        )}
                                      </button>
                                      <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-muted-foreground/30 hover:text-destructive transition-colors duration-300"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Meta row */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
                                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50 font-sans">
                                    <Calendar size={12} />
                                    {format(item.dates.from, "MMM d")}
                                    {isMultiDay && ` — ${format(item.dates.to, "MMM d")}`}
                                  </span>
                                  {item.guests && (
                                    <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50 font-sans">
                                      <Users size={12} />
                                      {item.guests} guest{item.guests > 1 ? "s" : ""}
                                    </span>
                                  )}
                                  <span className="ml-auto luxury-heading text-base text-primary">
                                    ${itemTotal.toLocaleString()}
                                  </span>
                                  {isMultiDay && (
                                    <span className="text-[10px] text-muted-foreground/40 font-sans">
                                      ${item.price}/night × {nights}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:sticky lg:top-28"
            >
              <div
                className="rounded-2xl border border-border/40 bg-card p-6 lg:p-8"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <p className="luxury-subheading text-[10px] text-muted-foreground/50 mb-6">
                  Booking Summary
                </p>

                {/* Selected items summary */}
                <div className="space-y-3 mb-6">
                  {selectedItems.map((item) => {
                    const nights = getNights(item.dates.from, item.dates.to);
                    return (
                      <div key={item.id} className="flex justify-between text-sm font-sans">
                        <span className="text-foreground/60 truncate mr-3">{item.name}</span>
                        <span className="text-foreground/80 flex-shrink-0">
                          ${(item.price * nights).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {selectedItems.length === 0 && (
                  <p className="text-sm text-muted-foreground/40 font-sans text-center py-4">
                    No items selected
                  </p>
                )}

                {/* Gold divider */}
                <div
                  className="my-5 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)",
                  }}
                />

                {/* Total */}
                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-sans">
                    Total
                  </span>
                  <span className="luxury-heading text-2xl text-primary">
                    {totalPrice > 0 ? `$${totalPrice.toLocaleString()}` : "—"}
                  </span>
                </div>

                {/* Dates overview */}
                {selectedItems.length > 0 && (
                  <div className="rounded-xl bg-secondary/40 p-4 mb-6">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 font-sans mb-2">
                      Trip Dates
                    </p>
                    <p className="text-sm text-foreground/70 font-sans">
                      {format(
                        new Date(
                          Math.min(...selectedItems.map((i) => i.dates.from.getTime()))
                        ),
                        "MMM d"
                      )}{" "}
                      —{" "}
                      {format(
                        new Date(
                          Math.max(...selectedItems.map((i) => i.dates.to.getTime()))
                        ),
                        "MMM d, yyyy"
                      )}
                    </p>
                  </div>
                )}

                {/* Checkout button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={selectedItems.length === 0}
                  className={`
                    w-full py-4 rounded-lg text-[11px] uppercase tracking-[0.25em] font-sans font-medium
                    border transition-all duration-500
                    ${selectedItems.length > 0
                      ? "border-primary/50 text-primary bg-primary/5 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] cursor-pointer"
                      : "border-border/30 text-muted-foreground/40 cursor-not-allowed"
                    }
                  `}
                >
                  Proceed to Checkout
                </motion.button>

                <Link
                  to="/stays"
                  className="block text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary font-sans mt-4 transition-colors duration-300"
                >
                  Continue Browsing
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Bag;
