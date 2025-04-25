
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BikeDetailHero from '@/components/BikeDetailHero';
import { getBikeById } from '@/data/bikes';

const BikeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const bike = id ? getBikeById(id) : undefined;
  
  if (!bike) {
    return <Navigate to="/bikes" replace />;
  }
  
  return (
    <div>
      <BikeDetailHero bike={bike} />
      
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">About this bike</h2>
            <p className="text-gray-700 mb-6">
              {bike.description} Experience the ultimate ride with our premium {bike.type} bike, 
              designed for comfort and performance. Whether you're exploring the city, hitting the trails, 
              or commuting to work, this bike will exceed your expectations.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Rental Information</h2>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Rental Includes</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Helmet</li>
                    <li>Lock</li>
                    <li>Phone mount</li>
                    <li>24/7 roadside assistance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Valid ID</li>
                    <li>Credit card on file</li>
                    <li>Signed rental agreement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetail;
