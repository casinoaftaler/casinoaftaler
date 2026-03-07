/**
 * Bidirectional mapping between slot guide slugs and their provider slugs.
 * Used for internal link equity flow between provider ↔ slot pages.
 */

export const SLOT_TO_PROVIDER: Record<string, string> = {
  "sweet-bonanza": "pragmatic-play",
  "gates-of-olympus": "pragmatic-play",
  "the-dog-house": "pragmatic-play",
  "wild-west-gold": "pragmatic-play",
  "sugar-rush": "pragmatic-play",
  "madame-destiny-megaways": "pragmatic-play",
  "buffalo-king": "pragmatic-play",
  "big-bass-bonanza": "pragmatic-play",
  "wolf-gold": "pragmatic-play",
  "starburst": "netent",
  "gonzos-quest": "netent",
  "dead-or-alive-2": "netent",
  "divine-fortune": "netent",
  "book-of-dead": "play-n-go",
  "legacy-of-dead": "play-n-go",
  "reactoonz": "play-n-go",
  "fire-joker": "play-n-go",
  "eye-of-horus": "play-n-go",
  "joker-strike": "play-n-go",
  "immortal-romance": "microgaming",
  "mega-moolah": "microgaming",
  "thunderstruck-ii": "microgaming",
  "bonanza": "big-time-gaming",
  "extra-chilli-megaways": "big-time-gaming",
  "chaos-crew": "hacksaw-gaming",
  "wanted-dead-or-a-wild": "hacksaw-gaming",
  "razor-shark": "hacksaw-gaming",
  "jammin-jars": "hacksaw-gaming",
  "money-train-3": "relax-gaming",
  "cleopatra": "igt",
  "bonus-buys": "",
};

/** Reverse mapping: provider slug → list of slot guide slugs */
export const PROVIDER_TO_SLOTS: Record<string, { slug: string; name: string }[]> = {};

const SLOT_DISPLAY_NAMES: Record<string, string> = {
  "sweet-bonanza": "Sweet Bonanza",
  "gates-of-olympus": "Gates of Olympus",
  "the-dog-house": "The Dog House",
  "wild-west-gold": "Wild West Gold",
  "sugar-rush": "Sugar Rush",
  "madame-destiny-megaways": "Madame Destiny Megaways",
  "buffalo-king": "Buffalo King",
  "big-bass-bonanza": "Big Bass Bonanza",
  "wolf-gold": "Wolf Gold",
  "starburst": "Starburst",
  "gonzos-quest": "Gonzo's Quest",
  "dead-or-alive-2": "Dead or Alive 2",
  "divine-fortune": "Divine Fortune",
  "book-of-dead": "Book of Dead",
  "legacy-of-dead": "Legacy of Dead",
  "reactoonz": "Reactoonz",
  "fire-joker": "Fire Joker",
  "eye-of-horus": "Eye of Horus",
  "joker-strike": "Joker Strike",
  "immortal-romance": "Immortal Romance",
  "mega-moolah": "Mega Moolah",
  "thunderstruck-ii": "Thunderstruck II",
  "bonanza": "Bonanza",
  "extra-chilli-megaways": "Extra Chilli Megaways",
  "chaos-crew": "Chaos Crew",
  "wanted-dead-or-a-wild": "Wanted Dead or a Wild",
  "razor-shark": "Razor Shark",
  "jammin-jars": "Jammin' Jars",
  "money-train-3": "Money Train 3",
  "cleopatra": "Cleopatra",
  "bonus-buys": "Bonus Buys Guide",
};

// Build reverse mapping
for (const [slotSlug, providerSlug] of Object.entries(SLOT_TO_PROVIDER)) {
  if (!providerSlug) continue;
  if (!PROVIDER_TO_SLOTS[providerSlug]) {
    PROVIDER_TO_SLOTS[providerSlug] = [];
  }
  PROVIDER_TO_SLOTS[providerSlug].push({
    slug: slotSlug,
    name: SLOT_DISPLAY_NAMES[slotSlug] || slotSlug,
  });
}

export const PROVIDER_DISPLAY_NAMES: Record<string, string> = {
  "pragmatic-play": "Pragmatic Play",
  "netent": "NetEnt",
  "play-n-go": "Play'n GO",
  "microgaming": "Microgaming",
  "big-time-gaming": "Big Time Gaming",
  "hacksaw-gaming": "Hacksaw Gaming",
  "relax-gaming": "Relax Gaming",
  "evolution-gaming": "Evolution Gaming",
  "elk-studios": "ELK Studios",
  "yggdrasil": "Yggdrasil",
  "nolimit-city": "Nolimit City",
  "red-tiger": "Red Tiger",
  "igt": "IGT",
};
