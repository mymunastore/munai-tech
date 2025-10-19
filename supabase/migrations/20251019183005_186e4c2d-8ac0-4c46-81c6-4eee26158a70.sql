-- Enable realtime for client_testimonials table
ALTER TABLE client_testimonials REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE client_testimonials;