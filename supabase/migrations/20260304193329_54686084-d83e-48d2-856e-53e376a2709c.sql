-- Enable full replica identity so UPDATE events include full row
ALTER TABLE public.slot_chat_messages REPLICA IDENTITY FULL;