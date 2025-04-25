
import React, { useState } from 'react';
import BikeCard from '@/components/BikeCard';
import BikeTypeFilter from '@/components/BikeTypeFilter';
import { getFilteredBikes, BikeType } from '@/data/bikes';

const Bikes = () => {
  const [selectedType, setSelectedType] = useState<BikeType | 'all'>('all');
  const filteredBikes = getFilteredBikes(selectedType);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Bike Collection</h1>
          <p className="text-gray-600">
            Find the perfect bike for your needs from our diverse collection.
          </p>
        </div>
        
        <BikeTypeFilter 
          currentType={selectedType}
          onTypeChange={setSelectedType}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
        
        {filteredBikes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No bikes found with the selected criteria</h3>
            <p className="mt-2">Please try a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bikes;
