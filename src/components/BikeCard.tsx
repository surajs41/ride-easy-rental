
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bike } from '@/data/bikes';
import { Star } from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
}

const BikeCard = ({ bike }: BikeCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={bike.imageUrl} 
          alt={bike.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-sm font-medium">
          ₹{bike.price}/day
        </div>
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs uppercase px-2 py-1 rounded-md">
          {bike.type}
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{bike.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
            <span className="ml-1 text-sm font-medium">{bike.rating}</span>
          </div>
        </div>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{bike.description}</p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link to={`/bike/${bike.id}`} className="w-full">
          <Button 
            className="w-full bg-brand-teal hover:bg-brand-teal/90"
            variant="default"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BikeCard;
