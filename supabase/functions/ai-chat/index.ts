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
    const { messages, provider = 'openai' } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Messages array is required');
    }

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
        throw new Error('Gemini API key not configured');
      }

      // Convert messages to Gemini format
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
        console.error('Gemini API error:', data);
        throw new Error(data.error?.message || 'Gemini API request failed');
      }

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      return new Response(
        JSON.stringify({ response: aiResponse, provider: 'gemini' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // OpenAI
      const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
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
        console.error('OpenAI API error:', data);
        throw new Error(data.error?.message || 'OpenAI API request failed');
      }

      const aiResponse = data.choices?.[0]?.message?.content;
      
      return new Response(
        JSON.stringify({ response: aiResponse, provider: 'openai' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
