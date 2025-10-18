-- Create table for client testimonials submitted via the website
CREATE TABLE IF NOT EXISTS public.client_testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_company TEXT,
  client_title TEXT,
  project_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  testimonial_text TEXT NOT NULL,
  would_recommend BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.client_testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a testimonial
CREATE POLICY "Anyone can submit testimonials"
ON public.client_testimonials
FOR INSERT
WITH CHECK (true);

-- Admins can view all testimonials
CREATE POLICY "Admins can view all testimonials"
ON public.client_testimonials
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update testimonials (for approval)
CREATE POLICY "Admins can update testimonials"
ON public.client_testimonials
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create table for payment receipts
CREATE TABLE IF NOT EXISTS public.payment_receipts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  receipt_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_address TEXT,
  payment_amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT,
  project_description TEXT NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'refunded')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_receipts ENABLE ROW LEVEL SECURITY;

-- Admins can manage receipts
CREATE POLICY "Admins can manage receipts"
ON public.payment_receipts
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster lookups
CREATE INDEX idx_receipt_number ON public.payment_receipts(receipt_number);
CREATE INDEX idx_testimonials_status ON public.client_testimonials(status);