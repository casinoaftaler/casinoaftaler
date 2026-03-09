import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fetch all rows from slot_catalog, bypassing the 1000-row default limit
async function fetchAllFromSlotCatalog<T = any>(selectQuery: string, orderBy?: string): Promise<T[]> {
  let allData: T[] = [];
  let from = 0;
  const batchSize = 1000;
  while (true) {
    let query = supabase.from('slot_catalog').select(selectQuery).range(from, from + batchSize - 1);
    if (orderBy) query = query.order(orderBy);
    const { data, error } = await query;
    if (error) throw error;
    allData = allData.concat((data || []) as T[]);
    if (!data || data.length < batchSize) break;
    from += batchSize;
  }
  return allData;
}

export interface SlotCatalogEntry {
  id: string;
  slot_name: string;
  provider: string;
  rtp: number | null;
  volatility: string | null;
  max_potential: string | null;
  highest_win: number;
  highest_x: number;
  bonus_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProviderOverride {
  id: string;
  slot_name: string;
  provider_override: string;
  created_at: string;
}

// Fetch all provider overrides (cached)
export function useProviderOverrides() {
  return useQuery({
    queryKey: ['provider-overrides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bonus_hunt_provider_overrides')
        .select('*');
      if (error) throw error;
      return (data || []) as ProviderOverride[];
    },
    staleTime: 300000, // 5 min
  });
}

// Fetch slot_catalog data for bonus hunt display (lightweight)
export function useSlotCatalogMap() {
  return useQuery({
    queryKey: ['slot-catalog-map'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slot_catalog')
        .select('slot_name, provider');
      if (error) throw error;
      const providerMap = new Map<string, string>();
      const nameMap = new Map<string, string>();
      data?.forEach(row => {
        const key = row.slot_name.toLowerCase();
        if (row.provider && row.provider !== 'Custom Slot') {
          providerMap.set(key, row.provider);
        }
        // Always store the canonical name from catalog
        nameMap.set(key, row.slot_name);
      });
      return { providerMap, nameMap };
    },
    staleTime: 300000,
  });
}

// Fetch a single slot from the catalog by name
export function useSlotCatalogEntry(slotName: string | null) {
  return useQuery({
    queryKey: ['slot-catalog', slotName],
    queryFn: async () => {
      if (!slotName) return null;
      const { data, error } = await supabase
        .from('slot_catalog')
        .select('*')
        .eq('slot_name', slotName)
        .maybeSingle();
      if (error) throw error;
      return data as SlotCatalogEntry | null;
    },
    enabled: !!slotName,
    staleTime: 300000,
  });
}

// Fetch bonus hunt archives
export function useBonusHuntArchives() {
  return useQuery({
    queryKey: ['bonus-hunt-archives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bonus_hunt_archives')
        .select('*')
        .order('hunt_number', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    staleTime: 300000,
  });
}

// Fetch all slot catalog entries (for admin)
export function useSlotCatalog() {
  return useQuery({
    queryKey: ['slot-catalog-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slot_catalog')
        .select('*')
        .order('slot_name');
      if (error) throw error;
      return (data || []) as SlotCatalogEntry[];
    },
  });
}

// CRUD mutations for slot catalog
export function useCreateSlotCatalogEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Omit<SlotCatalogEntry, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('slot_catalog')
        .insert(entry)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['slot-catalog'] });
      qc.invalidateQueries({ queryKey: ['slot-catalog-all'] });
    },
  });
}

export function useUpdateSlotCatalogEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...entry }: Partial<SlotCatalogEntry> & { id: string }) => {
      const { data, error } = await supabase
        .from('slot_catalog')
        .update(entry)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['slot-catalog'] });
      qc.invalidateQueries({ queryKey: ['slot-catalog-all'] });
    },
  });
}

export function useDeleteSlotCatalogEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('slot_catalog')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['slot-catalog'] });
      qc.invalidateQueries({ queryKey: ['slot-catalog-all'] });
    },
  });
}

// CRUD for provider overrides
export function useCreateProviderOverride() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: { slot_name: string; provider_override: string }) => {
      const { data, error } = await supabase
        .from('bonus_hunt_provider_overrides')
        .insert(entry)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['provider-overrides'] }),
  });
}

export function useDeleteProviderOverride() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bonus_hunt_provider_overrides')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['provider-overrides'] }),
  });
}
