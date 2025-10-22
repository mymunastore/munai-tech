-- Update ARET Environmental Services project with new featured image
UPDATE projects 
SET featured_image = '/projects/aret-environmental-new.png',
    updated_at = now()
WHERE slug = 'aret-uyo-landing-hub';