ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS pixel_progress JSONB;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS pixel_progress_revision INTEGER NOT NULL DEFAULT 0;
