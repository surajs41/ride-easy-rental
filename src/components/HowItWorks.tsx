
import React from 'react';

const steps = [
  {
    number: 1,
    title: "Choose Your Bike",
    description: "Browse our collection and select the perfect bike for your needs.",
    icon: "🔍",
  },
  {
    number: 2,
    title: "Book Online",
    description: "Select your dates, provide your details, and confirm your booking.",
    icon: "📅",
  },
  {
    number: 3,
    title: "Make Payment",
    description: "Complete your payment using our secure payment gateway.",
    icon: "💳",
  },
  {
    number: 4,
    title: "Enjoy Your Ride",
    description: "Pick up your bike and start your adventure!",
    icon: "🚲",
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            RideEasy makes bike rental simple and hassle-free with our straightforward process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
                <span className="w-6 h-6 rounded-full bg-brand-teal text-white text-sm flex items-center justify-center mr-2">
                  {step.number}
                </span>
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
