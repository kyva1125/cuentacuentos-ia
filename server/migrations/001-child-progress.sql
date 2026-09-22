ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS traits JSONB NOT NULL DEFAULT '{"bravery": 0, "ingenuity": 0, "friendship": 0}'::jsonb;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS completed_stories INTEGER NOT NULL DEFAULT 0 CHECK (completed_stories >= 0);
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS completed_story_ids JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS unlocked_story_ids JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS inventory JSONB NOT NULL DEFAULT '[]'::jsonb;
