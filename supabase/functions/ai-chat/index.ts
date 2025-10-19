import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

const aiChatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
  provider: z.enum(["gemini", "openai"]).default("openai"),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Rate limiting: 20 requests per 1 minute per IP (database-backed)
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const canProceed = await checkRateLimit(supabase, ip, 'ai-chat', 20, 1);
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
    const { messages, provider } = aiChatRequestSchema.parse(requestData);

    const systemPrompt = `You are an AI assistant for Kingsley Munachi's professional portfolio. 
    
Key Information:
- Full-stack developer with 18+ completed projects
- Specializes in AI Integration, Web Development, and SaaS Solutions
- Expert in React, Node.js, TypeScript, Python, PostgreSQL
- Experience with OpenAI, Gemini AI, and various modern frameworks
- Focus areas: AI-powered web applications, custom software solutions, technical consulting

Notable Projects:
- AI-powered note-taking app with intelligent suggestions
- Consulting SaaS platform with client management
- Real-time meeting scheduler with AI optimization
- E-commerce platforms and inventory systems

Skills:
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Python, PostgreSQL, Supabase
- AI/ML: OpenAI API, Gemini AI, prompt engineering
- DevOps: Git, CI/CD, cloud deployment

Your role is to:
1. Answer questions about Kingsley's experience, skills, and projects
2. Provide information about his services and expertise
3. Help visitors understand his capabilities and past work
4. Be professional, concise, and informative
5. Encourage visitors to reach out via the contact form for project inquiries`;

    let response;
    
    if (provider === 'gemini') {
      const GEMINI_API_KEY = Deno.env.get('GEMINI_AI_API_KEY');
      if (!GEMINI_API_KEY) {
        throw new Error('AI service not configured');
      }

      const geminiMessages = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: systemPrompt }] },
              ...geminiMessages
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        console.error('[Internal] Gemini API error:', response.status, data.error?.code);
        throw new Error('AI service unavailable');
      }

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      return new Response(
        JSON.stringify({ response: aiResponse, provider: 'gemini' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
      if (!OPENAI_API_KEY) {
        throw new Error('AI service not configured');
      }

      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          max_completion_tokens: 1024,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('[Internal] OpenAI API error:', response.status, data.error?.code);
        throw new Error('AI service unavailable');
      }

      const aiResponse = data.choices?.[0]?.message?.content;
      
      return new Response(
        JSON.stringify({ response: aiResponse, provider: 'openai' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('[Internal] Error in ai-chat:', error);
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Invalid message format' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
