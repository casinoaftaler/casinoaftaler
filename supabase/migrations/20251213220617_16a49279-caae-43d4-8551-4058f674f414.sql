-- Add is_recommended column for featuring casinos
ALTER TABLE public.casinos ADD COLUMN is_recommended BOOLEAN NOT NULL DEFAULT false;