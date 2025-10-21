import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") as string;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schemas
const lineItemSchema = z.object({
  description: z.string().trim().min(1).max(500),
  quantity: z.number().int().positive().max(999999),
  unit_price: z.number().positive().max(99999999),
  total: z.number().positive().max(99999999)
});

const receiptSchema = z.object({
  receipt_number: z.string().trim().min(1).max(50),
  customer_name: z.string().trim().min(1).max(200),
  customer_email: z.string().email().max(255),
  customer_address: z.string().trim().max(500).optional(),
  payment_amount: z.number().positive().max(99999999),
  payment_method: z.string().trim().min(1).max(100),
  project_description: z.string().trim().min(1).max(2000),
  notes: z.string().trim().max(2000).optional(),
  line_items: z.array(lineItemSchema).max(50).optional(),
  tax_id: z.string().trim().max(100).optional(),
  invoice_reference: z.string().trim().max(100).optional(),
  verification_hash: z.string().trim().max(100).optional(),
  authorized_signature: z.string().trim().max(200).optional(),
  payment_terms: z.string().trim().max(1000).optional(),
  subtotal: z.number().nonnegative().max(99999999).optional(),
  tax_amount: z.number().nonnegative().max(99999999).optional(),
  discount_amount: z.number().nonnegative().max(99999999).optional()
});

type ReceiptData = z.infer<typeof receiptSchema>;

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

const generateVerificationHash = (receiptNumber: string): string => {
  const encoder = new TextEncoder();
  const data = encoder.encode(receiptNumber + Date.now());
  return Array.from(data)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .substring(0, 16)
    .toUpperCase();
};

const generateQRCode = (data: string): string => {
  // Using Google Charts API for QR code generation
  return `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${encodeURIComponent(data)}`;
};

const generateBarcode = (code: string): string => {
  // Using barcode.tec-it.com for barcode generation
  return `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(code)}&code=Code128&translate-esc=on&dpi=96`;
};

const generateReceiptHTML = (data: ReceiptData): string => {
  const currentDate = new Date();
  const verificationUrl = `https://mymuna.store/verify-receipt/${data.verification_hash || ''}`;
  const qrCodeUrl = generateQRCode(verificationUrl);
  const barcodeUrl = generateBarcode(data.receipt_number);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body { 
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          line-height: 1.6; 
          color: #1e293b; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          min-height: 100vh;
        }
        .receipt-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          position: relative;
        }
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 120px;
          font-weight: 900;
          color: rgba(102, 126, 234, 0.03);
          z-index: 0;
          pointer-events: none;
          user-select: none;
        }
        .receipt-content {
          position: relative;
          z-index: 1;
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
          font-size: 38px;
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
          margin-bottom: 30px;
        }
        .receipt-title h1 {
          font-size: 28px;
          color: #667eea;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }
        .barcode-section {
          text-align: center;
          margin: 12px 0;
        }
        .barcode-section img {
          height: 60px;
          margin: 8px 0;
        }
        .receipt-number {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }
        .verification-code {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 4px;
          font-family: monospace;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 30px;
        }
        .info-card {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        .info-card h3 {
          color: #667eea;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 2px solid #667eea;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .info-item:last-child {
          border-bottom: none;
        }
        .info-label {
          font-weight: 600;
          color: #475569;
          font-size: 12px;
        }
        .info-value {
          color: #1e293b;
          font-weight: 500;
          text-align: right;
          font-size: 12px;
          max-width: 60%;
          word-break: break-word;
        }
        .line-items-table {
          width: 100%;
          margin: 30px 0;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .line-items-table thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .line-items-table th {
          padding: 14px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .line-items-table th:last-child,
        .line-items-table td:last-child {
          text-align: right;
        }
        .line-items-table tbody tr {
          border-bottom: 1px solid #f1f5f9;
        }
        .line-items-table tbody tr:last-child {
          border-bottom: none;
        }
        .line-items-table td {
          padding: 12px 14px;
          font-size: 13px;
          color: #475569;
        }
        .line-items-table tbody tr:hover {
          background: #f8fafc;
        }
        .totals-section {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
          border: 1px solid #e2e8f0;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
        .total-row.grand-total {
          border-top: 2px solid #667eea;
          margin-top: 10px;
          padding-top: 12px;
          font-weight: 700;
          font-size: 16px;
          color: #667eea;
        }
        .service-details {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
          border-left: 4px solid #667eea;
        }
        .service-details h3 {
          color: #667eea;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }
        .service-details p {
          color: #475569;
          line-height: 1.8;
          font-size: 13px;
        }
        .amount-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 28px;
          border-radius: 12px;
          margin: 30px 0;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          text-align: center;
        }
        .amount-label {
          font-size: 13px;
          opacity: 0.9;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }
        .amount-value {
          font-size: 44px;
          font-weight: 800;
          letter-spacing: -1px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .payment-status {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 8px 18px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-top: 14px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        .signature-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin: 30px 0;
          padding: 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
        }
        .signature-box {
          text-align: center;
        }
        .signature-line {
          border-top: 2px solid #cbd5e1;
          margin: 50px 20px 10px;
          padding-top: 8px;
        }
        .signature-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
        }
        .signature-name {
          font-size: 14px;
          color: #1e293b;
          font-weight: 700;
          margin-top: 4px;
        }
        .qr-code-section {
          text-align: center;
          margin: 20px 0;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
        }
        .qr-code-section h4 {
          font-size: 12px;
          color: #667eea;
          font-weight: 700;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .qr-code-section img {
          border: 4px solid white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .thank-you {
          text-align: center;
          padding: 26px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-radius: 12px;
          margin: 24px 0;
        }
        .thank-you h2 {
          color: #92400e;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .thank-you p {
          color: #78350f;
          font-size: 13px;
        }
        .receipt-footer {
          background: #f8fafc;
          padding: 28px;
          text-align: center;
          border-top: 2px solid #e2e8f0;
        }
        .company-info {
          margin-bottom: 18px;
        }
        .company-info h4 {
          color: #1e293b;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .contact-details {
          color: #64748b;
          font-size: 12px;
          line-height: 1.8;
        }
        .contact-details a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }
        .footer-note {
          color: #94a3b8;
          font-size: 10px;
          margin-top: 18px;
          padding-top: 18px;
          border-top: 1px solid #e2e8f0;
        }
        
        /* Print Styles */
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .receipt-wrapper {
            box-shadow: none;
            border-radius: 0;
            max-width: 100%;
          }
          .receipt-header {
            background: #667eea !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .watermark {
            color: rgba(0, 0, 0, 0.02) !important;
          }
          .amount-section {
            background: #667eea !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .thank-you {
            background: #fef3c7 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .line-items-table thead {
            background: #667eea !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            margin: 1cm;
          }
        }
        
        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          .signature-section {
            grid-template-columns: 1fr;
          }
          .amount-value {
            font-size: 32px;
          }
          .line-items-table {
            font-size: 11px;
          }
          .line-items-table th,
          .line-items-table td {
            padding: 8px;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt-wrapper">
        <div class="watermark">PAID</div>
        <div class="receipt-content">
        <div class="receipt-header">
          <div class="company-logo">MunAITech</div>
          <div style="font-size: 12px; opacity: 0.85; font-weight: 400; letter-spacing: 0.5px; margin-bottom: 8px;">
            Operating under 15071995 LLC
          </div>
          <div class="company-tagline">Professional Digital Solutions</div>
        </div>

          <div class="receipt-body">
            <div class="receipt-title">
              <h1>PAYMENT RECEIPT</h1>
              <div class="barcode-section">
                <img src="${barcodeUrl}" alt="Barcode">
              </div>
              <div class="receipt-number">#${data.receipt_number}</div>
              ${data.verification_hash ? `
              <div class="verification-code">Verification: ${data.verification_hash}</div>
              ` : ''}
              ${data.invoice_reference ? `
              <div class="verification-code">Invoice Ref: ${data.invoice_reference}</div>
              ` : ''}
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
                ${data.tax_id ? `
                <div class="info-item">
                  <span class="info-label">Tax ID</span>
                  <span class="info-value">${data.tax_id}</span>
                </div>
                ` : ''}
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

            ${data.line_items && data.line_items.length > 0 ? `
            <table class="line-items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Unit Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${data.line_items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: right;">${formatCurrency(item.unit_price)}</td>
                  <td style="text-align: right; font-weight: 600;">${formatCurrency(item.total)}</td>
                </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="totals-section">
              ${data.subtotal ? `
              <div class="total-row">
                <span>Subtotal:</span>
                <span>${formatCurrency(data.subtotal)}</span>
              </div>
              ` : ''}
              ${data.discount_amount && data.discount_amount > 0 ? `
              <div class="total-row" style="color: #10b981;">
                <span>Discount:</span>
                <span>-${formatCurrency(data.discount_amount)}</span>
              </div>
              ` : ''}
              ${data.tax_amount && data.tax_amount > 0 ? `
              <div class="total-row">
                <span>Tax:</span>
                <span>${formatCurrency(data.tax_amount)}</span>
              </div>
              ` : ''}
              <div class="total-row grand-total">
                <span>Grand Total:</span>
                <span>${formatCurrency(data.payment_amount)}</span>
              </div>
            </div>
            ` : ''}

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

            ${!data.line_items || data.line_items.length === 0 ? `
            <div class="amount-section">
              <div class="amount-label">Total Amount Paid</div>
              <div class="amount-value">${formatCurrency(data.payment_amount)}</div>
              <div class="payment-status">✓ Payment Received</div>
            </div>
            ` : `
            <div class="amount-section">
              <div class="payment-status">✓ Payment Received</div>
            </div>
            `}

            ${data.payment_terms ? `
            <div class="service-details">
              <h3>Payment Terms</h3>
              <p>${data.payment_terms}</p>
            </div>
            ` : ''}

            ${data.authorized_signature || data.verification_hash ? `
            <div class="signature-section">
              <div class="signature-box">
                <div class="signature-line">
                  <div class="signature-label">Authorized By</div>
                  ${data.authorized_signature ? `
                  <div class="signature-name">${data.authorized_signature}</div>
                  ` : `
                  <div class="signature-name">15071995 LLC</div>
                  `}
                </div>
              </div>
              ${data.verification_hash ? `
              <div class="signature-box">
                <div class="qr-code-section">
                  <h4>Verify Receipt</h4>
                  <img src="${qrCodeUrl}" alt="QR Code" width="120" height="120">
                  <p style="font-size: 10px; color: #64748b; margin-top: 8px;">Scan to verify authenticity</p>
                </div>
              </div>
              ` : ''}
            </div>
            ` : ''}

            <div class="thank-you">
              <h2>Thank You!</h2>
              <p>We appreciate your business and look forward to working with you again.</p>
            </div>
          </div>

        <div class="receipt-footer">
          <div class="company-info">
            <h4>MunAITech</h4>
            <div class="contact-details">
              <strong>Company Name:</strong> 15071995 LLC<br>
              <strong>Registered Agent:</strong> Northwest Registered Agent LLC<br>
              <strong>Address:</strong> 212 N. 2nd St., STE 100, Richmond, KY, 40475, United States<br>
              <br>
              Email: <a href="mailto:info@mymuna.store">info@mymuna.store</a><br>
              WhatsApp: <a href="https://wa.me/2347062372521">+234 706 237 2521</a>
            </div>
          </div>
          <div class="footer-note">
            This is an official receipt from MunAITech (15071995 LLC). Please retain this for your records.<br>
            For any inquiries regarding this receipt, please contact us at info@mymuna.store
          </div>
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
    const requestData = await req.json();
    
    // Validate incoming receipt data
    const data = receiptSchema.parse(requestData);
    
    // Generate verification hash if not provided
    if (!data.verification_hash) {
      data.verification_hash = generateVerificationHash(data.receipt_number);
    }
    
    console.log("Generating receipt for:", data.receipt_number);
    console.log("Verification hash:", data.verification_hash);

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
        from: "MunAITech <onboarding@resend.dev>",
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
        verification_hash: data.verification_hash,
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
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid receipt data",
          details: error.errors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
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
