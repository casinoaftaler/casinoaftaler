import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useBanCheck() {
  const { user } = useAuth();
  const [isBanned, setIsBanned] = useState(false);
  const [banLoading, setBanLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsBanned(false);
      setBanLoading(false);
      return;
    }

    const checkBan = async () => {
      const { data } = await supabase
        .from("user_bans")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      setIsBanned(!!data);
      setBanLoading(false);
    };

    checkBan();
  }, [user]);

  return { isBanned, banLoading };
}
