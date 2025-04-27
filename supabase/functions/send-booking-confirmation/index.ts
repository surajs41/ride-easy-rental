
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
    
    // Send directly to user's email instead of using formspree as a middleman
    const formData = new FormData();
    formData.append("email", requestData.email);
    formData.append("name", requestData.name);
    formData.append("_subject", `RideEasy Booking Confirmation #${requestData.bookingId}`);
    
    // Create HTML email content with proper styling
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #2B8A8A; margin-top: 0; }
          h2 { color: #2B8A8A; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; }
          .header { background-color: #2B8A8A; color: white; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .footer { background-color: #f8f8f8; padding: 15px; border-radius: 5px; font-size: 12px; text-align: center; margin-top: 20px; }
          .important-note { background-color: #f0f8ff; border-left: 4px solid #2B8A8A; padding: 10px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Booking Confirmation</h1>
        </div>
        
        <div class="content">
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
          
          <div class="important-note">
            <p><strong>Important:</strong> Please arrive at the pickup location with your driver's license and a valid ID.</p>
            <p>For any changes or questions, please contact our customer service at +91-9356681781.</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing RideEasy!</p>
          <p>© 2025 RideEasy. All rights reserved.</p>
        </div>
      </body>
      </html>
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
