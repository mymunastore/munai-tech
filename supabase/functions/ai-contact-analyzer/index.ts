import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, projectType, budget } = await req.json();
    
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
      console.error('OpenAI API error:', data);
      throw new Error(data.error?.message || 'OpenAI API request failed');
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
    console.error('Error in ai-contact-analyzer:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
