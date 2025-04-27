
import React, { useState } from 'react';
import BikeCard from '@/components/BikeCard';
import BikeTypeFilter from '@/components/BikeTypeFilter';
import { Input } from '@/components/ui/input';
import { getFilteredBikes, BikeType } from '@/data/bikes';
import { Search } from 'lucide-react';

const Bikes = () => {
  const [selectedType, setSelectedType] = useState<BikeType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBikes = getFilteredBikes(selectedType, searchQuery);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Bike Collection</h1>
          <p className="text-gray-600">
            Find the perfect bike for your needs from our diverse collection.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search bikes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <BikeTypeFilter 
            currentType={selectedType}
            onTypeChange={setSelectedType}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
        
        {filteredBikes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No bikes found with the selected criteria</h3>
            <p className="mt-2">Please try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bikes;
