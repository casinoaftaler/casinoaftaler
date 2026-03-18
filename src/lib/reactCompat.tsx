import type { ComponentType, ReactNode } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { Helmet as ReactHelmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";

export const SafeHelmet = ReactHelmet as unknown as ComponentType<{ children?: ReactNode }>;

export const createSortableArgs = (id: UniqueIdentifier) => ({
  id,
  resizeObserverConfig: {},
} as any);

type AuthCompatClient = {
  getSession?: () => Promise<{ data: { session: any } }>;
  getUser?: () => Promise<{ data: { user: any } }>;
};

const authCompat = supabase.auth as unknown as AuthCompatClient;

export const getCurrentSession = async () => {
  if (authCompat.getSession) {
    return authCompat.getSession();
  }

  return { data: { session: null } };
};

export const getCurrentUser = async () => {
  if (authCompat.getUser) {
    return authCompat.getUser();
  }

  return { data: { user: null } };
};
