
export type BikeType = 'gear' | 'scooter' | 'sports' | 'cruiser' | 'commuter';

export interface Bike {
  id: string;
  name: string;
  type: BikeType;
  price: number;
  rating: number;
  imageUrl: string;
  description: string;
  features: string[];
  availability: boolean;
}

export const bikes: Bike[] = [
  {
    id: "1",
    name: "Hero Splendor Plus",
    type: "commuter",
    price: 499,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "The most popular motorcycle in India, perfect for daily commuting. Offers excellent mileage and reliability for city rides.",
    features: ["97cc Engine", "60+ kmpl mileage", "LED headlamp", "Self start", "Tubeless tires"],
    availability: true,
  },
  {
    id: "2",
    name: "Bajaj Pulsar 125",
    type: "gear",
    price: 599,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Sporty look with powerful performance. The Pulsar 125 offers excellent pickup and style for the young generation.",
    features: ["125cc BS6 DTS-i Engine", "Digital instrument cluster", "LED DRLs", "5-speed gearbox", "Twin pilot lamps"],
    availability: true,
  },
  {
    id: "3",
    name: "Honda Shine",
    type: "commuter",
    price: 549,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
    description: "Smooth performance and excellent mileage make Honda Shine a favorite choice for daily commuting.",
    features: ["125cc BS6 Engine", "Silent start", "Enhanced mileage", "Comfortable seat", "Low maintenance cost"],
    availability: true,
  },
  {
    id: "4",
    name: "Honda Activa 6G",
    type: "scooter",
    price: 449,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1633879860828-1b27162697e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "India's most popular scooter with excellent reliability and performance. Perfect for city commuting.",
    features: ["110cc BS6 Engine", "LED headlamp", "21L storage space", "Digital meter", "Integrated dual function switch"],
    availability: true,
  },
  {
    id: "5",
    name: "TVS Jupiter",
    type: "scooter",
    price: 429,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1620673399859-ef41922b9cac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    description: "Comfortable scooter with excellent features, perfect for short city trips and daily commuting.",
    features: ["110cc CVTi Engine", "Econometer", "Mobile charging port", "22L storage", "External fuel fill"],
    availability: true,
  },
  {
    id: "6",
    name: "Royal Enfield Classic 350",
    type: "cruiser",
    price: 1499,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    description: "The iconic cruiser motorcycle with vintage looks and powerful performance. Perfect for highway rides.",
    features: ["349cc BS6 Engine", "Dual-channel ABS", "Classic retro design", "Digital-analog cluster", "Halogen headlamp"],
    availability: true,
  },
  {
    id: "7",
    name: "Suzuki Access 125",
    type: "scooter",
    price: 479,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1622462231877-873bbdbaae49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Stylish scooter with ample power and features. Great for city commuting with extra comfort.",
    features: ["125cc BS6 Engine", "Digital meter", "LED headlamp", "Chrome accents", "External fuel lid"],
    availability: true,
  },
  {
    id: "8",
    name: "Yamaha R15 V4",
    type: "sports",
    price: 1599,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1568736772245-26bb5b820a71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
    description: "Premium sports bike with racing DNA. Sharp handling and aerodynamic design make it perfect for enthusiasts.",
    features: ["155cc Liquid-cooled engine", "Quickshifter", "Traction control", "Deltabox frame", "Dual-channel ABS"],
    availability: true,
  }
];

export const getFilteredBikes = (type?: BikeType | 'all'): Bike[] => {
  if (!type || type === 'all') {
    return bikes;
  }
  return bikes.filter(bike => bike.type === type);
};

export const getBikeById = (id: string): Bike | undefined => {
  return bikes.find(bike => bike.id === id);
};
