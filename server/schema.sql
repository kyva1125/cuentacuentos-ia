CREATE TABLE parents (
  id UUID PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(320) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  credits INTEGER NOT NULL DEFAULT 0 CHECK (credits >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE child_profiles (
  id UUID PRIMARY KEY,
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  nickname VARCHAR(40) NOT NULL,
  avatar VARCHAR(40),
  age SMALLINT NOT NULL CHECK (age BETWEEN 3 AND 12),
  traits JSONB NOT NULL DEFAULT '{"bravery": 0, "ingenuity": 0, "friendship": 0}'::jsonb,
  completed_stories INTEGER NOT NULL DEFAULT 0 CHECK (completed_stories >= 0),
  completed_story_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  unlocked_story_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  inventory JSONB NOT NULL DEFAULT '[]'::jsonb,
  pixel_progress JSONB,
  pixel_progress_revision INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Safe to run on databases created before child progress was persisted.
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS traits JSONB NOT NULL DEFAULT '{"bravery": 0, "ingenuity": 0, "friendship": 0}'::jsonb;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS completed_stories INTEGER NOT NULL DEFAULT 0 CHECK (completed_stories >= 0);
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS completed_story_ids JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS unlocked_story_ids JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS inventory JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS pixel_progress JSONB;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS pixel_progress_revision INTEGER NOT NULL DEFAULT 0;

CREATE TABLE stories (
  id UUID PRIMARY KEY,
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  child_profile_id UUID REFERENCES child_profiles(id) ON DELETE SET NULL,
  title VARCHAR(160) NOT NULL,
  content JSONB NOT NULL,
  current_step SMALLINT NOT NULL DEFAULT 1 CHECK (current_step BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE credit_ledger (
  id UUID PRIMARY KEY,
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  delta INTEGER NOT NULL,
  reason VARCHAR(40) NOT NULL,
  story_id UUID REFERENCES stories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX stories_parent_id_updated_at_idx ON stories(parent_id, updated_at DESC);
CREATE INDEX credit_ledger_parent_id_created_at_idx ON credit_ledger(parent_id, created_at DESC);
