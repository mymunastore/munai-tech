-- Update blog posts with AI-generated featured images based on categories
UPDATE blog_posts SET featured_image = '/src/assets/blog/ai-insights.jpg' WHERE category = 'ai';
UPDATE blog_posts SET featured_image = '/src/assets/blog/development.jpg' WHERE category = 'development';
UPDATE blog_posts SET featured_image = '/src/assets/blog/design.jpg' WHERE category = 'design';
UPDATE blog_posts SET featured_image = '/src/assets/blog/insights.jpg' WHERE category = 'insights';