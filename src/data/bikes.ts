
export type BikeType = 'city' | 'mountain' | 'road' | 'electric' | 'hybrid';

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
    name: "City Cruiser",
    type: "city",
    price: 25,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Perfect for commuting through city streets and parks. This comfortable cruiser features an upright riding position, cushioned seat, and easy-to-use controls.",
    features: ["Step-through frame", "Cushioned seat", "Front basket", "7-speed gears", "Front and rear lights"],
    availability: true,
  },
  {
    id: "2",
    name: "Mountain Explorer",
    type: "mountain",
    price: 35,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    description: "Conquer any trail with this rugged mountain bike. Features include front suspension, responsive disc brakes, and knobby tires for excellent traction.",
    features: ["Full suspension", "Hydraulic disc brakes", "29-inch wheels", "21-speed gears", "Lightweight aluminum frame"],
    availability: true,
  },
  {
    id: "3",
    name: "Road Runner",
    type: "road",
    price: 40,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
    description: "Built for speed on paved surfaces. This lightweight road bike features drop handlebars, thin tires, and an aerodynamic design for fast and efficient riding.",
    features: ["Carbon fiber frame", "Drop handlebars", "700c wheels", "11-speed gears", "Aerodynamic design"],
    availability: true,
  },
  {
    id: "4",
    name: "E-Commuter",
    type: "electric",
    price: 55,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Get around effortlessly with this electric-assist bike. Features a powerful motor, long-lasting battery, and comfortable upright riding position.",
    features: ["500W motor", "Range up to 60 miles", "LED display", "Integrated lights", "Rear cargo rack"],
    availability: true,
  },
  {
    id: "5",
    name: "Urban Hybrid",
    type: "hybrid",
    price: 30,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    description: "The perfect all-rounder for city and light trails. Combines the efficiency of a road bike with the durability of a mountain bike.",
    features: ["Lightweight frame", "Front suspension", "Ergonomic grips", "Multi-surface tires", "Wide gear range"],
    availability: true,
  },
  {
    id: "6",
    name: "Mountain Pro",
    type: "mountain",
    price: 45,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1605535481148-8bddec0c8b86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    description: "Professional-grade mountain bike for the most demanding trails and downhill adventures. Full suspension and premium components.",
    features: ["Carbon fiber frame", "Full suspension", "Hydraulic disc brakes", "Tubeless tires", "12-speed drivetrain"],
    availability: true,
  },
  {
    id: "7",
    name: "City E-Bike",
    type: "electric",
    price: 50,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1612887726773-e64e20cf867f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Stylish electric city bike with a powerful motor and comfortable riding position. Perfect for commuting without breaking a sweat.",
    features: ["350W motor", "Integrated battery", "Step-through frame", "Front basket", "Fenders"],
    availability: true,
  },
  {
    id: "8",
    name: "Classic Cruiser",
    type: "city",
    price: 20,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
    description: "Vintage-inspired city cruiser with wide handlebars, cushioned seat, and relaxed geometry. Perfect for leisurely rides along the beach or park.",
    features: ["Single-speed", "Coaster brake", "Wide tires", "Retro style", "Bell included"],
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
