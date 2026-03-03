import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAgeVerification() {
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkVerification = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setAgeVerified(null);
        setUserId(null);
        return;
      }
      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select("age_verified")
        .eq("user_id", user.id)
        .single();

      setAgeVerified(data?.age_verified ?? false);
    };

    checkVerification();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkVerification();
    });

    return () => subscription.unsubscribe();
  }, []);

  const markVerified = useCallback(() => {
    setAgeVerified(true);
  }, []);

  return { ageVerified, isLoggedIn: userId !== null, markVerified };
}
