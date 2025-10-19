-- Phase 6: Add database indexes for optimized project queries

-- Index for category filtering (most common query pattern)
CREATE INDEX IF NOT EXISTS idx_projects_category_status 
ON projects(category, status, display_order);

-- Index for featured projects
CREATE INDEX IF NOT EXISTS idx_projects_featured 
ON projects(is_featured, display_order) 
WHERE status = 'published';

-- Index for slug lookups (individual project pages)
CREATE INDEX IF NOT EXISTS idx_projects_slug 
ON projects(slug) 
WHERE status = 'published';

-- Index for related projects query
CREATE INDEX IF NOT EXISTS idx_projects_related 
ON projects(category, status, id);

COMMENT ON INDEX idx_projects_category_status IS 'Optimizes projects filtering by category and status';
COMMENT ON INDEX idx_projects_featured IS 'Optimizes featured projects queries';
COMMENT ON INDEX idx_projects_slug IS 'Optimizes individual project lookups by slug';
COMMENT ON INDEX idx_projects_related IS 'Optimizes related projects queries';