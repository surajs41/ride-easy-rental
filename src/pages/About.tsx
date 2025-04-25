
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About RideEasy</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          RideEasy is your premier destination for hassle-free bike rentals. We believe in making
          cycling accessible to everyone, whether you're a daily commuter, weekend warrior, or
          tourist exploring the city.
        </p>
        <p className="text-lg mb-6">
          Our mission is to promote sustainable transportation while providing high-quality bikes
          and exceptional service to our customers.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Quality Bikes</h3>
            <p>We maintain a fleet of well-serviced bikes suitable for all types of riders.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Easy Booking</h3>
            <p>Our streamlined booking process makes it simple to rent a bike whenever you need one.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Great Support</h3>
            <p>Our team is always ready to help you with any questions or concerns.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
