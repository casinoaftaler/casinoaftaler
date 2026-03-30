/**
 * Maps Lucide icon names (kebab-case) used in navData.ts
 * to the corresponding menu icon WebP images.
 * 
 * When a menu item has an iconName that exists in this map,
 * the image is shown instead of the Lucide icon.
 */

const menuIcons = import.meta.glob<{ default: string }>(
  "/src/assets/nav-icons/menu/*.webp",
  { eager: true }
);

function img(filename: string): string {
  const path = `/src/assets/nav-icons/menu/${filename}`;
  return menuIcons[path]?.default || "";
}

/** iconName → WebP image URL */
export const MENU_ICON_MAP: Record<string, string> = {
  // Casino
  "trophy": img("trophy-casino.webp"),
  "zap": img("lightning-fast.webp"),
  "trending-up": img("trending-rtp.webp"),
  "shield-check": img("shield-license.webp"),
  "user-x": img("no-account.webp"),
  "smartphone": img("mobile-casino.webp"),
  "tablet-smartphone": img("tablet-mobile.webp"),
  "bitcoin": img("crypto-bitcoin.webp"),
  "glasses": img("vr-headset.webp"),
  "gamepad-2": img("gamepad-fun.webp"),
  "receipt": img("tax-receipt.webp"),

  // Nye Casinoer
  "calendar": img("calendar-check.webp"),
  "shield": img("shield-license.webp"),
  "shield-off": img("shield-off.webp"),
  "gift": img("gift-bonus.webp"),
  "banknote": img("banknote-money.webp"),
  "scan-line": img("scan-id.webp"),
  "percent": img("low-percent.webp"),
  "scale": img("scale-compare.webp"),

  // Bonus
  "party-popper": img("party-popper.webp"),
  "rotate-cw": img("free-spins.webp"),
  "unlink": img("chain-broken.webp"),
  "link": img("chain-linked.webp"),
  "undo-2": img("cashback-undo.webp"),
  "refresh-cw": img("reload-refresh.webp"),
  "calendar-check": img("calendar-check.webp"),
  "calculator": img("calculator.webp"),
  "piggy-bank": img("piggy-bank.webp"),
  "circle-check": img("circle-check.webp"),

  // Card games
  "spade": img("card-spade.webp"),
  "club": img("card-club.webp"),
  "copy": img("scale-compare.webp"),
  "hash": img("dice-craps.webp"),

  // Strategy
  "arrow-up-right": img("arrow-strategy.webp"),
  "sigma": img("chart-stats.webp"),
  "minus": img("low-percent.webp"),
  "list-ordered": img("clipboard-check.webp"),

  // Roulette
  "circle-dot": img("roulette-wheel.webp"),
  "circle": img("roulette-wheel.webp"),
  "circle-dashed": img("roulette-wheel.webp"),

  // Poker
  "layers": img("slot-machine.webp"),
  "sun": img("sun-warm.webp"),
  "monitor": img("monitor-screen.webp"),
  "brain": img("brain-strategy.webp"),
  "award": img("medal-award.webp"),

  // Other games
  "dice-5": img("dice-craps.webp"),
  "ticket": img("ticket-lottery.webp"),

  // Live Casino
  "building-2": img("building-game.webp"),
  "tv": img("tv-show.webp"),
  "clock": img("clock-time.webp"),
  "target": img("target-aim.webp"),
  "briefcase": img("briefcase.webp"),
  "users": img("users-group.webp"),

  // Slots
  "candy": img("slot-machine.webp"),
  "book-open": img("book-glossary.webp"),
  "cloud-lightning": img("lightning-fast.webp"),
  "star": img("trophy-casino.webp"),
  "fish": img("slot-machine.webp"),
  "crosshair": img("target-aim.webp"),
  "compass": img("slot-machine.webp"),
  "atom": img("slot-machine.webp"),
  "train-front": img("slot-machine.webp"),
  "dog": img("slot-machine.webp"),
  "home": img("building-game.webp"),
  "grape": img("slot-machine.webp"),
  "pickaxe": img("slot-machine.webp"),
  "flame": img("lightning-fast.webp"),
  "scroll": img("file-text.webp"),
  "sparkles": img("trophy-casino.webp"),
  "eye": img("slot-machine.webp"),
  "crown": img("trophy-casino.webp"),
  "cake": img("gift-bonus.webp"),
  "gem": img("slot-machine.webp"),
  "coins": img("banknote-money.webp"),
  "heart": img("heart-handshake.webp"),
  "badge": img("medal-award.webp"),
  "moon": img("slot-machine.webp"),
  "skull": img("slot-machine.webp"),
  "smile": img("gamepad-fun.webp"),
  "shopping-cart": img("shopping-bag.webp"),

  // Payment
  "apple": img("apple.webp"),
  "wallet": img("wallet.webp"),
  "credit-card": img("credit-card.webp"),
  "send": img("send-paper.webp"),
  "landmark": img("landmark-bank.webp"),
  "circle-dollar-sign": img("dollar-circle.webp"),

  // Community
  "archive": img("archive-box.webp"),
  "database": img("database.webp"),
  "chart-bar": img("chart-stats.webp"),
  "swords": img("swords-tournament.webp"),
  "medal": img("medal-award.webp"),
  "circle-play": img("play-video.webp"),
  "shopping-bag": img("shopping-bag.webp"),

  // More
  "book-a": img("book-glossary.webp"),
  "info": img("info-circle.webp"),
  "clipboard-check": img("clipboard-check.webp"),
  "file-text": img("file-text.webp"),
  "heart-handshake": img("heart-handshake.webp"),
  "mail": img("mail-envelope.webp"),
  "newspaper": img("newspaper.webp"),
};
