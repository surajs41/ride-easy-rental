
import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBikeById } from '@/data/bikes';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';

const BookBike = () => {
  const { id } = useParams<{ id: string }>();
  const bike = id ? getBikeById(id) : undefined;
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Form state
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [pickupLocation, setPickupLocation] = useState<string>("main-office");
  const [dropLocation, setDropLocation] = useState<string>("main-office");
  const [paymentMethod, setPaymentMethod] = useState<string>("pay-online");
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Calculate rental duration and cost
  const calculateDurationInDays = () => {
    if (!startDate || !endDate) return 1;
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.ceil(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay));
  };

  const calculateTotalCost = () => {
    const days = calculateDurationInDays();
    const dailyRate = bike?.price || 0;
    const subtotal = days * dailyRate;
    const gst = subtotal * 0.18; // 18% GST
    return {
      days,
      dailyRate,
      subtotal,
      gst,
      total: subtotal + gst
    };
  };

  const { days, dailyRate, subtotal, gst, total } = calculateTotalCost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book a bike");
      return;
    }
    
    if (!isTermsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Booking confirmed successfully!");
      navigate("/booking-confirmation", { 
        state: { 
          bike, 
          startDate, 
          endDate, 
          startTime, 
          endTime,
          pickupLocation,
          dropLocation,
          total,
          bookingId: Math.random().toString(36).substring(2, 10).toUpperCase()
        } 
      });
    }, 1500);
  };
  
  if (!bike) {
    return <Navigate to="/bikes" replace />;
  }
  
  if (!user) {
    toast.error("Please log in to book a bike");
    return <Navigate to="/auth?mode=login" replace />;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Book Your Ride</h1>
          <div className="mb-8 flex items-center">
            <img 
              src={bike.imageUrl} 
              alt={bike.name} 
              className="w-16 h-16 object-cover rounded-md mr-4" 
            />
            <div>
              <h2 className="text-xl font-semibold">{bike.name}</h2>
              <p className="text-gray-600">{bike.type} | ₹{bike.price}/day</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Rental Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="start-date">Pickup Date</Label>
                  <div className="mt-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => date && setStartDate(date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="start-time">Pickup Time</Label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="start-time" 
                        type="time" 
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="end-date">Return Date</Label>
                  <div className="mt-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => date && setEndDate(date)}
                          disabled={(date) => date < startDate}
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="end-time">Return Time</Label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="end-time" 
                        type="time" 
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Rental Duration:</span>
                  <span className="font-medium">{days} day{days !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Pickup & Return Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pickup-location">Pickup Location</Label>
                  <Select
                    value={pickupLocation}
                    onValueChange={setPickupLocation}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select pickup location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main-office">Main Office - Mumbai Central</SelectItem>
                      <SelectItem value="andheri">Andheri Branch</SelectItem>
                      <SelectItem value="thane">Thane Branch</SelectItem>
                      <SelectItem value="bandra">Bandra Outlet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="drop-location">Return Location</Label>
                  <Select
                    value={dropLocation}
                    onValueChange={setDropLocation}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select return location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main-office">Main Office - Mumbai Central</SelectItem>
                      <SelectItem value="andheri">Andheri Branch</SelectItem>
                      <SelectItem value="thane">Thane Branch</SelectItem>
                      <SelectItem value="bandra">Bandra Outlet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span>Base Rental ({days} day{days !== 1 ? 's' : ''})</span>
                  <span className="font-medium">₹{dailyRate} × {days} = ₹{subtotal}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>GST (18%)</span>
                  <span className="font-medium">₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pay-online">Pay Online (Card/UPI)</SelectItem>
                      <SelectItem value="pay-later">Pay at Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isTermsAccepted}
                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                    className="h-4 w-4 text-brand-teal focus:ring-brand-teal border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the rental terms and conditions
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/bike/${bike.id}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand-teal hover:bg-brand-teal/90"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookBike;
