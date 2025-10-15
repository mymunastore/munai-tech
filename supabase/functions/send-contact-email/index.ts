import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  project_type?: string;
  budget_range?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();
    console.log("Processing contact form submission:", { email: data.email, name: data.name });

    // Send notification email to yourself
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["hello@example.com"], // Replace with your actual email
        reply_to: data.email,
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
          ${data.project_type ? `<p><strong>Project Type:</strong> ${data.project_type}</p>` : ""}
          ${data.budget_range ? `<p><strong>Budget Range:</strong> ${data.budget_range}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.json();
      throw new Error(`Failed to send admin email: ${JSON.stringify(error)}`);
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
        from: "Kingsley Portfolio <onboarding@resend.dev>",
        to: [data.email],
        subject: "Thanks for reaching out!",
        html: `
          <h2>Hi ${data.name},</h2>
          <p>Thank you for contacting me! I've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${data.message.replace(/\n/g, "<br>")}
          </p>
          <p>Best regards,<br>Kingsley</p>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.json();
      console.error("Failed to send user confirmation:", error);
    } else {
      console.log("User confirmation email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
