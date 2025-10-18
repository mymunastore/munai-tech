-- Add AI analysis fields to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS ai_priority TEXT DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS ai_category TEXT,
ADD COLUMN IF NOT EXISTS ai_sentiment TEXT DEFAULT 'neutral',
ADD COLUMN IF NOT EXISTS ai_insights JSONB;

-- Create index for faster queries on priority
CREATE INDEX IF NOT EXISTS idx_contact_submissions_ai_priority 
ON contact_submissions(ai_priority);

-- Add comment explaining the AI fields
COMMENT ON COLUMN contact_submissions.ai_priority IS 'AI-determined priority level: high, medium, or low';
COMMENT ON COLUMN contact_submissions.ai_category IS 'AI-categorized inquiry type';
COMMENT ON COLUMN contact_submissions.ai_sentiment IS 'AI-detected sentiment: positive, neutral, or urgent';
COMMENT ON COLUMN contact_submissions.ai_insights IS 'Additional AI-generated insights about the inquiry';