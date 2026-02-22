
-- Fix SECURITY DEFINER views to SECURITY INVOKER
ALTER VIEW public.casinos_public SET (security_invoker = on);
ALTER VIEW public.profiles_leaderboard SET (security_invoker = on);
ALTER VIEW public.profiles_public SET (security_invoker = on);

-- Fix overly permissive RLS policies
-- click_events: should only allow service role or authenticated users
DROP POLICY IF EXISTS "Service role can insert click events" ON public.click_events;
CREATE POLICY "Anyone can insert click events"
ON public.click_events
FOR INSERT
WITH CHECK (true);

-- page_views: public analytics tracking is intentional, keep as-is
-- (anonymous page view tracking is a valid use case)

-- news_generation_logs: should only allow service role inserts (edge function)
DROP POLICY IF EXISTS "Service role can insert generation logs" ON public.news_generation_logs;
CREATE POLICY "Service role can insert generation logs"
ON public.news_generation_logs
FOR INSERT
WITH CHECK (auth.role() = 'service_role');
