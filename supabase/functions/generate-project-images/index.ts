import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all published projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title, description, category, slug')
      .eq('status', 'published');

    if (projectsError) throw projectsError;

    const results = [];

    for (const project of projects || []) {
      try {
        console.log(`Generating image for: ${project.title}`);
        
        // Generate image prompt based on project
        const imagePrompt = `Create a modern, professional hero image for a ${project.category} project called "${project.title}". ${project.description}. Style: Clean, modern UI design with vibrant colors, professional tech aesthetic. High quality, detailed.`;

        // Generate image using Lovable AI
        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash-image-preview',
            messages: [{
              role: 'user',
              content: imagePrompt
            }],
            modalities: ['image', 'text']
          })
        });

        if (!aiResponse.ok) {
          const errorText = await aiResponse.text();
          console.error(`AI API error for ${project.title}:`, errorText);
          results.push({ project: project.title, status: 'failed', error: errorText });
          continue;
        }

        const aiData = await aiResponse.json();
        const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (!imageUrl) {
          console.error(`No image generated for ${project.title}`);
          results.push({ project: project.title, status: 'failed', error: 'No image in response' });
          continue;
        }

        // Extract base64 data
        const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

        // Upload to storage
        const fileName = `${project.slug}.png`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageBuffer, {
            contentType: 'image/png',
            upsert: true
          });

        if (uploadError) {
          console.error(`Upload error for ${project.title}:`, uploadError);
          results.push({ project: project.title, status: 'failed', error: uploadError.message });
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);

        // Update project with new image URL
        const { error: updateError } = await supabase
          .from('projects')
          .update({ featured_image: publicUrl })
          .eq('id', project.id);

        if (updateError) {
          console.error(`Update error for ${project.title}:`, updateError);
          results.push({ project: project.title, status: 'failed', error: updateError.message });
          continue;
        }

        console.log(`Successfully processed ${project.title}`);
        results.push({ 
          project: project.title, 
          status: 'success', 
          imageUrl: publicUrl 
        });

      } catch (error) {
        console.error(`Error processing ${project.title}:`, error);
        results.push({ 
          project: project.title, 
          status: 'failed', 
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});