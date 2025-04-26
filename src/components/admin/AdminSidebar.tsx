
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart, Users, Bike, Calendar, 
  CreditCard, Star, Bell, Settings 
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', path: '/admin', icon: BarChart },
  { name: 'User Management', path: '/admin/users', icon: Users },
  { name: 'Bike Management', path: '/admin/bikes', icon: Bike },
  { name: 'Bookings', path: '/admin/bookings', icon: Calendar },
  { name: 'Payments', path: '/admin/payments', icon: CreditCard },
  { name: 'Feedbacks', path: '/admin/feedbacks', icon: Star },
  { name: 'Announcements', path: '/admin/announcements', icon: Bell },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-900 text-white h-full min-h-screen w-64 flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-brand-teal">Ride</span>
          <span className="text-2xl font-bold text-brand-orange">Easy</span>
          <span className="text-sm bg-brand-teal text-white px-2 py-1 rounded">Admin</span>
        </div>
      </div>
      <div className="mt-6">
        <nav>
          <ul>
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-3 hover:bg-gray-800 ${
                      isActive ? 'bg-gray-800 border-l-4 border-brand-teal' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
