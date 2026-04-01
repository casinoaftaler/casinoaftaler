
ALTER TABLE public.support_messages DROP CONSTRAINT IF EXISTS support_messages_sender_role_check;
ALTER TABLE public.support_messages ADD CONSTRAINT support_messages_sender_role_check CHECK (sender_role IN ('user', 'admin', 'system'));
