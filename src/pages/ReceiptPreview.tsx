import { SEO } from "@/components/SEO";

const ReceiptPreview = () => {
  return (
    <>
      <SEO 
        title="Receipt Preview"
        description="Sample receipt preview"
      />
      <div style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        lineHeight: 1.6,
        color: '#1e293b',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        minHeight: '100vh'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '40px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '-1px',
              marginBottom: '8px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>MunAiTech</div>
            <div style={{
              fontSize: '14px',
              opacity: 0.95,
              fontWeight: 300,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>Professional Digital Solutions</div>
          </div>

          <div style={{ padding: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{
                fontSize: '28px',
                color: '#667eea',
                fontWeight: 700,
                letterSpacing: '2px',
                marginBottom: '8px'
              }}>PAYMENT RECEIPT</h1>
              <div style={{
                fontSize: '14px',
                color: '#64748b',
                fontWeight: 500
              }}>#RCP-2025-001</div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{
                  color: '#667eea',
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #667eea'
                }}>Receipt Details</h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <span style={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>Date Issued</span>
                  <span style={{ color: '#1e293b', fontWeight: 500, fontSize: '13px' }}>January 14, 2025</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <span style={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>Payment Method</span>
                  <span style={{ color: '#1e293b', fontWeight: 500, fontSize: '13px' }}>BANK TRANSFER</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0'
                }}>
                  <span style={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>Status</span>
                  <span style={{ color: '#10b981', fontWeight: 700, fontSize: '13px' }}>PAID</span>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{
                  color: '#667eea',
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #667eea'
                }}>Customer Information</h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <span style={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>Name</span>
                  <span style={{ color: '#1e293b', fontWeight: 500, fontSize: '13px' }}>John Doe</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <span style={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>Email</span>
                  <span style={{ color: '#1e293b', fontWeight: 500, fontSize: '13px' }}>john@example.com</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0'
                }}>
                  <span style={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>Address</span>
                  <span style={{ color: '#1e293b', fontWeight: 500, fontSize: '13px' }}>Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '30px',
              borderLeft: '4px solid #667eea'
            }}>
              <h3 style={{
                color: '#667eea',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '12px'
              }}>Service Description</h3>
              <p style={{ color: '#475569', lineHeight: 1.8 }}>
                Full-stack web application development including frontend design, backend API development, 
                database architecture, and deployment. Complete project delivery with documentation and training.
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '32px',
              borderRadius: '12px',
              margin: '40px 0',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              <div style={{
                fontSize: '14px',
                opacity: 0.9,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 500
              }}>Total Amount Paid</div>
              <div style={{
                fontSize: '48px',
                fontWeight: 800,
                letterSpacing: '-1px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}>₦500,000.00</div>
              <div style={{
                display: 'inline-block',
                background: '#10b981',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: '16px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}>✓ Payment Received</div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '30px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '12px',
              margin: '30px 0'
            }}>
              <h2 style={{
                color: '#92400e',
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '8px'
              }}>Thank You!</h2>
              <p style={{ color: '#78350f', fontSize: '14px' }}>
                We appreciate your business and look forward to working with you again.
              </p>
            </div>
          </div>

          <div style={{
            background: '#f8fafc',
            padding: '32px',
            textAlign: 'center',
            borderTop: '2px solid #e2e8f0'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                color: '#1e293b',
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '12px'
              }}>MunAiTech</h4>
              <div style={{
                color: '#64748b',
                fontSize: '13px',
                lineHeight: 2
              }}>
                Email: <a href="mailto:info@mymuna.store" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>info@mymuna.store</a><br />
                WhatsApp: <a href="https://wa.me/2347062372521" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>+234 706 237 2521</a><br />
                Location: Lagos, Nigeria | Remote Services Available
              </div>
            </div>
            <div style={{
              color: '#94a3b8',
              fontSize: '11px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0'
            }}>
              This is an official receipt from MunAiTech. Please retain this for your records.<br />
              For any inquiries regarding this receipt, please contact us at info@mymuna.store
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptPreview;
