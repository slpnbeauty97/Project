import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface PredictionRequest {
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  lotSize: number;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sqft, bedrooms, bathrooms, yearBuilt, lotSize } = await req.json() as PredictionRequest;

    // Here you would typically call your ML model
    // For now, we'll use a simple placeholder calculation
    // Replace this with your actual ML prediction logic
    const predictedPrice = (sqft * 200) + 
                         (bedrooms * 25000) + 
                         (bathrooms * 15000) + 
                         ((2024 - yearBuilt) * -1000) + 
                         (lotSize * 50);

    return new Response(
      JSON.stringify({ 
        predictedPrice: Math.round(predictedPrice),
        confidence: 0.85 
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});