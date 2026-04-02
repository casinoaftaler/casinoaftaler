import { useSyncExternalStore } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  rolesLoading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
}

const listeners = new Set<() => void>();

let authState: AuthState = {
  user: null,
  session: null,
  loading: true,
  rolesLoading: false,
  isAdmin: false,
  isModerator: false,
};

let authInitialized = false;
let latestRoleRequestId = 0;

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const setAuthState = (updater: AuthState | Partial<AuthState> | ((prev: AuthState) => AuthState)) => {
  const nextState = typeof updater === "function"
    ? (updater as (prev: AuthState) => AuthState)(authState)
    : { ...authState, ...updater };

  if (
    authState.user === nextState.user &&
    authState.session === nextState.session &&
    authState.loading === nextState.loading &&
    authState.rolesLoading === nextState.rolesLoading &&
    authState.isAdmin === nextState.isAdmin &&
    authState.isModerator === nextState.isModerator
  ) {
    return;
  }

  authState = nextState;
  emitChange();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  initializeAuth();

  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => authState;

const stabilizeUser = (prevUser: User | null, nextUser: User | null) => {
  if (prevUser?.id && nextUser?.id && prevUser.id === nextUser.id) {
    return prevUser;
  }

  return nextUser;
};

const stabilizeSession = (
  prevSession: Session | null,
  nextSession: Session | null,
  event?: string
) => {
  if (!prevSession || !nextSession) {
    return nextSession;
  }

  if (
    event === "TOKEN_REFRESHED" &&
    prevSession.user.id === nextSession.user.id
  ) {
    return prevSession;
  }

  if (
    prevSession.user.id === nextSession.user.id &&
    prevSession.access_token === nextSession.access_token &&
    prevSession.expires_at === nextSession.expires_at
  ) {
    return prevSession;
  }

  return nextSession;
};

const clearRoleState = () => {
  latestRoleRequestId += 1;
  setAuthState({
    isAdmin: false,
    isModerator: false,
    rolesLoading: false,
  });
};

const checkRoles = async (
  userId: string,
  options: { background?: boolean } = {}
) => {
  const requestId = ++latestRoleRequestId;

  if (!options.background) {
    setAuthState({ rolesLoading: true });
  }

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (requestId !== latestRoleRequestId || authState.user?.id !== userId) {
    return;
  }

  const nextRoleState = !error && data
    ? {
        isAdmin: data.some((roleEntry: any) => roleEntry.role === "admin"),
        isModerator: data.some((roleEntry: any) => roleEntry.role === "moderator"),
      }
    : {
        isAdmin: false,
        isModerator: false,
      };

  setAuthState({
    ...nextRoleState,
    ...(options.background ? null : { rolesLoading: false }),
  });
};

const initializeAuth = () => {
  if (authInitialized) return;
  authInitialized = true;

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "INITIAL_SESSION") {
      return;
    }

    const nextUser = session?.user ?? null;
    const previousUserId = authState.user?.id ?? null;
    const nextUserId = nextUser?.id ?? null;
    const userChanged = previousUserId !== nextUserId;

    if (!nextUser) {
      setAuthState({
        user: null,
        session: null,
        loading: false,
      });
      clearRoleState();
      return;
    }

    if (event !== "TOKEN_REFRESHED" || userChanged || !authState.session) {
      setAuthState((prev) => ({
        ...prev,
        user: stabilizeUser(prev.user, nextUser),
        session: stabilizeSession(prev.session, session, event),
        loading: false,
      }));
    }

    if (userChanged) {
      void checkRoles(nextUser.id);
    }
  });

  supabase.auth.getSession().then(async ({ data: { session } }) => {
    const nextUser = session?.user ?? null;

    setAuthState((prev) => ({
      ...prev,
      user: stabilizeUser(prev.user, nextUser),
      session: stabilizeSession(prev.session, session ?? null),
      loading: false,
      ...(nextUser ? null : {
        isAdmin: false,
        isModerator: false,
        rolesLoading: false,
      }),
    }));

    if (nextUser) {
      await checkRoles(nextUser.id);
    }
  }).catch(() => {
    setAuthState({
      user: null,
      session: null,
      loading: false,
      rolesLoading: false,
      isAdmin: false,
      isModerator: false,
    });
  });
};

export function useAuth() {
  const { user, session, loading, rolesLoading, isAdmin, isModerator } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  );

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
    setAuthState({
      user: null,
      session: null,
      rolesLoading: false,
      isAdmin: false,
      isModerator: false,
    });
    latestRoleRequestId += 1;
    
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading: loading || rolesLoading,
    isAdmin,
    isModerator,
    signIn,
    signUp,
    signOut,
  };
}
