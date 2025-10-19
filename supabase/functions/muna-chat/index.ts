import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Database-backed rate limiter (persists across function restarts)
async function checkRateLimit(
  supabase: any,
  ip: string,
  functionName: string,
  maxRequests: number,
  windowMinutes: number
): Promise<boolean> {
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

  const { data: existing, error: fetchError } = await supabase
    .from('edge_function_rate_limits')
    .select('id, request_count')
    .eq('ip_address', ip)
    .eq('function_name', functionName)
    .gte('window_start', windowStart)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    return true; // Fail open on error
  }

  if (!existing) {
    await supabase.from('edge_function_rate_limits').insert({
      ip_address: ip,
      function_name: functionName,
      request_count: 1,
      window_start: new Date().toISOString()
    });
    return true;
  }

  if (existing.request_count >= maxRequests) {
    return false;
  }

  await supabase.from('edge_function_rate_limits')
    .update({ request_count: existing.request_count + 1 })
    .eq('id', existing.id);

  return true;
}

const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().trim().min(1).max(10000),
});

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Rate limiting: 20 requests per 1 minute per IP (database-backed)
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const canProceed = await checkRateLimit(supabase, ip, 'muna-chat', 20, 1);
  if (!canProceed) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Cleanup old rate limit entries (1% chance)
  if (Math.random() < 0.01) {
    await supabase.rpc('cleanup_rate_limits');
  }

  try {
    const requestData = await req.json();
    const { messages } = chatRequestSchema.parse(requestData);
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are Muna, an AI assistant for Kingsley Munachi's portfolio website. You help visitors learn about Kingsley's work and services.

About Kingsley Munachi:
- Senior Web Designer & AI Full-Stack App Developer
- Education: BSc from University of Calabar, Diploma from Temple Gate Polytechnic, Aba
- Expertise: Web Design, UI/UX, AI Integration, Full-Stack Development, React, TypeScript
- Experience: 5+ years, delivered 50+ AI projects for 100+ enterprise clients
- Skills: React, TypeScript, Node.js, AI/ML, Design Systems, Responsive Design

Services offered:
- AI-Powered Web Applications
- Custom SaaS Development
- E-commerce Solutions
- Mobile App Development
- UI/UX Design
- Consulting & Strategy

Your role:
- Answer questions about Kingsley's services and expertise
- Help visitors navigate the portfolio
- Provide project estimates and timelines
- Direct serious inquiries to the contact form
- Be professional, helpful, and concise
- Highlight Kingsley's achievements and unique value

Keep responses clear, friendly, and professional. If someone wants to hire Kingsley or discuss a project, encourage them to use the contact form.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.error("[Internal] AI gateway error:", response.status);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("[Internal] Chat error:", error);
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid message format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});