import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const categories = [
  {
    id: "ai",
    label: "Artificial Intelligence",
    prompt:
      "Generate 5 realistic, current news summaries about the latest developments in artificial intelligence for April 2026. Include topics like: new AI model releases, AI regulation updates, enterprise AI adoption, AI safety research, and AI in healthcare/finance. Each should feel like a real news article summary.",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    prompt:
      "Generate 5 realistic, current news summaries about the latest cybersecurity developments for April 2026. Include topics like: zero-day vulnerabilities, ransomware trends, government cybersecurity policy, cloud security innovations, and threat intelligence updates. Each should feel like a real news article summary.",
  },
  {
    id: "tech_leaders",
    label: "Tech Leaders",
    prompt:
      "Generate 3 realistic, current news summaries about notable stories from influential tech industry leaders for April 2026. Include topics like: CEO announcements, leadership changes, keynote speeches, industry predictions, and strategic pivots by major tech companies.",
  },
  {
    id: "emerging_trends",
    label: "Emerging Trends",
    prompt:
      "Generate 3 realistic, current news summaries about emerging technology trends for April 2026. Include topics like: quantum computing progress, edge AI, autonomous systems, Web3 infrastructure, and sustainable tech innovations.",
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Require authenticated admin caller
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: isAdmin, error: roleErr } = await supabase.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (roleErr || !isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { category } = await req.json().catch(() => ({ category: null }));
    const targetCategories = category
      ? categories.filter((c) => c.id === category)
      : categories;

    const allInsights: any[] = [];

    for (const cat of targetCategories) {
      console.log(`Curating ${cat.label} insights...`);

      const response = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              {
                role: "system",
                content: `You are a senior tech journalist and analyst. Generate realistic, well-written news summaries that would appear on a professional technology news platform. Each article should have a compelling headline, a 2-3 sentence summary, and relevant tags. Write as if these are real current events. Return ONLY valid JSON.`,
              },
              {
                role: "user",
                content: `${cat.prompt}

Return as a JSON array with this exact structure:
[
  {
    "title": "Compelling headline here",
    "summary": "2-3 sentence summary of the news story with specific details and context.",
    "content": "A longer 3-5 paragraph article body with analysis and context.",
    "source_name": "A realistic publication name (e.g., TechCrunch, Wired, MIT Technology Review, The Verge, Ars Technica)",
    "author_name": "A realistic journalist name",
    "tags": ["tag1", "tag2", "tag3"],
    "relevance_score": 85
  }
]

Return ONLY the JSON array, no markdown formatting, no code blocks.`,
              },
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "publish_insights",
                  description: "Publish curated tech insights",
                  parameters: {
                    type: "object",
                    properties: {
                      articles: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            title: { type: "string" },
                            summary: { type: "string" },
                            content: { type: "string" },
                            source_name: { type: "string" },
                            author_name: { type: "string" },
                            tags: {
                              type: "array",
                              items: { type: "string" },
                            },
                            relevance_score: { type: "number" },
                          },
                          required: [
                            "title",
                            "summary",
                            "content",
                            "source_name",
                            "author_name",
                            "tags",
                            "relevance_score",
                          ],
                          additionalProperties: false,
                        },
                      },
                    },
                    required: ["articles"],
                    additionalProperties: false,
                  },
                },
              },
            ],
            tool_choice: {
              type: "function",
              function: { name: "publish_insights" },
            },
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error(`AI gateway error for ${cat.label}:`, response.status, errText);
        if (response.status === 429) {
          return new Response(
            JSON.stringify({ error: "Rate limited. Please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (response.status === 402) {
          return new Response(
            JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        continue;
      }

      const data = await response.json();
      let articles: any[] = [];

      // Extract from tool call response
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        try {
          const parsed = JSON.parse(toolCall.function.arguments);
          articles = parsed.articles || parsed;
        } catch (e) {
          console.error("Failed to parse tool call response:", e);
          continue;
        }
      }

      for (const article of articles) {
        allInsights.push({
          title: article.title,
          summary: article.summary,
          content: article.content,
          source_name: article.source_name,
          author_name: article.author_name,
          category: cat.id,
          tags: article.tags,
          relevance_score: article.relevance_score || 80,
          is_published: true,
          is_featured: (article.relevance_score || 80) >= 90,
          published_at: new Date().toISOString(),
          curated_at: new Date().toISOString(),
        });
      }
    }

    if (allInsights.length > 0) {
      const { error: insertError } = await supabase
        .from("tech_insights")
        .insert(allInsights);

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error(`Failed to save insights: ${insertError.message}`);
      }
    }

    console.log(`Successfully curated ${allInsights.length} insights`);

    return new Response(
      JSON.stringify({
        success: true,
        count: allInsights.length,
        categories: targetCategories.map((c) => c.id),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Curation error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
