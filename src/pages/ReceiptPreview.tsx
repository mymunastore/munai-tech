import { SEO } from "@/components/SEO";

const ReceiptPreview = () => {
  // Sample data with all new features
  const sampleData = {
    receiptNumber: "MUN-2025-001",
    verificationHash: "A1B2C3D4E5F6G7H8",
    invoiceReference: "INV-2024-12-156",
    taxId: "LLC-15071995-KY",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerAddress: "Lagos, Nigeria",
    paymentMethod: "BANK TRANSFER",
    paymentDate: "January 14, 2025",
    authorizedSignature: "Kingsley Adigwe",
    lineItems: [
      { description: "Full-Stack Web Application Development", quantity: 1, unitPrice: 350000, total: 350000 },
      { description: "UI/UX Design & Prototyping", quantity: 1, unitPrice: 100000, total: 100000 },
      { description: "API Integration & Testing", quantity: 1, unitPrice: 75000, total: 75000 },
    ],
    subtotal: 525000,
    discount: 25000,
    taxAmount: 0,
    grandTotal: 500000,
    projectDescription: "Full-stack web application development including frontend design, backend API development, database architecture, and deployment. Complete project delivery with documentation and training.",
    paymentTerms: "Payment is non-refundable. For any disputes, please contact us within 30 days. Warranty period: 90 days from delivery date.",
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${encodeURIComponent(`https://mymuna.store/verify-receipt/${sampleData.verificationHash}`)}`;
  const barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(sampleData.receiptNumber)}&code=Code128&translate-esc=on&dpi=96`;

  return (
    <>
      <SEO 
        title="Receipt Preview - Enhanced Design"
        description="Professional receipt preview with all features"
      />
      <div style={{ 
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        lineHeight: 1.6,
        color: '#1e293b',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        minHeight: '100vh'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Watermark */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            fontSize: '120px',
            fontWeight: 900,
            color: 'rgba(102, 126, 234, 0.03)',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none'
          }}>PAID</div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '40px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: 0,
                right: 0,
                height: '20px',
                background: 'white',
                borderRadius: '50% 50% 0 0 / 100% 100% 0 0'
              }}></div>
              <div style={{
                fontSize: '38px',
                fontWeight: 800,
                letterSpacing: '-1px',
                marginBottom: '4px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}>MunAITech</div>
              <div style={{
                fontSize: '12px',
                opacity: 0.85,
                fontWeight: 400,
                letterSpacing: '0.5px',
                marginBottom: '8px'
              }}>Operating under 15071995 LLC</div>
              <div style={{
                fontSize: '14px',
                opacity: 0.95,
                fontWeight: 300,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>Professional Digital Solutions</div>
            </div>

            {/* Body */}
            <div style={{ padding: '40px' }}>
              {/* Title and Barcode */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{
                  fontSize: '28px',
                  color: '#667eea',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  marginBottom: '12px'
                }}>PAYMENT RECEIPT</h1>
                <div style={{ margin: '12px 0' }}>
                  <img src={barcodeUrl} alt="Barcode" style={{ height: '60px' }} />
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: 500
                }}>#{sampleData.receiptNumber}</div>
                <div style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  marginTop: '4px',
                  fontFamily: 'monospace'
                }}>Verification: {sampleData.verificationHash}</div>
                <div style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  fontFamily: 'monospace'
                }}>Invoice Ref: {sampleData.invoiceReference}</div>
              </div>

              {/* Info Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                marginBottom: '30px'
              }}>
                {/* Receipt Details */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{
                    color: '#667eea',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '14px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #667eea'
                  }}>Receipt Details</h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Date Issued</span>
                    <span style={{ color: '#1e293b', fontWeight: 500 }}>{sampleData.paymentDate}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Payment Method</span>
                    <span style={{ color: '#1e293b', fontWeight: 500 }}>{sampleData.paymentMethod}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Status</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>PAID</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Tax ID</span>
                    <span style={{ color: '#1e293b', fontWeight: 500 }}>{sampleData.taxId}</span>
                  </div>
                </div>

                {/* Customer Info */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{
                    color: '#667eea',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '14px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #667eea'
                  }}>Customer Information</h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Name</span>
                    <span style={{ color: '#1e293b', fontWeight: 500 }}>{sampleData.customerName}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Email</span>
                    <span style={{ color: '#1e293b', fontWeight: 500 }}>{sampleData.customerEmail}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Address</span>
                    <span style={{ color: '#1e293b', fontWeight: 500 }}>{sampleData.customerAddress}</span>
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <table style={{
                width: '100%',
                margin: '30px 0',
                borderCollapse: 'collapse',
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0'
              }}>
                <thead style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  <tr>
                    <th style={{
                      padding: '14px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Description</th>
                    <th style={{
                      padding: '14px',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>Qty</th>
                    <th style={{
                      padding: '14px',
                      textAlign: 'right',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>Unit Price</th>
                    <th style={{
                      padding: '14px',
                      textAlign: 'right',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.lineItems.map((item, index) => (
                    <tr key={index} style={{
                      borderBottom: index < sampleData.lineItems.length - 1 ? '1px solid #f1f5f9' : 'none'
                    }}>
                      <td style={{ padding: '12px 14px', fontSize: '13px', color: '#475569' }}>{item.description}</td>
                      <td style={{ padding: '12px 14px', fontSize: '13px', color: '#475569', textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ padding: '12px 14px', fontSize: '13px', color: '#475569', textAlign: 'right' }}>{formatCurrency(item.unitPrice)}</td>
                      <td style={{ padding: '12px 14px', fontSize: '13px', color: '#475569', textAlign: 'right', fontWeight: 600 }}>{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Section */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: '20px',
                borderRadius: '12px',
                margin: '20px 0',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '14px'
                }}>
                  <span>Subtotal:</span>
                  <span>{formatCurrency(sampleData.subtotal)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '14px',
                  color: '#10b981'
                }}>
                  <span>Discount:</span>
                  <span>-{formatCurrency(sampleData.discount)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '14px'
                }}>
                  <span>Tax:</span>
                  <span>{formatCurrency(sampleData.taxAmount)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '2px solid #667eea',
                  marginTop: '10px',
                  paddingTop: '12px',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#667eea'
                }}>
                  <span>Grand Total:</span>
                  <span>{formatCurrency(sampleData.grandTotal)}</span>
                </div>
              </div>

              {/* Service Description */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px',
                borderLeft: '4px solid #667eea'
              }}>
                <h3 style={{
                  color: '#667eea',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '10px'
                }}>Service Description</h3>
                <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '13px' }}>
                  {sampleData.projectDescription}
                </p>
              </div>

              {/* Payment Status Badge */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '28px',
                borderRadius: '12px',
                margin: '30px 0',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: '#10b981',
                  color: 'white',
                  padding: '8px 18px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>✓ Payment Received</div>
              </div>

              {/* Payment Terms */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px',
                borderLeft: '4px solid #667eea'
              }}>
                <h3 style={{
                  color: '#667eea',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '10px'
                }}>Payment Terms</h3>
                <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '13px' }}>
                  {sampleData.paymentTerms}
                </p>
              </div>

              {/* Signature and QR Code Section */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '30px',
                margin: '30px 0',
                padding: '24px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '12px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    borderTop: '2px solid #cbd5e1',
                    margin: '50px 20px 10px',
                    paddingTop: '8px'
                  }}>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                      Authorized By
                    </div>
                    <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: 700, marginTop: '4px' }}>
                      {sampleData.authorizedSignature}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    padding: '20px',
                    background: '#f8fafc',
                    borderRadius: '12px'
                  }}>
                    <h4 style={{
                      fontSize: '12px',
                      color: '#667eea',
                      fontWeight: 700,
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>Verify Receipt</h4>
                    <img src={qrCodeUrl} alt="QR Code" width="120" height="120" style={{
                      border: '4px solid white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }} />
                    <p style={{ fontSize: '10px', color: '#64748b', marginTop: '8px' }}>
                      Scan to verify authenticity
                    </p>
                  </div>
                </div>
              </div>

              {/* Thank You */}
              <div style={{
                textAlign: 'center',
                padding: '26px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '12px',
                margin: '24px 0'
              }}>
                <h2 style={{
                  color: '#92400e',
                  fontSize: '22px',
                  fontWeight: 700,
                  marginBottom: '6px'
                }}>Thank You!</h2>
                <p style={{ color: '#78350f', fontSize: '13px' }}>
                  We appreciate your business and look forward to working with you again.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              background: '#f8fafc',
              padding: '28px',
              textAlign: 'center',
              borderTop: '2px solid #e2e8f0'
            }}>
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{
                  color: '#1e293b',
                  fontSize: '15px',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}>MunAITech</h4>
                <div style={{
                  color: '#64748b',
                  fontSize: '12px',
                  lineHeight: 1.8
                }}>
                  <strong>Company Name:</strong> 15071995 LLC<br />
                  <strong>Registered Agent:</strong> Northwest Registered Agent LLC<br />
                  <strong>Address:</strong> 212 N. 2nd St., STE 100, Richmond, KY, 40475, United States<br />
                  <br />
                  Email: <a href="mailto:info@mymuna.store" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>info@mymuna.store</a><br />
                  WhatsApp: <a href="https://wa.me/2347062372521" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>+234 706 237 2521</a>
                </div>
              </div>
              <div style={{
                color: '#94a3b8',
                fontSize: '10px',
                marginTop: '18px',
                paddingTop: '18px',
                borderTop: '1px solid #e2e8f0'
              }}>
                This is an official receipt from MunAITech (15071995 LLC). Please retain this for your records.<br />
                For any inquiries regarding this receipt, please contact us at info@mymuna.store
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptPreview;
