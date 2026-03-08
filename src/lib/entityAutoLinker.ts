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

  // Casino uden konto money-page
  {
    patterns: [/\bcasino uden konto\b/i, /\bcasino uden registrering\b/i],
    href: "/casino-uden-konto",
    anchor: "",
  },
  {
    patterns: [/\bPay N Play\b/],
    href: "/casino-uden-konto/pay-n-play",
    anchor: "Pay N Play",
  },
  {
    patterns: [/\bhurtig registrering\b/i],
    href: "/casino-uden-konto/hurtig-registrering",
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
    href: "/ansvarligt-spil/rofus",
    anchor: "ROFUS",
  },
  {
    patterns: [/\bansvarligt spil\b/i],
    href: "/ansvarligt-spil",
    anchor: "ansvarligt spil",
  },

  // Ansvarligt Spil spoke money-pages
  {
    patterns: [/\bludomani\b/i, /\bspilleafhængighed\b/i, /\bspilafhaengighed\b/i],
    href: "/ansvarligt-spil/ludomani",
    anchor: "",
  },
  {
    patterns: [/\bStopSpillet\b/],
    href: "/ansvarligt-spil/stopspillet",
    anchor: "StopSpillet",
  },
  {
    patterns: [/\bspillegrænser\b/i, /\bindbetalingsgrænse\b/i, /\bindbetalingsgraense\b/i],
    href: "/ansvarligt-spil/spillegraenser",
    anchor: "",
  },
  {
    patterns: [/\bselvudelukkelse\b/i],
    href: "/ansvarligt-spil/selvudelukkelse-guide",
    anchor: "",
  },
  {
    patterns: [/\bhjælpelinjer\b/i, /\bhjaelpelinjer\b/i],
    href: "/ansvarligt-spil/hjaelpelinjer",
    anchor: "",
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
  {
    patterns: [/\bPayPal\b/],
    href: "/betalingsmetoder/paypal",
    anchor: "PayPal",
  },
  {
    patterns: [/\bVisa\b/, /\bMastercard\b/],
    href: "/betalingsmetoder/visa-mastercard",
    anchor: "",
  },
  {
    patterns: [/\bSkrill\b/],
    href: "/betalingsmetoder/skrill",
    anchor: "Skrill",
  },
  {
    patterns: [/\bPaysafecard\b/i],
    href: "/betalingsmetoder/paysafecard",
    anchor: "",
  },
  {
    patterns: [/\bApple Pay\b/],
    href: "/betalingsmetoder/apple-pay",
    anchor: "Apple Pay",
  },
  {
    patterns: [/\bZimpler\b/],
    href: "/betalingsmetoder/zimpler",
    anchor: "Zimpler",
  },
  {
    patterns: [/\bRevolut\b/],
    href: "/betalingsmetoder/revolut",
    anchor: "Revolut",
  },

  // Spiludviklere money-pages
  {
    patterns: [/\bEvolution Gaming\b/i, /\bEvolution\b/],
    href: "/spiludviklere/evolution-gaming",
    anchor: "",
  },
  {
    patterns: [/\bPragmatic Play\b/i],
    href: "/spiludviklere/pragmatic-play",
    anchor: "Pragmatic Play",
  },
  {
    patterns: [/\bNetEnt\b/],
    href: "/spiludviklere/netent",
    anchor: "NetEnt",
  },
  {
    patterns: [/\bPlay'?n.?GO\b/i, /\bPlay n Go\b/i],
    href: "/spiludviklere/play-n-go",
    anchor: "",
  },
  {
    patterns: [/\bHacksaw Gaming\b/i],
    href: "/spiludviklere/hacksaw-gaming",
    anchor: "Hacksaw Gaming",
  },
  {
    patterns: [/\bNolimit City\b/i, /\bNoLimit City\b/i],
    href: "/spiludviklere/nolimit-city",
    anchor: "",
  },
  {
    patterns: [/\bBig Time Gaming\b/i],
    href: "/spiludviklere/big-time-gaming",
    anchor: "Big Time Gaming",
  },
  {
    patterns: [/\bRed Tiger\b/i],
    href: "/spiludviklere/red-tiger",
    anchor: "Red Tiger",
  },
  {
    patterns: [/\bELK Studios\b/i],
    href: "/spiludviklere/elk-studios",
    anchor: "ELK Studios",
  },
  {
    patterns: [/\bYggdrasil\b/],
    href: "/spiludviklere/yggdrasil",
    anchor: "Yggdrasil",
  },
  {
    patterns: [/\bMicrogaming\b/],
    href: "/spiludviklere/microgaming",
    anchor: "Microgaming",
  },
  {
    patterns: [/\bRelax Gaming\b/i],
    href: "/spiludviklere/relax-gaming",
    anchor: "Relax Gaming",
  },

  // Game type money-pages
  {
    patterns: [/\blive blackjack\b/i],
    href: "/live-casino/blackjack",
    anchor: "",
  },
  {
    patterns: [/\blive roulette\b/i],
    href: "/live-casino/roulette",
    anchor: "",
  },
  {
    patterns: [/\blightning roulette\b/i],
    href: "/live-casino/lightning-roulette",
    anchor: "",
  },
  {
    patterns: [/\blive baccarat\b/i],
    href: "/live-casino/baccarat",
    anchor: "",
  },
  {
    patterns: [/\blive casino\b/i, /\blive-casino\b/i],
    href: "/live-casino",
    anchor: "",
  },
  {
    patterns: [/\bpoker\b/i],
    href: "/casinospil/poker",
    anchor: "",
  },
  {
    patterns: [/\bbaccarat\b/i],
    href: "/casinospil/baccarat",
    anchor: "",
  },
  {
    patterns: [/\bcraps\b/i],
    href: "/casinospil/craps",
    anchor: "",
  },
  {
    patterns: [/\bgame shows?\b/i, /\btv[\s-]?spil\b/i],
    href: "/live-casino/monopoly-live",
    anchor: "",
  },

  // Slot kategori money-pages
  {
    patterns: [/\bmegaways slots?\b/i, /\bmegaways spillemaskiner\b/i],
    href: "/megaways-slots",
    anchor: "",
  },
  {
    patterns: [/\bjackpot slots?\b/i, /\bprogressive? jackpot slots?\b/i],
    href: "/jackpot-slots",
    anchor: "",
  },
  {
    patterns: [/\bbonus buy slots?\b/i, /\bfeature buy slots?\b/i],
    href: "/bonus-buy-slots",
    anchor: "",
  },


  // Bonus money-pages (additional)
  {
    patterns: [/\bbonus uden indbetaling\b/i],
    href: "/bonus-uden-indbetaling",
    anchor: "",
  },

  // Mobil Casino cluster money-pages
  {
    patterns: [/\bmobil casino\b/i, /\bcasino på mobilen\b/i, /\bmobilcasino\b/i],
    href: "/mobil-casino",
    anchor: "",
  },
  {
    patterns: [/\bcasino app\b/i, /\bcasino apps\b/i, /\bcasino-app\b/i],
    href: "/casino-app",
    anchor: "",
  },
  {
    patterns: [/\bcasino på iphone\b/i, /\biphone casino\b/i],
    href: "/mobil-casino/iphone",
    anchor: "",
  },
  {
    patterns: [/\bcasino på android\b/i, /\bandroid casino\b/i],
    href: "/mobil-casino/android",
    anchor: "",
  },
  {
    patterns: [/\bcasino på tablet\b/i, /\btablet casino\b/i],
    href: "/mobil-casino/tablet",
    anchor: "",
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
    href: "/megaways-slots",
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
  // progressiv-jackpot removed – merged into /ordbog/jackpot
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
  // mitid-casino removed – cannibalization with /nye-casinoer/mitid
  // gevinstprocent removed – cannibalization with RTP + hit-frequency
  {
    patterns: [/\bexpected value\b/i, /\bforventet værdi\b/i],
    href: "/ordbog/expected-value",
    anchor: "",
  },
  {
    patterns: [/\bspillicens\b/i, /\bcasino[\s-]?licens\b/i],
    href: "/ordbog/spillicens",
    anchor: "",
  },
  {
    patterns: [/\bminimum indbetaling\b/i, /\bmin\.? indbetaling\b/i],
    href: "/ordbog/minimum-indbetaling",
    anchor: "",
  },
  // Batch 3 – high-value terms only (avoid overlinking)
  {
    patterns: [/\bstacked wilds?\b/i],
    href: "/ordbog/stacked-wilds",
    anchor: "",
  },
  {
    patterns: [/\bsticky wilds?\b/i],
    href: "/ordbog/sticky-wilds",
    anchor: "",
  },
  {
    patterns: [/\bwalking wilds?\b/i],
    href: "/ordbog/walking-wilds",
    anchor: "",
  },
  {
    patterns: [/\bhold[\s-]?and[\s-]?spin\b/i],
    href: "/ordbog/hold-and-spin",
    anchor: "",
  },
  {
    patterns: [/\binfinity reels\b/i],
    href: "/ordbog/infinity-reels",
    anchor: "",
  },
  {
    patterns: [/\bxWays\b/, /\bx[\s-]?Ways\b/i],
    href: "/ordbog/xways",
    anchor: "",
  },
  {
    patterns: [/\bxNudge\b/, /\bx[\s-]?Nudge\b/i],
    href: "/ordbog/xnudge",
    anchor: "",
  },
  {
    patterns: [/\bante[\s-]?bet\b/i],
    href: "/ordbog/ante-bet",
    anchor: "",
  },
  {
    patterns: [/\bwin[\s-]?cap\b/i],
    href: "/ordbog/win-cap",
    anchor: "",
  },
  {
    patterns: [/\brisk of ruin\b/i],
    href: "/ordbog/risk-of-ruin",
    anchor: "",
  },
  {
    patterns: [/\bside[\s-]?bet\b/i],
    href: "/ordbog/side-bet",
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
