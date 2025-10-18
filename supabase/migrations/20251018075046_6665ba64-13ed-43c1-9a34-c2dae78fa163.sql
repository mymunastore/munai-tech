-- Add new fields to payment_receipts table for enhanced receipt features
ALTER TABLE payment_receipts
ADD COLUMN IF NOT EXISTS line_items jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS tax_id text,
ADD COLUMN IF NOT EXISTS invoice_reference text,
ADD COLUMN IF NOT EXISTS verification_hash text,
ADD COLUMN IF NOT EXISTS authorized_signature text,
ADD COLUMN IF NOT EXISTS payment_terms text DEFAULT 'Payment is non-refundable. For any disputes, please contact us within 30 days.',
ADD COLUMN IF NOT EXISTS subtotal numeric,
ADD COLUMN IF NOT EXISTS tax_amount numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS discount_amount numeric DEFAULT 0;

-- Create index on verification_hash for quick lookups
CREATE INDEX IF NOT EXISTS idx_payment_receipts_verification_hash ON payment_receipts(verification_hash);

-- Create index on receipt_number for quick lookups
CREATE INDEX IF NOT EXISTS idx_payment_receipts_receipt_number ON payment_receipts(receipt_number);

-- Add comment explaining line_items structure
COMMENT ON COLUMN payment_receipts.line_items IS 'JSON array of line items with structure: [{"description": "...", "quantity": 1, "unit_price": 100, "total": 100}]';