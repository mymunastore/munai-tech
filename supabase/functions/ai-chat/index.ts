import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    return true;
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
});

const SYSTEM_PROMPT = `You are the official AI assistant for MunAiTech (15071995 LLC), a Global AI Infrastructure & Cybersecurity Engineering Company headquartered at 212 N. 2nd St., STE 100, Richmond, KY, 40475, United States.

COMPANY OVERVIEW:
- Global AI Infrastructure & Cybersecurity Engineering Company
- 30+ production-grade systems delivered across enterprise, fintech, defence, and government sectors
- International recognition and government engagements across multiple countries
- Founded 2021, incorporated 2025, international recognition 2026

CORE CAPABILITIES:
- AI-Powered Systems: Custom AI agents, intelligent automation, RAG pipelines, LLM integration
- Cybersecurity Engineering: Threat detection, secure architecture, compliance frameworks, penetration testing
- Enterprise Software: Full-stack web/mobile applications, SaaS platforms, API development
- Cloud & DevOps: AWS, Azure, GCP deployment, CI/CD pipelines, infrastructure as code
- Data Engineering: Real-time analytics, ETL pipelines, data visualization dashboards

TECH STACK:
- Frontend: React, TypeScript, Next.js, Tailwind CSS
- Backend: Node.js, Python, PostgreSQL, Supabase, FastAPI
- AI/ML: OpenAI, Google Gemini, LangChain, vector databases
- DevOps: Docker, Kubernetes, GitHub Actions, Terraform

SERVICES OFFERED:
- Managed AI & Cybersecurity Services
- Custom Software Development
- Technical Consulting & Advisory
- System Architecture & Design
- AI Integration & Automation

CONTACT INFORMATION:
- For all inquiries, direct users to reach out via the website's contact form or email button
- LinkedIn: linkedin.com/in/munaitech
- GitHub: github.com/mymunastore
- Location: Ashland, Kentucky, USA (Global Operations)

YOUR GUIDELINES:
1. Be professional, knowledgeable, and concise
2. Answer questions about MunAiTech's services, capabilities, experience, and projects
3. For project inquiries, pricing, or partnerships, direct users to use the "Reach Out" or "Contact" buttons on the website
4. Never share direct email addresses or phone numbers in chat - always direct to the website buttons
5. Never share internal pricing details - direct to contact form for custom quotes
6. Be helpful with technical questions related to our expertise areas
7. If asked about something outside our scope, acknowledge it and redirect to our core competencies
8. Always maintain a professional but approachable tone
9. When collecting feedback, thank the user and let them know it will be reviewed
10. For any communication needs, always direct users to use the contact page on the website`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const canProceed = await checkRateLimit(supabase, ip, 'ai-chat', 30, 1);
  if (!canProceed) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
      { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  if (Math.random() < 0.01) {
    await supabase.rpc('cleanup_rate_limits');
  }

  try {
    const requestData = await req.json();
    const { messages } = aiChatRequestSchema.parse(requestData);

    // Use Lovable AI proxy - no API key needed
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('AI service not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Internal] Lovable AI error:', response.status, errText);
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('Empty AI response');
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Internal] Error in ai-chat:', error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Invalid message format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Failed to process chat request. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
