
-- Replace whitelist with open public read - site_settings only contains
-- admin-managed display/config values, no user-specific or sensitive data.
DROP POLICY "Public can read whitelisted display settings" ON public.site_settings;

CREATE POLICY "Public can read all site settings"
ON public.site_settings
FOR SELECT
USING (true);
