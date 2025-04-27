import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, CalendarRange, MapPin, Info } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const bookingData = location.state;
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isStoringBooking, setIsStoringBooking] = useState(false);
  
  if (!bookingData) {
    return <Navigate to="/bikes" replace />;
  }
  
  const { 
    bike, 
    startDate, 
    endDate, 
    startTime, 
    endTime, 
    pickupLocation, 
    dropLocation, 
    total,
    bookingId
  } = bookingData;
  
  const locationNames: Record<string, string> = {
    'main-office': 'Main Office - Pune Central',
    'andheri': 'Kothrud Branch - Pune',
    'thane': 'Hinjewadi Branch - Pune',
    'bandra': 'Koregaon Park Outlet - Pune'
  };

  useEffect(() => {
    const storeBookingAndSendEmail = async () => {
      if (!user || isSendingEmail || isStoringBooking) return;
      
      try {
        setIsStoringBooking(true);
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
          
        const userName = profile ? `${profile.first_name} ${profile.last_name}` : user.email;
        
        const { error: bookingError } = await supabase.rpc('insert_booking', {
          p_id: bookingId,
          p_user_id: user.id,
          p_bike_id: bike.id,
          p_bike_name: bike.name,
          p_start_date: startDate,
          p_end_date: endDate,
          p_start_time: startTime,
          p_end_time: endTime,
          p_pickup_location: pickupLocation,
          p_drop_location: dropLocation,
          p_total_amount: total,
          p_status: 'confirmed'
        } as any);
          
        if (bookingError) {
          throw bookingError;
        }
        
        setIsStoringBooking(false);
        setIsSendingEmail(true);
        
        const response = await fetch(`https://psjwczdyybkzufkkggqj.supabase.co/functions/v1/send-booking-confirmation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzandjemR5eWJrenVma2tnZ3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMjg1MTgsImV4cCI6MjA2MDcwNDUxOH0.JUSDhRWe91UI3TtXauquGYRVo-1ROqI791ajC9FR94s`
          },
          body: JSON.stringify({
            email: user.email,
            name: userName,
            bikeName: bike.name,
            startDate: format(new Date(startDate), 'PPP'),
            endDate: format(new Date(endDate), 'PPP'),
            startTime,
            endTime,
            pickupLocation: locationNames[pickupLocation],
            dropLocation: locationNames[dropLocation],
            total,
            bookingId
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to send confirmation email');
        }
        
        console.log('Confirmation email sent successfully');
      } catch (error) {
        console.error('Error in booking confirmation process:', error);
        toast.error('There was an issue processing your booking. Please contact support.');
      } finally {
        setIsSendingEmail(false);
        setIsStoringBooking(false);
      }
    };
    
    storeBookingAndSendEmail();
  }, [user, bookingId]);
  
  const handleDownloadInvoice = () => {
    toast.success(`Downloading invoice for booking ${bookingId}...`);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-green-500 text-white p-6 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
            <p className="text-lg mt-2">Your bike has been successfully reserved</p>
          </div>
          
          <div className="p-6">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Booking Details</h2>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">Booking ID: {bookingId}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-6">
                  <img 
                    src={bike.imageUrl} 
                    alt={bike.name} 
                    className="w-20 h-20 object-cover rounded-md mr-4" 
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{bike.name}</h3>
                    <p className="text-gray-600 capitalize">{bike.type}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CalendarRange className="h-5 w-5 mt-0.5 mr-2 text-gray-500" />
                    <div>
                      <p className="font-medium">Rental Period</p>
                      <p className="text-gray-600">From: {format(new Date(startDate), 'PPP')} at {startTime}</p>
                      <p className="text-gray-600">To: {format(new Date(endDate), 'PPP')} at {endTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mt-0.5 mr-2 text-gray-500" />
                    <div>
                      <p className="font-medium">Pickup Location</p>
                      <p className="text-gray-600">{locationNames[pickupLocation]}</p>
                      <p className="font-medium mt-2">Return Location</p>
                      <p className="text-gray-600">{locationNames[dropLocation]}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Rental Charge</span>
                    <span>₹{(total / 1.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{(total - (total / 1.18)).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={handleDownloadInvoice}
                    className="w-full flex items-center justify-center"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Please arrive at the pickup location with a valid ID and driver's license. For any changes or queries,
                      contact our customer service at <span className="font-medium">+91-9356681781</span>.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => navigate('/bikes')}
                  className="bg-brand-teal hover:bg-brand-teal/90"
                >
                  Browse More Bikes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
