import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCasinoOwner, setIsCasinoOwner] = useState(false);
  const [ownedCasinoIds, setOwnedCasinoIds] = useState<string[]>([]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check roles after auth state change
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
            checkCasinoOwnerRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsCasinoOwner(false);
          setOwnedCasinoIds([]);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
        checkCasinoOwnerRole(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!error && data) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const checkCasinoOwnerRole = async (userId: string) => {
    // Check if user has casino_owner role (using type assertion since types may not be regenerated yet)
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "casino_owner" as any)
      .maybeSingle();

    if (roleData) {
      setIsCasinoOwner(true);
      
      // Fetch owned casino IDs
      const { data: ownershipData } = await supabase
        .from("casino_owners" as any)
        .select("casino_id")
        .eq("user_id", userId);
      
      if (ownershipData) {
        setOwnedCasinoIds((ownershipData as any[]).map(o => o.casino_id));
      }
    } else {
      setIsCasinoOwner(false);
      setOwnedCasinoIds([]);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    isAdmin,
    isCasinoOwner,
    ownedCasinoIds,
    signIn,
    signUp,
    signOut,
  };
}
