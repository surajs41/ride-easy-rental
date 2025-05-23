
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Bikes from "./pages/Bikes";
import BikeDetail from "./pages/BikeDetail";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookBike from "./pages/BookBike";
import BookingConfirmation from "./pages/BookingConfirmation";
import Profile from "./pages/Profile";

// Admin imports
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import BikeManagement from "./pages/admin/BikeManagement";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="bikes" element={<BikeManagement />} />
              <Route path="bookings" element={<AdminPlaceholder />} />
              <Route path="payments" element={<AdminPlaceholder />} />
              <Route path="feedbacks" element={<AdminPlaceholder />} />
              <Route path="announcements" element={<AdminPlaceholder />} />
              <Route path="settings" element={<AdminPlaceholder />} />
            </Route>
            
            {/* Regular Routes */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/bikes" element={<Bikes />} />
                      <Route path="/bike/:id" element={<BikeDetail />} />
                      <Route path="/book/:id" element={<BookBike />} />
                      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
