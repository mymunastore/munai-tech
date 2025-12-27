import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

const contactEmailSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().email().max(255),
  company: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(50).optional(),
  project_type: z.string().trim().max(100).optional(),
  budget_range: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10).max(5000),
});

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Rate limiting: 5 requests per 5 minutes per IP
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const canProceed = await checkRateLimit(supabase, ip, 'send-contact-email', 5, 5);
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
    const data = contactEmailSchema.parse(requestData);

    // Send notification email to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["kingsleymunachi9@gmail.com"],
        reply_to: data.email,
        subject: `New Contact Form Submission from ${escapeHtml(data.name)}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ""}
          ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
          ${data.project_type ? `<p><strong>Project Type:</strong> ${escapeHtml(data.project_type)}</p>` : ""}
          ${data.budget_range ? `<p><strong>Budget Range:</strong> ${escapeHtml(data.budget_range)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.json();
      console.error("[Internal] Failed to send admin email:", error.statusCode);
      throw new Error("Email service unavailable");
    }

    console.log("Admin email sent successfully");

    // Send confirmation email to the user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Kingsley Munachi <onboarding@resend.dev>",
        to: [data.email],
        subject: "Thanks for reaching out!",
        html: `
          <h2>Hi ${escapeHtml(data.name)},</h2>
          <p>Thank you for contacting me! I've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${escapeHtml(data.message).replace(/\n/g, "<br>")}
          </p>
          <p>Best regards,<br>Kingsley Munachi</p>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      console.error("[Internal] Failed to send user confirmation");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("[Internal] Error in send-contact-email:", error);
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid input data" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
