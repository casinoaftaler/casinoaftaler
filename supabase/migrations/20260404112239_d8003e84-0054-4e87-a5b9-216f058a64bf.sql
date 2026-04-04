
CREATE OR REPLACE FUNCTION public.ensure_active_raffle()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_active RECORD;
  v_settled jsonb;
  v_new_id uuid;
BEGIN
  FOR v_active IN
    SELECT id FROM raffles WHERE status = 'active' AND ends_at <= now()
  LOOP
    v_settled := settle_raffle(v_active.id);
  END LOOP;

  SELECT id INTO v_active FROM raffles WHERE status = 'active' AND ends_at > now() LIMIT 1;

  IF v_active.id IS NOT NULL THEN
    RETURN jsonb_build_object('active_raffle', v_active.id, 'created', false);
  END IF;

  INSERT INTO raffles (prize_credits, starts_at, ends_at, status)
  VALUES (500, now(), now() + interval '1 hour', 'active')
  RETURNING id INTO v_new_id;

  RETURN jsonb_build_object('active_raffle', v_new_id, 'created', true);
END;
$function$;
