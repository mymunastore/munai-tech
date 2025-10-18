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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          line-height: 1.6; 
          color: #1e293b; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          min-height: 100vh;
        }
        .receipt-wrapper {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }
        .receipt-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          text-align: center;
          position: relative;
        }
        .receipt-header::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 0;
          right: 0;
          height: 20px;
          background: white;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        .company-logo {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 8px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .company-tagline {
          font-size: 14px;
          opacity: 0.95;
          font-weight: 300;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .receipt-body {
          padding: 40px;
        }
        .receipt-title {
          text-align: center;
          margin-bottom: 40px;
        }
        .receipt-title h1 {
          font-size: 28px;
          color: #667eea;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }
        .receipt-number {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 40px;
        }
        .info-card {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        .info-card h3 {
          color: #667eea;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #667eea;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .info-item:last-child {
          border-bottom: none;
        }
        .info-label {
          font-weight: 600;
          color: #475569;
          font-size: 13px;
        }
        .info-value {
          color: #1e293b;
          font-weight: 500;
          text-align: right;
          font-size: 13px;
        }
        .service-details {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 30px;
          border-left: 4px solid #667eea;
        }
        .service-details h3 {
          color: #667eea;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }
        .service-details p {
          color: #475569;
          line-height: 1.8;
        }
        .amount-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 32px;
          border-radius: 12px;
          margin: 40px 0;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .amount-label {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }
        .amount-value {
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -1px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .payment-status {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-top: 16px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        .thank-you {
          text-align: center;
          padding: 30px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-radius: 12px;
          margin: 30px 0;
        }
        .thank-you h2 {
          color: #92400e;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .thank-you p {
          color: #78350f;
          font-size: 14px;
        }
        .receipt-footer {
          background: #f8fafc;
          padding: 32px;
          text-align: center;
          border-top: 2px solid #e2e8f0;
        }
        .company-info {
          margin-bottom: 20px;
        }
        .company-info h4 {
          color: #1e293b;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .contact-details {
          color: #64748b;
          font-size: 13px;
          line-height: 2;
        }
        .contact-details a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }
        .footer-note {
          color: #94a3b8;
          font-size: 11px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }
        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          .amount-value {
            font-size: 36px;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt-wrapper">
        <div class="receipt-header">
          <div class="company-logo">MunAiTech</div>
          <div class="company-tagline">Professional Digital Solutions</div>
        </div>

        <div class="receipt-body">
          <div class="receipt-title">
            <h1>PAYMENT RECEIPT</h1>
            <div class="receipt-number">#${data.receipt_number}</div>
          </div>

          <div class="info-grid">
            <div class="info-card">
              <h3>Receipt Details</h3>
              <div class="info-item">
                <span class="info-label">Date Issued</span>
                <span class="info-value">${formatDate(currentDate)}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Payment Method</span>
                <span class="info-value">${data.payment_method.replace('_', ' ').toUpperCase()}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Status</span>
                <span class="info-value" style="color: #10b981; font-weight: 700;">PAID</span>
              </div>
            </div>

            <div class="info-card">
              <h3>Customer Information</h3>
              <div class="info-item">
                <span class="info-label">Name</span>
                <span class="info-value">${data.customer_name}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">${data.customer_email}</span>
              </div>
              ${data.customer_address ? `
              <div class="info-item">
                <span class="info-label">Address</span>
                <span class="info-value">${data.customer_address}</span>
              </div>
              ` : ''}
            </div>
          </div>

          <div class="service-details">
            <h3>Service Description</h3>
            <p>${data.project_description}</p>
          </div>

          ${data.notes ? `
          <div class="service-details">
            <h3>Additional Notes</h3>
            <p>${data.notes}</p>
          </div>
          ` : ''}

          <div class="amount-section">
            <div class="amount-label">Total Amount Paid</div>
            <div class="amount-value">${formatCurrency(data.payment_amount)}</div>
            <div class="payment-status">✓ Payment Received</div>
          </div>

          <div class="thank-you">
            <h2>Thank You!</h2>
            <p>We appreciate your business and look forward to working with you again.</p>
          </div>
        </div>

        <div class="receipt-footer">
          <div class="company-info">
            <h4>MunAiTech</h4>
            <div class="contact-details">
              Email: <a href="mailto:info@mymuna.store">info@mymuna.store</a><br>
              WhatsApp: <a href="https://wa.me/2347062372521">+234 706 237 2521</a><br>
              Location: Lagos, Nigeria | Remote Services Available
            </div>
          </div>
          <div class="footer-note">
            This is an official receipt from MunAiTech. Please retain this for your records.<br>
            For any inquiries regarding this receipt, please contact us at info@mymuna.store
          </div>
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

    // Send receipt to test email (Resend test mode restriction)
    // In test mode, can only send to verified email: adigwekingsley8@gmail.com
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MunAiTech <onboarding@resend.dev>",
        to: ["adigwekingsley8@gmail.com"],
        subject: `Payment Receipt - ${data.receipt_number} (for: ${data.customer_name})`,
        html: receiptHTML,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Receipt sent successfully to test email:", emailResult);

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
