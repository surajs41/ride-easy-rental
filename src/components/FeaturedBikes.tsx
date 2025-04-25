
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BikeCard from '@/components/BikeCard';
import { bikes } from '@/data/bikes';
import { ArrowRight } from 'lucide-react';

const FeaturedBikes = () => {
  // Get 4 featured bikes for the homepage
  const featuredBikes = bikes.slice(0, 4);

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Bikes</h2>
            <p className="text-gray-600 mt-2">Discover our most popular bikes for your next adventure</p>
          </div>
          <Link to="/bikes">
            <Button variant="ghost" className="text-brand-teal hover:text-brand-teal/90">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBikes;
