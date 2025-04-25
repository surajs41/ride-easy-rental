
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-teal">Ride</span>
              <span className="text-2xl font-bold text-brand-orange">Easy</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brand-teal font-medium">Home</Link>
            <Link to="/bikes" className="text-gray-700 hover:text-brand-teal font-medium">Bikes</Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-teal font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-brand-teal font-medium">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              Log In
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="hidden md:flex bg-brand-teal hover:bg-brand-teal/90"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
