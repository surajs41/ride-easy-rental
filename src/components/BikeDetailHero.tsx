
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bike } from '@/data/bikes';
import { Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BikeDetailHeroProps {
  bike: Bike;
}

const BikeDetailHero = ({ bike }: BikeDetailHeroProps) => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Bike Image */}
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={bike.imageUrl} 
                alt={bike.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Right side - Bike Details */}
          <div className="md:w-1/2">
            <div className="flex items-center mb-2">
              <span className="bg-brand-teal/10 text-brand-teal text-sm font-medium px-2.5 py-0.5 rounded">
                {bike.type}
              </span>
              <div className="flex items-center ml-4">
                <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                <span className="ml-1 text-sm font-medium">{bike.rating} / 5</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{bike.name}</h1>
            <p className="text-gray-700 mb-6">{bike.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {bike.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-4 w-4 text-brand-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">₹{bike.price}</p>
                  <p className="text-sm text-gray-500">per day</p>
                </div>
                <div className="flex items-center text-brand-teal">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span className="text-sm">{bike.availability ? 'Available Now' : 'Currently Unavailable'}</span>
                </div>
              </div>
            </div>
            
            <Link to={`/book/${bike.id}`}>
              <Button 
                className="w-full bg-brand-teal hover:bg-brand-teal/90"
                size="lg"
                disabled={!bike.availability}
              >
                {bike.availability ? 'Book Now' : 'Not Available'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetailHero;
