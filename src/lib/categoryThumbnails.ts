/**
 * Category → CSS gradient + Lucide icon name mapping
 * Used for visual article card thumbnails on author profile pages.
 * Pure CSS – zero network requests.
 */

export interface CategoryVisual {
  gradient: string;
  iconName: "book-open" | "gamepad-2" | "star" | "file-text" | "users" | "wrench" | "shield-check" | "newspaper" | "credit-card" | "scale" | "pen";
}

const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  Guide: {
    gradient: "linear-gradient(135deg, hsl(250 60% 46%), hsl(280 60% 55%))",
    iconName: "book-open",
  },
  "Slot Guide": {
    gradient: "linear-gradient(135deg, hsl(160 50% 38%), hsl(180 55% 44%))",
    iconName: "gamepad-2",
  },
  Anmeldelse: {
    gradient: "linear-gradient(135deg, hsl(30 80% 50%), hsl(45 85% 55%))",
    iconName: "star",
  },
  Ordbog: {
    gradient: "linear-gradient(135deg, hsl(230 55% 50%), hsl(250 50% 58%))",
    iconName: "file-text",
  },
  Community: {
    gradient: "linear-gradient(135deg, hsl(330 60% 50%), hsl(350 65% 58%))",
    iconName: "users",
  },
  Værktøj: {
    gradient: "linear-gradient(135deg, hsl(200 60% 42%), hsl(220 55% 52%))",
    iconName: "wrench",
  },
  Compliance: {
    gradient: "linear-gradient(135deg, hsl(140 45% 40%), hsl(160 50% 48%))",
    iconName: "shield-check",
  },
  Nyhed: {
    gradient: "linear-gradient(135deg, hsl(210 55% 45%), hsl(230 50% 55%))",
    iconName: "newspaper",
  },
  Betalingsmetode: {
    gradient: "linear-gradient(135deg, hsl(270 50% 48%), hsl(290 55% 56%))",
    iconName: "credit-card",
  },
  Juridisk: {
    gradient: "linear-gradient(135deg, hsl(20 60% 45%), hsl(35 65% 52%))",
    iconName: "scale",
  },
};

const DEFAULT_VISUAL: CategoryVisual = {
  gradient: "linear-gradient(135deg, hsl(250 50% 45%), hsl(270 55% 55%))",
  iconName: "pen",
};

export function getCategoryVisual(category: string): CategoryVisual {
  return CATEGORY_VISUALS[category] ?? DEFAULT_VISUAL;
}
