
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  email: string;
  name: string;
  bikeName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  pickupLocation: string;
  dropLocation: string;
  total: number;
  bookingId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Use the Formspree ID from environment variables or settings
    const FORMSPREE_ID = Deno.env.get("FORMSPREE_ID") || "mqaprnqz";
    const requestData: BookingConfirmationRequest = await req.json();
    
    // Format the booking details for the email
    const formData = new FormData();
    formData.append("email", requestData.email);
    formData.append("name", requestData.name);
    formData.append("_subject", `RideEasy Booking Confirmation #${requestData.bookingId}`);
    
    // Create HTML email content
    const emailContent = `
      <h1>Booking Confirmation</h1>
      <p>Hello ${requestData.name},</p>
      <p>Your bike rental booking has been confirmed! Here are the details:</p>
      
      <h2>Booking Details</h2>
      <p><strong>Booking ID:</strong> ${requestData.bookingId}</p>
      <p><strong>Bike:</strong> ${requestData.bikeName}</p>
      
      <h2>Rental Period</h2>
      <p><strong>From:</strong> ${requestData.startDate} at ${requestData.startTime}</p>
      <p><strong>To:</strong> ${requestData.endDate} at ${requestData.endTime}</p>
      
      <h2>Locations</h2>
      <p><strong>Pickup Location:</strong> ${requestData.pickupLocation}</p>
      <p><strong>Return Location:</strong> ${requestData.dropLocation}</p>
      
      <h2>Payment</h2>
      <p><strong>Total Amount:</strong> ₹${requestData.total.toFixed(2)}</p>
      
      <p>Please arrive at the pickup location with your driver's license and a valid ID.</p>
      <p>For any changes or questions, please contact our customer service.</p>
      
      <p>Thank you for choosing RideEasy!</p>
    `;
    
    formData.append("message", emailContent);
    
    // Send the email via Formspree
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error("Failed to send confirmation email");
    }
    
    const responseData = await response.json();
    console.log("Email sent successfully:", responseData);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
