import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Database-backed rate limiter
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

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().email().max(255),
  message: z.string().trim().min(10).max(5000),
  projectType: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(100).optional(),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Rate limiting: 10 requests per 5 minutes per IP
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const canProceed = await checkRateLimit(supabase, ip, 'ai-contact-analyzer', 10, 5);
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
    const { name, email, message, projectType, budget } = contactSchema.parse(requestData);
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const analysisPrompt = `Analyze this contact form submission and provide insights:

Name: ${name}
Email: ${email}
Project Type: ${projectType}
Budget: ${budget}
Message: ${message}

Provide a JSON response with:
1. priority: "high", "medium", or "low" based on project complexity and budget
2. category: categorize the inquiry (e.g., "AI Integration", "Web Development", "Consulting")
3. sentiment: "positive", "neutral", or "urgent"
4. suggestedResponse: a brief suggested response approach
5. keyPoints: array of key points to address

Respond ONLY with valid JSON.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that analyzes contact form submissions for a professional developer portfolio. Always respond with valid JSON only.'
          },
          { role: 'user', content: analysisPrompt }
        ],
        max_completion_tokens: 500,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('[Internal] OpenAI API error:', response.status, data.error?.code);
      throw new Error('AI analysis service unavailable');
    }

    const aiResponse = data.choices?.[0]?.message?.content;
    let analysis;
    
    try {
      analysis = JSON.parse(aiResponse);
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', aiResponse);
      // Fallback analysis
      analysis = {
        priority: 'medium',
        category: projectType,
        sentiment: 'neutral',
        suggestedResponse: 'Thank the client and provide timeline information',
        keyPoints: ['Acknowledge inquiry', 'Confirm availability']
      };
    }

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Internal] Error in ai-contact-analyzer:', error);
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Invalid input data' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
