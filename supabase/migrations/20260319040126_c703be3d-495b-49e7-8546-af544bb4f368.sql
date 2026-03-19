INSERT INTO public.projects (title, slug, description, category, tech_stack, tags, is_featured, display_order, status, year, case_study_content, client_name, project_duration)
VALUES 
(
  'Sovereign AI Data Centre Infrastructure',
  'sovereign-ai-data-centre-infrastructure',
  'Submitted a technical capability overview and prototype demonstration to Innovation, Science and Economic Development Canada (ISED) for enabling large-scale sovereign AI data centres. The submission featured an operational agentic AI document verification platform with structured decision governance, auditability, and human oversight — receiving official acknowledgment from the AI Infrastructure Team.',
  'AI & Government',
  ARRAY['AI/ML', 'Cloud Infrastructure', 'Data Sovereignty', 'Agentic AI', 'Document Verification'],
  ARRAY['government', 'ai-infrastructure', 'sovereign-ai', 'canada', 'ised'],
  true,
  1,
  'published',
  2026,
  '## Overview

Responded to ISED''s call for proposals to enable large-scale sovereign AI data centres in Canada.

## Technical Submission

Developed and demonstrated a functional agentic AI document verification platform designed for regulated institutional environments requiring auditability, decision governance, human oversight, and institutional reliability.

## Architecture

The platform achieves 100% processing accuracy, 1.2-second average AI processing speed, and includes administrative controls for export, workflow sync, security scans, and reporting.

## Outcome

Received official acknowledgment from the AI Infrastructure Team at ISED, confirming the submission was accepted for review.',
  'Innovation, Science and Economic Development Canada (ISED)',
  '3 months'
),
(
  'LEO SATCOM Defence Challenge — ISC Phase 2',
  'leo-satcom-defence-challenge-isc',
  'Engaged with Innovative Solutions Canada (ISC) on a Department of National Defence challenge to advance Low Earth Orbit satellite communications in contested environments. Phase 2 prototype development with up to $2M funding for adaptive beamforming solutions at TRL 5-9.',
  'Defence & Innovation',
  ARRAY['Satellite Communications', 'LEO Networks', 'Adaptive Beamforming', 'Defence Tech', 'Signal Processing'],
  ARRAY['government', 'defence', 'satcom', 'isc', 'dnd', 'innovation'],
  true,
  2,
  'published',
  2026,
  '## Overview

ISC funding challenge sponsored by the Department of National Defence focused on advancing LEO SATCOM capabilities in contested environments.

## Challenge Scope

Sponsor: DND. Funding: Up to $2M CAD. Phase 2 Prototype Development at TRL 5-9. Focus on adaptive beamforming to counter interference.

## Significance

Positions capability at the intersection of defence technology, satellite communications, and AI-driven signal processing.',
  'Department of National Defence (DND)',
  'Ongoing'
);