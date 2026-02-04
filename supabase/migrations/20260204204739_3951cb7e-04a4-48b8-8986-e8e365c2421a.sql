-- Add visitor_id and user_id columns to page_views for true unique visitor tracking
ALTER TABLE public.page_views 
ADD COLUMN visitor_id text,
ADD COLUMN user_id uuid;

-- Create index for faster unique visitor queries
CREATE INDEX idx_page_views_visitor_id ON public.page_views(visitor_id);
CREATE INDEX idx_page_views_user_id ON public.page_views(user_id);

-- Add comment explaining the columns
COMMENT ON COLUMN public.page_views.visitor_id IS 'Anonymous UUID stored in localStorage for tracking unique visitors';
COMMENT ON COLUMN public.page_views.user_id IS 'Authenticated user ID if logged in, null for anonymous visitors';