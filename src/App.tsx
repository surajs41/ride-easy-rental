
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

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
