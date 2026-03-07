/**
 * Entity auto-linker: replaces first occurrence of key entities in HTML
 * with internal links to relevant main pages.
 * 
 * CRITICAL PRIORITY ORDER:
 * 1. Money-pages FIRST (commercial/transactional targets)
 * 2. Glossary-sider KUN for termer uden kommerciel modpart
 * 
 * Rules:
 * - Only first occurrence per entity
 * - Natural anchor text
 * - No keyword stuffing
 * - Skip entities already wrapped in <a> tags
 * - Skip entities inside headings (h1-h6) and strong tags
 */

interface EntityMapping {
  patterns: RegExp[];
  href: string;
  anchor: string;
}

const ENTITY_MAPPINGS: EntityMapping[] = [
  // ══════════════════════════════════════════════════════════════════
  // ── MONEY-PAGE ENTITIES (highest priority – listed first) ───────
  // ══════════════════════════════════════════════════════════════════

  // Bonus cluster money-pages – MUST outrank glossary entries
  {
    patterns: [/\bomsætningskrav\b/i, /\bomsaetningskrav\b/i, /\bwagering[\s-]?krav\b/i],
    href: "/omsaetningskrav",
    anchor: "",
  },
  {
    patterns: [/\bfree spins\b/i, /\bgratis spins\b/i],
    href: "/free-spins",
    anchor: "",
  },
  {
    patterns: [/\bcasino bonus\b/i, /\bcasinobonus\b/i],
    href: "/casino-bonus",
    anchor: "",
  },
  {
    patterns: [/\bvelkomstbonus\b/i, /\bvelkomst-bonus\b/i],
    href: "/velkomstbonus",
    anchor: "",
  },
  {
    patterns: [/\bindskudsbonus\b/i, /\bindskuds-bonus\b/i],
    href: "/indskudsbonus",
    anchor: "",
  },
  {
    patterns: [/\bbonus uden omsætningskrav\b/i, /\bbonus uden omsaetningskrav\b/i],
    href: "/bonus-uden-omsaetningskrav",
    anchor: "",
  },
  {
    patterns: [/\bno[\s-]?sticky bonus\b/i],
    href: "/no-sticky-bonus",
    anchor: "",
  },
  {
    patterns: [/\bsticky bonus\b/i],
    href: "/sticky-bonus",
    anchor: "",
  },
  {
    patterns: [/\bcashback bonus\b/i, /\bcashback-bonus\b/i],
    href: "/cashback-bonus",
    anchor: "",
  },
  {
    patterns: [/\breload bonus\b/i, /\breload-bonus\b/i],
    href: "/reload-bonus",
    anchor: "",
  },

  // Casino-liste money-pages
  {
    patterns: [/\bnye casinoer\b/i],
    href: "/nye-casinoer",
    anchor: "",
  },
  {
    patterns: [/\bdansk licens\b/i, /\bdanske licenser\b/i],
    href: "/casino-licenser",
    anchor: "",
  },
  {
    patterns: [/\bhvidvask(?:regler|lovgivning|ning)?\b/i, /\bAML\b/],
    href: "/casino-licenser",
    anchor: "",
  },

  // Casinospil hub money-pages
  {
    patterns: [/\bspillemaskiner\b/i],
    href: "/casinospil/spillemaskiner",
    anchor: "",
  },
  {
    patterns: [/\bblackjack\b/i],
    href: "/casinospil/blackjack",
    anchor: "",
  },
  {
    patterns: [/\broulette\b/i],
    href: "/casinospil/roulette",
    anchor: "",
  },

  // Trust & compliance money-pages
  {
    patterns: [/\bSpillemyndigheden\b/],
    href: "/spillemyndigheden",
    anchor: "Spillemyndigheden",
  },
  {
    patterns: [/\bROFUS\b/],
    href: "/ansvarligt-spil",
    anchor: "ROFUS",
  },
  {
    patterns: [/\bansvarligt spil\b/i],
    href: "/ansvarligt-spil",
    anchor: "ansvarligt spil",
  },

  // Payment money-pages
  {
    patterns: [/\bTrustly\b/],
    href: "/betalingsmetoder/trustly",
    anchor: "Trustly",
  },
  {
    patterns: [/\bMobilePay\b/],
    href: "/betalingsmetoder/mobilepay",
    anchor: "MobilePay",
  },

  // ══════════════════════════════════════════════════════════════════
  // ── GLOSSARY ENTITIES (informational support – lower priority) ──
  // Only for terms WITHOUT a competing money-page
  // ══════════════════════════════════════════════════════════════════
  {
    patterns: [/\bRTP\b/],
    href: "/ordbog/rtp",
    anchor: "RTP",
  },
  {
    patterns: [/\bvolatilitet\b/i, /\bvarians\b/i],
    href: "/ordbog/volatilitet",
    anchor: "",
  },
  {
    patterns: [/\bhouse edge\b/i],
    href: "/ordbog/house-edge",
    anchor: "",
  },
  {
    patterns: [/\bjackpot\b/i],
    href: "/ordbog/jackpot",
    anchor: "",
  },
  {
    patterns: [/\bRNG\b/, /\brandom number generator\b/i, /\btilfældighedsgenerator\b/i],
    href: "/ordbog/rng",
    anchor: "",
  },
  {
    patterns: [/\bbonusrunde\b/i, /\bbonus[\s-]?runde\b/i],
    href: "/ordbog/bonus-runde",
    anchor: "",
  },
  {
    patterns: [/\bmultiplikator\b/i, /\bmultiplier\b/i],
    href: "/ordbog/multiplikator",
    anchor: "",
  },
  {
    patterns: [/\bmax[\s-]?bet\b/i],
    href: "/ordbog/max-bet",
    anchor: "",
  },
  {
    patterns: [/\bautoplay\b/i, /\bauto[\s-]?spin\b/i],
    href: "/ordbog/autoplay",
    anchor: "",
  },
  {
    patterns: [/\bscatter[\s-]?symbol\b/i, /\bscatter\b/i],
    href: "/ordbog/scatter",
    anchor: "",
  },
  {
    patterns: [/\bwild[\s-]?symbol\b/i],
    href: "/ordbog/wild",
    anchor: "",
  },
  {
    patterns: [/\bgevinstlinjer\b/i, /\bpaylines\b/i],
    href: "/ordbog/paylines",
    anchor: "",
  },
  {
    patterns: [/\bhit frequency\b/i, /\bhit-frequency\b/i],
    href: "/ordbog/hit-frequency",
    anchor: "",
  },
  {
    patterns: [/\bcascading wins\b/i, /\btumble[\s-]?wins\b/i, /\bavalanche[\s-]?wins\b/i],
    href: "/ordbog/cascading-wins",
    anchor: "",
  },
  {
    patterns: [/\bmegaways\b/i],
    href: "/ordbog/megaways",
    anchor: "",
  },
  {
    patterns: [/\bgamble[\s-]?feature\b/i, /\brisikospil\b/i],
    href: "/ordbog/gamble-feature",
    anchor: "",
  },
  {
    patterns: [/\bbuy[\s-]?bonus\b/i, /\bbonus[\s-]?buy\b/i, /\bfeature[\s-]?buy\b/i],
    href: "/ordbog/buy-bonus",
    anchor: "",
  },
  {
    patterns: [/\bbankroll[\s-]?management\b/i],
    href: "/ordbog/bankroll-management",
    anchor: "",
  },
  {
    patterns: [/\bprogressiv jackpot\b/i, /\bprogressive jackpot\b/i],
    href: "/ordbog/progressiv-jackpot",
    anchor: "",
  },
  {
    patterns: [/\bcluster[\s-]?pays\b/i, /\bklynge[\s-]?gevinst\b/i],
    href: "/ordbog/cluster-pays",
    anchor: "",
  },
  {
    patterns: [/\bexpanding[\s-]?wild\b/i],
    href: "/ordbog/expanding-wild",
    anchor: "",
  },
  {
    patterns: [/\bretrigger\b/i],
    href: "/ordbog/retrigger",
    anchor: "",
  },
  {
    patterns: [/\bKYC\b/, /\bknow your customer\b/i],
    href: "/ordbog/kyc",
    anchor: "",
  },
  {
    patterns: [/\bgamification\b/i],
    href: "/ordbog/gamification",
    anchor: "",
  },
  {
    patterns: [/\bMitID\b/],
    href: "/ordbog/mitid-casino",
    anchor: "MitID",
  },
  {
    patterns: [/\bgevinstprocent\b/i, /\bwin rate\b/i],
    href: "/ordbog/gevinstprocent",
    anchor: "",
  },
  {
    patterns: [/\bminimum indbetaling\b/i, /\bmin\.? indbetaling\b/i],
    href: "/ordbog/minimum-indbetaling",
    anchor: "",
  },
];

/**
 * Forbidden wrapper tags — auto-linking is only allowed inside <p> and <li>.
 * We check if the match position is inside any of these tags.
 */
const FORBIDDEN_TAGS = ["a", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "button"];

/**
 * Check if a position in HTML is inside a forbidden context.
 */
function isInsideForbiddenContext(html: string, pos: number): boolean {
  const before = html.slice(0, pos);

  for (const tag of FORBIDDEN_TAGS) {
    const lastOpen = before.lastIndexOf(`<${tag}`);
    if (lastOpen !== -1) {
      const lastClose = before.lastIndexOf(`</${tag}>`);
      if (lastClose < lastOpen) return true;
    }
  }

  // Check if inside an HTML tag attribute (e.g., alt="...", title="...")
  const lastTagOpen = before.lastIndexOf("<");
  if (lastTagOpen !== -1) {
    const lastTagClose = before.lastIndexOf(">");
    if (lastTagClose < lastTagOpen) return true;
  }

  return false;
}

/**
 * Processes HTML content and auto-links the first occurrence of
 * key entities to their respective main pages.
 * Only links text inside <p> and <li> elements, never in headings or anchors.
 */
export function autoLinkEntities(html: string): string {
  if (!html) return html;
  
  let result = html;
  const linkedEntities = new Set<string>();

  for (const entity of ENTITY_MAPPINGS) {
    if (linkedEntities.has(entity.href)) continue;

    for (const pattern of entity.patterns) {
      // Split by anchor and heading tags to skip them entirely
      const parts = result.split(/(<(?:a|h[1-6]|strong|button)[^>]*>[\s\S]*?<\/(?:a|h[1-6]|strong|button)>)/gi);
      let found = false;

      for (let i = 0; i < parts.length; i++) {
        // Skip parts that are forbidden tags
        if (parts[i].match(/^<(?:a|h[1-6]|strong|button)[^>]*>/i)) continue;

        const match = parts[i].match(pattern);
        if (match && match.index !== undefined) {
          // Calculate absolute position for extra safety check
          const absolutePos = parts.slice(0, i).join("").length + match.index;
          if (isInsideForbiddenContext(result, absolutePos)) continue;

          const matchedText = match[0];
          const anchorText = entity.anchor || matchedText;
          const link = `<a href="${entity.href}" class="text-primary hover:underline">${anchorText}</a>`;
          
          parts[i] =
            parts[i].slice(0, match.index) +
            link +
            parts[i].slice(match.index + matchedText.length);
          
          found = true;
          linkedEntities.add(entity.href);
          break;
        }
      }

      if (found) {
        result = parts.join("");
        break;
      }
    }
  }

  return result;
}
