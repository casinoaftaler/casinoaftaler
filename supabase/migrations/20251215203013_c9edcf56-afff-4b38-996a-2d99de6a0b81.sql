-- Add free_spins column to casinos table
ALTER TABLE public.casinos ADD COLUMN free_spins text DEFAULT 'N/A';