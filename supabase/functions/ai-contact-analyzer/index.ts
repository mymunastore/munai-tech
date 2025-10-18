import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
