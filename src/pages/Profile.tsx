import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, Lock, Clock, Calendar, Star, CreditCard, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';

const MOCK_BOOKINGS = [
  {
    id: 'BK12345',
    bikeName: 'Hero Splendor Plus',
    startDate: '2025-04-10',
    endDate: '2025-04-12',
    status: 'Completed',
    amount: 800,
    rating: 4
  },
  {
    id: 'BK12346',
    bikeName: 'TVS Jupiter',
    startDate: '2025-05-15',
    endDate: '2025-05-16',
    status: 'Upcoming',
    amount: 450,
    rating: null
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    address: '',
    licenseNumber: '',
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view your profile');
      navigate('/auth?mode=login');
      return;
    }
    
    // Fetch user profile data from Supabase
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setFormData({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: user.email || '',
            phone: data.phone || '',
            dateOfBirth: data.date_of_birth || '',
            address: data.address || '',
            licenseNumber: data.license_number || '',
          });
          
          setProfileImageUrl(data.avatar_url || '');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchUserProfile();
  }, [user, navigate]);
  
  const saveProfileChanges = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
          date_of_birth: formData.dateOfBirth,
          license_number: formData.licenseNumber,
          phone: formData.phone,
        })
        .eq('id', user!.id);
        
      if (error) throw error;
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const updatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });
      
      if (error) throw error;
      
      toast.success('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out successfully');
      navigate('/');
    }
  };

  const handleProfilePhotoUploaded = async (url: string) => {
    try {
      await supabase
        .from('profiles')
        .update({ avatar_url: url })
        .eq('id', user!.id);
        
      setProfileImageUrl(url);
    } catch (error: any) {
      console.error('Error updating profile with new avatar URL:', error);
    }
  };

  const downloadInvoice = (bookingId: string) => {
    toast.success(`Downloading invoice for booking ${bookingId}...`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profileImageUrl} alt="Profile" />
                  <AvatarFallback>{formData.firstName[0]}{formData.lastName[0]}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h2>
                <p className="text-gray-600">{formData.email}</p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('personal')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Personal Information
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('security')}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('rentals')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Rental History
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('upcoming')}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Upcoming Rentals
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('ratings')}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Ratings & Feedback
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('payments')}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment History
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <Separator className="my-2" />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow p-6">
              {activeTab === 'personal' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Personal Information</h2>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    ) : (
                      <div className="space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={saveProfileChanges}>Save Changes</Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <ProfilePhotoUpload 
                      userId={user?.id || ''} 
                      firstName={formData.firstName} 
                      lastName={formData.lastName} 
                      existingAvatarUrl={profileImageUrl}
                      onPhotoUploaded={handleProfilePhotoUploaded}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleFormChange}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleFormChange}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleFormChange}
                        disabled={true} // Email can't be changed
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleFormChange}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input 
                        id="dateOfBirth" 
                        name="dateOfBirth" 
                        type="date" 
                        value={formData.dateOfBirth} 
                        onChange={handleFormChange}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">Driving License Number</Label>
                      <Input 
                        id="licenseNumber" 
                        name="licenseNumber" 
                        value={formData.licenseNumber} 
                        onChange={handleFormChange}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleFormChange}
                        disabled={!isEditing} 
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        name="currentPassword" 
                        type="password" 
                        value={passwordData.currentPassword} 
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        name="newPassword" 
                        type="password" 
                        value={passwordData.newPassword} 
                        onChange={handlePasswordChange}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters and include a number and a symbol.
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        value={passwordData.confirmPassword} 
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <Button onClick={updatePassword} className="mt-2">Update Password</Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'rentals' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Rental History</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_BOOKINGS.filter(b => b.status === 'Completed').map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.bikeName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {booking.startDate} to {booking.endDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">₹{booking.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {booking.rating ? `${booking.rating}/5` : 'Not rated'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Button 
                                variant="ghost" 
                                className="p-0 h-auto" 
                                onClick={() => downloadInvoice(booking.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {MOCK_BOOKINGS.filter(b => b.status === 'Completed').length === 0 && (
                          <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">No rental history found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'upcoming' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Upcoming Rentals</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_BOOKINGS.filter(b => b.status === 'Upcoming').map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.bikeName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {booking.startDate} to {booking.endDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">₹{booking.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                              <Button variant="outline" size="sm">Reschedule</Button>
                              <Button variant="outline" size="sm" className="text-red-500">Cancel</Button>
                            </td>
                          </tr>
                        ))}
                        {MOCK_BOOKINGS.filter(b => b.status === 'Upcoming').length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No upcoming rentals found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'ratings' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Ratings & Feedback</h2>
                  <div className="space-y-6">
                    {MOCK_BOOKINGS.filter(b => b.rating).map((booking) => (
                      <div key={booking.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{booking.bikeName}</h3>
                          <div className="flex items-center">
                            <span className="mr-1">{booking.rating}/5</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Rented on {booking.startDate}
                        </p>
                        <p className="mt-3">Great bike, had a smooth ride. Would definitely rent again!</p>
                        <Button variant="link" className="mt-2 p-0 h-auto text-sm">Edit Feedback</Button>
                      </div>
                    ))}
                    {!MOCK_BOOKINGS.some(b => b.rating) && (
                      <p className="text-center text-gray-500">You haven't provided any ratings or feedback yet.</p>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'payments' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Payment History</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">TXN123456</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">2025-04-10</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">BK12345</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">₹800</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Paid
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Button variant="ghost" className="p-0 h-auto">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="notifyBooking" 
                            className="h-4 w-4 text-brand-teal focus:ring-brand-teal border-gray-300 rounded"
                            defaultChecked 
                          />
                          <label htmlFor="notifyBooking" className="ml-2 block text-sm text-gray-900">
                            Booking confirmations
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="notifyPromotions" 
                            className="h-4 w-4 text-brand-teal focus:ring-brand-teal border-gray-300 rounded"
                          />
                          <label htmlFor="notifyPromotions" className="ml-2 block text-sm text-gray-900">
                            Promotions and special offers
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="notifyPayment" 
                            className="h-4 w-4 text-brand-teal focus:ring-brand-teal border-gray-300 rounded"
                            defaultChecked 
                          />
                          <label htmlFor="notifyPayment" className="ml-2 block text-sm text-gray-900">
                            Payment receipts
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Account Actions</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="text-amber-600 border-amber-600">
                          Deactivate Account
                        </Button>
                        <div>
                          <Button variant="outline" className="text-red-600 border-red-600">
                            Delete Account
                          </Button>
                          <p className="text-xs text-gray-500 mt-1">
                            This will permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
