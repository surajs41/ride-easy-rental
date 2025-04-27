import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState<{ avatar_url?: string, first_name?: string, last_name?: string }>({});

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url, first_name, last_name')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          setProfileData(data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out successfully');
      navigate('/');
    }
  };

  const getInitials = () => {
    if (profileData.first_name && profileData.last_name) {
      return `${profileData.first_name[0]}${profileData.last_name[0]}`;
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profileData.avatar_url || ""} alt={user.email || ''} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile?tab=rentals')}>
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-brand-teal font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/bikes" 
                className="text-gray-700 hover:text-brand-teal font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bikes
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-brand-teal font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-brand-teal font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-brand-teal font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/auth?mode=login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="bg-brand-teal hover:bg-brand-teal/90"
                    onClick={() => {
                      navigate('/auth?mode=signup');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
