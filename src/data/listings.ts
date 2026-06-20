import type { BaseListing } from "@/types/index";

import villaBeachfront from "@/assets/villa-beachfront.jpg";
import villaHillside from "@/assets/villa-hillside.jpg";

import expCooking from "@/assets/exp-cooking.jpg";
import expSnorkel from "@/assets/exp-snorkel.jpg";

import expBoat from "@/assets/exp-boat.jpg";

export const listings: BaseListing[] = [
  {
    id: "AntiguaBella",
    slug: "antiguabella",
    type: "villa",
    title: "AntiguaBella",
    subtitle: "Where elegance meets the Caribbean shore",
    shortDescription:
      "Flagship beachfront luxury with open-plan living, private infinity pool, and direct sand access.",
    description:
      "A flagship villa collection offering the pinnacle of island luxury. Floor-to-ceiling glass frames turquoise horizons, while a private infinity pool and butler service elevate every arrival. Enjoy unhurried mornings on the terrace and evenings crafted around candlelit dining by the sea.",
    location: "St. John's, Antigua",
    price: 3100,
    currency: "USD",
    images: [villaBeachfront],
    featuredImage: villaBeachfront,
    tags: ["beachfront", "infinity pool", "butler service", "luxury villa"],
    category: "Villas",
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4,
    amenities: [
      "Private infinity pool",
      "Direct beach access",
      "Butler service",
      "Outdoor rain shower",
    ],
    availabilityStatus: "available",
    featured: true,
  },
  {
    id: "AntiguaSoleil",
    slug: "antiguasoleil",
    type: "villa",
    title: "AntiguaSoleil",
    subtitle: "Romantic seclusion under Caribbean skies",
    shortDescription:
      "Garden tranquility with open-air bathing, private dining, and a quiet yoga deck.",
    description:
      "Tucked among lush tropical gardens, AntiguaSoleil is designed for romance and calm. Indulge in moonlit dining on your private terrace, unwind with open-air bathing, and start each day with gentle movement on the yoga deck—while the island’s soundtrack drifts in through the open verandas.",
    location: "Valley Church, Antigua",
    price: 1650,
    currency: "USD",
    images: [villaHillside],
    tags: ["garden retreat", "romantic", "private dining", "open-air living"],
    category: "Villas",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Garden terrace", "Open-air bath", "Private dining", "Yoga deck"],
    availabilityStatus: "limited",
    featured: false,
  },
  {
    id: "culinary_journeys",
    slug: "culinary-journeys",
    type: "experience",
    title: "Culinary Journeys",
    subtitle: "Island flavors, chef-led",
    shortDescription:
      "Chef-guided cooking with local ingredients, tastings, and unforgettable Antiguan warmth.",
    description:
      "Experience island flavors through a chef-led session focused on fresh local ingredients. From preparation to tasting, the journey is designed to be personal, guided, and delicious—where each course reflects Antigua’s character and each moment feels unhurried and luxurious.",
    location: "St. John's, Antigua",
    price: 450,
    currency: "USD",
    images: [expCooking],
    featuredImage: expCooking,
    tags: ["chef-led", "local ingredients", "tasting experience", "island cuisine"],
    category: "Culinary",
    maxGuests: 6,
    amenities: ["Chef-guided preparation", "Farm-to-table ingredients", "Guided tasting"],
    availabilityStatus: "available",
    featured: false,
  },
  {
    id: "ocean_reef",
    slug: "ocean-and-reef",
    type: "experience",
    title: "Ocean & Reef",
    subtitle: "Caribbean waters, explored",
    shortDescription:
      "Guided coral reef exploration with professional divers and bright, clear-water moments.",
    description:
      "Step into the Caribbean and explore the reef with professional divers. This guided session is crafted for wonder—discover coral habitats, enjoy calm coaching, and take in the vivid clarity of Antigua’s waters from start to finish.",
    location: "Antigua Offshore Waters",
    price: 320,
    currency: "USD",
    images: [expSnorkel],
    tags: ["reef exploration", "professional divers", "snorkel", "caribbean waters"],
    category: "Water Adventures",
    maxGuests: 8,
    amenities: ["Reef exploration", "Professional diver guidance", "Caribbean water immersion"],
    availabilityStatus: "limited",
    featured: true,
  },
  {
    id: "coastline_private_day",
    slug: "private-coastline-day-charter",
    type: "charter",
    title: "Private Coastline Day Charter",
    subtitle: "Unhurried hours on your own horizon",
    shortDescription:
      "A fully private day on the water—concierge-tailored route with swim stops and secluded coves.",
    description:
      "Enjoy a fully private day on the water tailored by our concierge. Drift along Antigua’s most beautiful coves, pause for swims in clear shallows, and anchor where the island feels entirely your own. Every detail is handled, leaving you to savor the rhythm of the sea.",
    location: "North Sound, Antigua",
    price: 2800,
    currency: "USD",
    images: [expBoat],
    featuredImage: expBoat,
    tags: ["private vessel", "concierge curated", "swim stops", "secluded coves"],
    category: "Charters",
    maxGuests: 8,
    amenities: ["Private vessel & crew", "Concierge-curated route", "Swim stops", "Secluded coves"],
    availabilityStatus: "available",
    featured: false,
  },
];

