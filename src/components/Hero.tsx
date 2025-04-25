
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-gradient py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Discover the <span className="text-brand-teal">Freedom</span> of Two Wheels
            </h1>
            <p className="text-lg mb-6 text-gray-700 max-w-md">
              Rent high-quality bikes for your adventures, commuting, or leisure. Fast, easy, and affordable.
            </p>
            <div className="flex space-x-4">
              <Link to="/bikes">
                <Button 
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white px-6 py-2"
                  size="lg"
                >
                  Rent Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  className="border-brand-teal text-brand-teal hover:bg-brand-teal/10"
                  size="lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Motorcycle" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
