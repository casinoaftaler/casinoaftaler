/**
 * Gates of Fedesvin - Multiplier Symbol Mappings
 * 
 * Multiplier symbols are virtual grid citizens (not stored in slot_symbols table).
 * IDs are prefixed with "mult_" so both server and client can identify them.
 */

import mult2x from "@/assets/mult_2x.png";
import mult3x from "@/assets/mult_3x.png";
import mult5x from "@/assets/mult_5x.png";
import mult10x from "@/assets/mult_10x.png";
import mult15x from "@/assets/mult_15x.png";
import mult25x from "@/assets/mult_25x.png";
import mult50x from "@/assets/mult_50x.png";
import mult100x from "@/assets/mult_100x.png";

export const MULTIPLIER_SYMBOL_PREFIX = "mult_";

export interface MultiplierSymbolInfo {
  id: string;
  value: number;
  imageUrl: string;
  label: string;
}

export const MULTIPLIER_SYMBOLS: MultiplierSymbolInfo[] = [
  { id: "mult_2x",   value: 2,   imageUrl: mult2x,   label: "2x" },
  { id: "mult_3x",   value: 3,   imageUrl: mult3x,   label: "3x" },
  { id: "mult_5x",   value: 5,   imageUrl: mult5x,   label: "5x" },
  { id: "mult_10x",  value: 10,  imageUrl: mult10x,  label: "10x" },
  { id: "mult_15x",  value: 15,  imageUrl: mult15x,  label: "15x" },
  { id: "mult_25x",  value: 25,  imageUrl: mult25x,  label: "25x" },
  { id: "mult_50x",  value: 50,  imageUrl: mult50x,  label: "50x" },
  { id: "mult_100x", value: 100, imageUrl: mult100x, label: "100x" },
];

const symbolMap = new Map(MULTIPLIER_SYMBOLS.map(s => [s.id, s]));

/** Check if a grid cell ID is a multiplier symbol */
export function isMultiplierSymbol(id: string): boolean {
  return id.startsWith(MULTIPLIER_SYMBOL_PREFIX);
}

/** Get multiplier value from a multiplier symbol ID (e.g. "mult_5x" → 5) */
export function getMultiplierValue(id: string): number {
  return symbolMap.get(id)?.value ?? 0;
}

/** Get image URL for a multiplier symbol */
export function getMultiplierImageUrl(id: string): string | undefined {
  return symbolMap.get(id)?.imageUrl;
}

/** Get full info for a multiplier symbol */
export function getMultiplierSymbolInfo(id: string): MultiplierSymbolInfo | undefined {
  return symbolMap.get(id);
}
