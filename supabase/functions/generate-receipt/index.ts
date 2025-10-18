import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") as string;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReceiptData {
  receipt_number: string;
  customer_name: string;
  customer_email: string;
  customer_address?: string;
  payment_amount: number;
  payment_method: string;
  project_description: string;
  notes?: string;
}

const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-NG', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const generateReceiptHTML = (data: ReceiptData): string => {
  const currentDate = new Date();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { 
          font-family: 'Helvetica Neue', Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 20px;
        }
        .receipt-container {
          border: 2px solid #2563eb;
          border-radius: 12px;
          padding: 40px;
          background: #ffffff;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 5px;
        }
        .tagline {
          color: #64748b;
          font-size: 14px;
        }
        .receipt-title {
          background: #2563eb;
          color: white;
          padding: 15px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .info-section {
          margin-bottom: 25px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .info-label {
          font-weight: 600;
          color: #475569;
        }
        .info-value {
          color: #1e293b;
        }
        .amount-section {
          background: #f1f5f9;
          padding: 20px;
          border-radius: 8px;
          margin: 30px 0;
        }
        .amount-row {
          display: flex;
          justify-content: space-between;
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
          text-align: center;
          color: #64748b;
          font-size: 12px;
        }
        .contact-info {
          margin-top: 15px;
          font-size: 13px;
        }
        .stamp {
          text-align: right;
          margin-top: 30px;
          font-style: italic;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <div class="header">
          <div class="logo">MunAiTech</div>
          <div class="tagline">Professional Digital Solutions</div>
        </div>

        <div class="receipt-title">PAYMENT RECEIPT</div>

        <div class="info-section">
          <div class="info-row">
            <span class="info-label">Receipt Number:</span>
            <span class="info-value">${data.receipt_number}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Date:</span>
            <span class="info-value">${formatDate(currentDate)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Payment Method:</span>
            <span class="info-value">${data.payment_method.replace('_', ' ').toUpperCase()}</span>
          </div>
        </div>

        <div class="info-section">
          <h3 style="color: #2563eb; margin-bottom: 15px;">Customer Information</h3>
          <div class="info-row">
            <span class="info-label">Name:</span>
            <span class="info-value">${data.customer_name}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email:</span>
            <span class="info-value">${data.customer_email}</span>
          </div>
          ${data.customer_address ? `
          <div class="info-row">
            <span class="info-label">Address:</span>
            <span class="info-value">${data.customer_address}</span>
          </div>
          ` : ''}
        </div>

        <div class="info-section">
          <h3 style="color: #2563eb; margin-bottom: 15px;">Service Details</h3>
          <p style="padding: 15px; background: #f8fafc; border-radius: 6px; margin: 0;">
            ${data.project_description}
          </p>
        </div>

        ${data.notes ? `
        <div class="info-section">
          <h3 style="color: #2563eb; margin-bottom: 15px;">Additional Notes</h3>
          <p style="padding: 15px; background: #f8fafc; border-radius: 6px; margin: 0;">
            ${data.notes}
          </p>
        </div>
        ` : ''}

        <div class="amount-section">
          <div class="amount-row">
            <span>Total Amount Paid:</span>
            <span>${formatCurrency(data.payment_amount)}</span>
          </div>
        </div>

        <div class="stamp">
          <p style="margin: 5px 0;"><strong>Status: PAID</strong></p>
          <p style="margin: 5px 0;">Thank you for your business!</p>
        </div>

        <div class="footer">
          <p><strong>MunAiTech</strong> - Professional Digital Solutions</p>
          <div class="contact-info">
            <p>Email: info@mymuna.store | WhatsApp: +234 706 237 2521</p>
            <p>Lagos, Nigeria | Available for Remote Work</p>
          </div>
          <p style="margin-top: 15px; font-size: 11px;">
            This is an official receipt from MunAiTech. For any queries, please contact us at info@mymuna.store
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ReceiptData = await req.json();
    
    console.log("Generating receipt for:", data.receipt_number);

    const receiptHTML = generateReceiptHTML(data);

    // Send receipt to customer
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MunAiTech <onboarding@resend.dev>",
        to: [data.customer_email],
        subject: `Payment Receipt - ${data.receipt_number}`,
        html: receiptHTML,
      }),
    });

    console.log("Receipt sent successfully:", await emailResponse.json());

    // Also send a copy to yourself
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MunAiTech <onboarding@resend.dev>",
        to: ["info@mymuna.store"],
        subject: `[Copy] Payment Receipt - ${data.receipt_number}`,
        html: receiptHTML,
      }),
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        receipt_number: data.receipt_number,
        message: "Receipt generated and sent successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error generating receipt:", error);
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
