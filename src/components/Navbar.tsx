
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out successfully');
      navigate('/');
    }
  };

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
            {user ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="hidden md:flex"
              >
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex"
                  onClick={() => navigate('/auth?mode=login')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Log In
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="hidden md:flex bg-brand-teal hover:bg-brand-teal/90"
                  onClick={() => navigate('/auth?mode=signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
