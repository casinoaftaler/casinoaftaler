import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ===== BOOK OF FEDESVIN (Egyptian theme) =====

const BASE_STYLE = `
STYLE REQUIREMENTS (MANDATORY - MUST FOLLOW EXACTLY):
- Art style: High-quality digital painting, semi-realistic with stylized elements
- Rendering: Smooth gradients, soft shadows, polished game art quality
- Color palette: Warm golden and amber tones, with accents of deep blue, turquoise, and rich browns
- Lighting: Dramatic golden rim lighting from behind, creating a divine glow effect
- Detail level: High detail on the main subject, slightly softer background

BACKGROUND REQUIREMENTS (MANDATORY):
- Egyptian temple interior background
- Stone columns with hieroglyphic carvings visible on both sides
- Subtle torch light creating warm ambient glow
- Slightly blurred/depth-of-field background to make the symbol pop
- The background must fill the ENTIRE canvas edge-to-edge
- NO white borders, NO white edges, NO margins anywhere

FORMAT: Square 1:1 aspect ratio, suitable for a slot machine symbol.
`;

const PREMIUM_FRAME = `
FRAME/BORDER REQUIREMENTS (MANDATORY):
- Add an ornate golden Egyptian-style frame/border around the ENTIRE image
- The frame MUST touch ALL FOUR EDGES of the image (no gaps at edges)
- Frame width: approximately 5-8% of the image on each side
- Frame design: Intricate golden border with hieroglyphic patterns
- Corner decorations: Small golden lotus flowers or scarab motifs
- The frame should have depth and dimension (3D appearance)
- Inner edge of frame: subtle golden glow effect
- The artwork must extend FULLY to the inner edge of the frame (no gaps)
- CRITICAL: The outer edge of the frame must be FLUSH with the image boundary
`;

const SCATTER_FRAME = `
FRAME/BORDER REQUIREMENTS (MANDATORY):
- Add an ornate RED Egyptian-style frame/border around the ENTIRE image
- The frame MUST touch ALL FOUR EDGES of the image (no gaps at edges)
- Frame width: approximately 5-8% of the image on each side
- Frame design: Intricate deep ruby red border with hieroglyphic patterns carved into it
- Frame color: Rich crimson/ruby red with subtle golden trim on the edges
- Corner decorations: Small scarab motifs with ruby red gems and golden accents
- The frame should have depth and dimension (3D appearance)
- Inner edge of frame: subtle red glow effect with golden highlights
- The artwork must extend FULLY to the inner edge of the frame (no gaps)
- CRITICAL: The outer edge of the frame must be FLUSH with the image boundary
`;

// ===== RISE OF FEDESVIN (Wizard/Fantasy theme) =====

const RISE_BASE_STYLE = `
STYLE REQUIREMENTS (MANDATORY - MUST FOLLOW EXACTLY):
- Art style: High-quality digital painting, semi-realistic with stylized fantasy elements
- Rendering: Smooth gradients, soft magical glows, polished game art quality
- Color palette: Deep purples, midnight blues, silver, and mystical teal/cyan accents
- Lighting: Dramatic purple and blue magical rim lighting, arcane energy glow
- Detail level: High detail on the main subject, slightly softer background

BACKGROUND REQUIREMENTS (MANDATORY):
- Mystical wizard tower interior background
- Dark stone walls with glowing arcane runes carved into them
- Floating magical particles and wisps of purple/blue energy
- Arcane bookshelves and magical artifacts faintly visible in the background
- Subtle purple/blue ambient glow from magical sources
- Slightly blurred/depth-of-field background to make the symbol pop
- The background must fill the ENTIRE canvas edge-to-edge
- NO white borders, NO white edges, NO margins anywhere

FORMAT: Square 1:1 aspect ratio, suitable for a slot machine symbol.
`;

const RISE_PREMIUM_FRAME = `
FRAME/BORDER REQUIREMENTS (MANDATORY):
- Add an ornate SILVER and PURPLE arcane-style frame/border around the ENTIRE image
- The frame MUST touch ALL FOUR EDGES of the image (no gaps at edges)
- Frame width: approximately 5-8% of the image on each side
- Frame design: Intricate silver border with carved arcane rune patterns
- Frame color: Polished silver metal with deep purple gemstone inlays
- Corner decorations: Small glowing crystals or arcane star motifs in purple/teal
- The frame should have depth and dimension (3D appearance)
- Inner edge of frame: subtle purple magical glow effect
- The artwork must extend FULLY to the inner edge of the frame (no gaps)
- CRITICAL: The outer edge of the frame must be FLUSH with the image boundary
`;

const RISE_SCATTER_FRAME = `
FRAME/BORDER REQUIREMENTS (MANDATORY):
- Add an ornate RED magical frame/border around the ENTIRE image
- The frame MUST touch ALL FOUR EDGES of the image (no gaps at edges)
- Frame width: approximately 5-8% of the image on each side
- Frame design: Intricate deep crimson border with enchanted rune patterns carved into it
- Frame color: Rich crimson/ruby red with subtle silver trim on the edges
- Corner decorations: Small glowing red magical crystals with silver arcane accents
- The frame should have depth and dimension (3D appearance)
- Inner edge of frame: subtle red magical glow effect with pulsing energy
- The artwork must extend FULLY to the inner edge of the frame (no gaps)
- CRITICAL: The outer edge of the frame must be FLUSH with the image boundary
`;

// ===== BOOK OF FEDESVIN PROMPTS =====

function getPromptForSymbol(name: string, isScatter: boolean): string {
  const normalizedName = name.toLowerCase().trim();

  if (isScatter || normalizedName.includes("fedesvin") || normalizedName.includes("book")) {
    return `Create a slot machine symbol for an Egyptian-themed game called "Book of Fedesvin".

MAIN SUBJECT (MUST KEEP EXACTLY AS DESCRIBED):
- A CHUBBY/FAT gray and white cat (similar to British Shorthair) sitting comfortably
- The cat has green eyes and a sweet, slightly smug expression
- The cat wears an Egyptian pharaoh headdress (nemes) in gold and blue stripes
- A decorative golden collar with blue gems around the cat's neck
- The cat is sitting ON TOP of an ancient Egyptian golden book
- The book has ornate golden decorations with winged scarab and gems on the spine/cover
- A red bookmark ribbon visible from the book

COMPOSITION:
- FULL ART: The cat and book must fill the ENTIRE frame edge-to-edge
- Cat and book centered as the main focus
- Golden divine light emanating from behind
- NO empty space - the artwork extends to all edges

${SCATTER_FRAME}

${BASE_STYLE}

This is a "Book of the Dead" themed scatter/wild symbol for a slot game.`;
  }

  if (normalizedName.includes("pharaoh") || normalizedName.includes("farao")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A majestic Egyptian Pharaoh depicted as a bust/portrait
- Golden nemes headdress with blue and gold stripes
- Royal uraeus cobra prominently on the forehead
- Strong, regal face with kohl-lined eyes
- Golden usekh collar (broad collar) with lapis lazuli, turquoise, and carnelian gems
- Powerful, commanding expression befitting a god-king
- Skin with a warm, bronze tone

COMPOSITION:
- FULL ART: The Pharaoh must fill the ENTIRE frame edge-to-edge
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject
- NO empty space - the artwork extends to all edges

${PREMIUM_FRAME}

${BASE_STYLE}`;
  }

  if (normalizedName.includes("anubis")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- The Egyptian god Anubis depicted as a bust/portrait
- Sleek black jackal head with elegant pointed ears
- Fur rendered with subtle sheen and detail
- Piercing golden/amber eyes with an intense, mysterious gaze
- Golden Egyptian usekh collar (broad collar) with lapis lazuli and turquoise inlays
- Golden earrings and ceremonial headdress elements
- Noble, powerful, and slightly menacing expression

COMPOSITION:
- FULL ART: Anubis must fill the ENTIRE frame edge-to-edge
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject
- NO empty space - the artwork extends to all edges

${PREMIUM_FRAME}

${BASE_STYLE}`;
  }

  if (normalizedName.includes("horus")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- The Egyptian god Horus depicted as a bust/portrait
- Majestic falcon head with detailed feathers in brown, gold, and white
- Sharp, piercing golden eyes with divine intensity
- Golden and blue pschent (double crown) or sun disk headdress
- Golden usekh collar with Eye of Horus motifs
- Regal and divine appearance befitting the sky god

COMPOSITION:
- FULL ART: Horus must fill the ENTIRE frame edge-to-edge
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject
- NO empty space - the artwork extends to all edges

${PREMIUM_FRAME}

${BASE_STYLE}`;
  }

  if (normalizedName.includes("scarab")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A sacred golden scarab beetle, highly detailed
- Wings spread outward in a majestic display
- Body encrusted with turquoise, lapis lazuli, and ruby gems
- Holding the sun disk above its head
- Intricate golden filigree and hieroglyphic patterns on the wings
- Polished, reflective gold surface with depth

COMPOSITION:
- FULL ART: The scarab must fill the ENTIRE frame edge-to-edge
- Wings spread symmetrically touching the frame edges
- Sun disk creating a golden glow above
- NO empty space - the artwork extends to all edges

${PREMIUM_FRAME}

${BASE_STYLE}`;
  }

  if (normalizedName.includes("isis")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- The Egyptian goddess Isis depicted as a bust/portrait
- Elegant feminine face with kohl-lined eyes and warm bronze skin
- Throne-shaped hieroglyph crown (her namesake) in gold
- Golden wings gracefully framing her shoulders
- Ornate golden usekh collar with lapis lazuli and turquoise
- Serene, wise, and powerful expression

COMPOSITION:
- Centered portrait filling most of the frame
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject

${BASE_STYLE}`;
  }

  if (normalizedName.includes("ankh")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- An ornate golden ankh (key of life), large and detailed
- Made of polished gold with a metallic sheen
- Encrusted with turquoise and lapis lazuli gems at key points
- Intricate hieroglyphic engravings carved into the gold
- Subtle divine glow emanating from within
- 3D appearance with depth and dimension

COMPOSITION:
- Ankh centered and filling approximately 70% of the frame
- Slight angle to show depth and dimension
- Golden rays of light behind it

${BASE_STYLE}`;
  }

  if (normalizedName === "a" || normalizedName.includes("letter a")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate letter "A" as the central focus
- Made of polished RED ruby/carnelian gemstone material with golden accents
- The letter should have a rich, deep RED color as the primary color
- Decorated with subtle hieroglyphic engravings carved into the surface
- Small golden and turquoise gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a precious RED gemstone artifact

${BASE_STYLE}`;
  }

  if (normalizedName === "k" || normalizedName.includes("letter k")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate letter "K" as the central focus
- Made of polished LIGHT BLUE aquamarine gemstone material with golden accents
- The letter should have a bright, LIGHT BLUE color as the primary color
- Decorated with subtle hieroglyphic engravings carved into the surface
- Small golden and turquoise gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a precious LIGHT BLUE gemstone artifact

${BASE_STYLE}`;
  }

  if (normalizedName === "q" || normalizedName.includes("letter q")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate letter "Q" as the central focus
- Made of polished PINK rose quartz gemstone material with golden accents
- The letter should have a vibrant PINK color as the primary color
- Decorated with subtle hieroglyphic engravings carved into the surface
- Small golden and turquoise gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a precious PINK gemstone artifact

${BASE_STYLE}`;
  }

  if (normalizedName === "j" || normalizedName.includes("letter j")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate letter "J" as the central focus
- Made of polished GREEN emerald gemstone material with golden accents
- The letter should have a rich, vibrant GREEN color as the primary color
- Decorated with subtle hieroglyphic engravings carved into the surface
- Small golden and turquoise gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a precious GREEN gemstone artifact

${BASE_STYLE}`;
  }

  if (normalizedName === "10" || normalizedName.includes("ten")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate number "10" as the central focus
- Made of polished BLUE sapphire gemstone material with golden accents
- The number should have a rich, deep BLUE color as the primary color
- Decorated with subtle hieroglyphic engravings carved into the surface
- Small golden and turquoise gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Number centered and filling approximately 70% of the frame
- Number should appear to be a precious BLUE gemstone artifact

${BASE_STYLE}`;
  }

  return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A ${name} themed icon rendered in ancient Egyptian style
- Made of or decorated with polished gold
- Rich details with turquoise and lapis lazuli accents
- Hieroglyphic decorative elements
- 3D appearance with depth and dimension

COMPOSITION:
- Subject centered and filling approximately 70% of the frame
- Should appear as a precious Egyptian artifact

${BASE_STYLE}`;
}

// ===== RISE OF FEDESVIN PROMPTS =====

function getPromptForRiseSymbol(name: string, isScatter: boolean): string {
  const normalizedName = name.toLowerCase().trim();

  // Scatter symbol - the cat on a spell book
  if (isScatter || normalizedName.includes("fedesvin") || normalizedName.includes("spell") || normalizedName.includes("book")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game called "Rise of Fedesvin".

MAIN SUBJECT (MUST KEEP EXACTLY AS DESCRIBED):
- A CHUBBY/FAT gray and white cat (similar to British Shorthair) sitting comfortably
- The cat has green eyes and a sweet, slightly smug expression
- The cat wears a wizard's pointed hat in deep purple with silver stars and moons
- A decorative silver collar with glowing purple gems around the cat's neck
- The cat is sitting ON TOP of an ancient magical spell book
- The spell book has ornate silver and purple decorations with arcane runes and glowing symbols on the cover
- Magical energy wisps emanating from the open pages
- A purple bookmark ribbon visible from the book

COMPOSITION:
- FULL ART: The cat and spell book must fill the ENTIRE frame edge-to-edge
- Cat and book centered as the main focus
- Purple and blue magical light emanating from behind
- NO empty space - the artwork extends to all edges

${RISE_SCATTER_FRAME}

${RISE_BASE_STYLE}

This is a magical scatter/wild symbol for a wizard-themed slot game.`;
  }

  // Merlin (Premium)
  if (normalizedName.includes("merlin") || normalizedName.includes("wizard")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A wise and powerful wizard (Merlin) depicted as a bust/portrait
- Long flowing white/silver beard, intricately braided
- Tall pointed wizard hat in deep purple/midnight blue covered with silver stars and celestial patterns
- Piercing blue eyes that glow with arcane wisdom
- Ornate silver and purple robes with arcane rune embroidery
- A magical staff or wand visible near the shoulder, crackling with energy
- Wise, powerful, and slightly mysterious expression

COMPOSITION:
- FULL ART: Merlin must fill the ENTIRE frame edge-to-edge
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Purple and blue magical energy emanating from behind the subject
- NO empty space - the artwork extends to all edges

${RISE_PREMIUM_FRAME}

${RISE_BASE_STYLE}`;
  }

  // Dragon (Premium)
  if (normalizedName.includes("dragon")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A majestic fantasy dragon depicted as a bust/portrait
- Iridescent scales in deep purple, midnight blue, and teal
- Powerful horns curving back from the head, silver-tipped
- Piercing golden/amber eyes with slit pupils, glowing with inner fire
- Subtle fire/magical breath visible near the nostrils
- Sharp, detailed facial features with armored scale plates
- Noble, powerful, and ancient expression

COMPOSITION:
- FULL ART: The dragon must fill the ENTIRE frame edge-to-edge
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Magical purple and teal energy emanating from behind
- NO empty space - the artwork extends to all edges

${RISE_PREMIUM_FRAME}

${RISE_BASE_STYLE}`;
  }

  // Phoenix (Premium)
  if (normalizedName.includes("phoenix")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A magnificent phoenix bird in mid-flight
- Feathers in brilliant gold, fiery orange, crimson red, and magical purple tips
- Wings spread wide in a majestic display
- Body engulfed in beautiful magical flames that blend from orange to purple
- Piercing golden eyes with divine intensity
- Trailing magical fire and sparks behind
- Radiant, powerful, and reborn appearance

COMPOSITION:
- FULL ART: The phoenix must fill the ENTIRE frame edge-to-edge
- Wings spread symmetrically touching the frame edges
- Magical flames creating a vibrant glow
- NO empty space - the artwork extends to all edges

${RISE_PREMIUM_FRAME}

${RISE_BASE_STYLE}`;
  }

  // Crystal Ball (Premium)
  if (normalizedName.includes("crystal") || normalizedName.includes("ball")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A large, glowing crystal ball on an ornate silver and purple stand
- Inside the crystal ball: swirling magical mists in purple, blue, and teal
- Faint mystical visions visible within (stars, runes, magical symbols)
- The stand has intricate silver filigree with purple gem accents
- Crackling arcane energy around the crystal ball's surface
- The crystal ball emits a soft, ethereal purple/blue glow
- 3D appearance with reflections and depth

COMPOSITION:
- FULL ART: The crystal ball must fill the ENTIRE frame edge-to-edge
- Crystal ball centered as the dominant element
- Magical energy radiating outward
- NO empty space - the artwork extends to all edges

${RISE_PREMIUM_FRAME}

${RISE_BASE_STYLE}`;
  }

  // Letter A (Common) - RED with arcane background
  if (normalizedName === "a" || normalizedName.includes("letter a")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A large, ornate letter "A" as the central focus
- Made of polished RED ruby gemstone material with silver arcane accents
- The letter should have a rich, deep RED color as the primary color
- Decorated with subtle arcane rune engravings carved into the surface
- Small silver and purple gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with mystical/arcane decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a precious RED gemstone artifact with magical glow

${RISE_BASE_STYLE}`;
  }

  // Letter K (Common) - LIGHT BLUE with arcane background
  if (normalizedName === "k" || normalizedName.includes("letter k")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A large, ornate letter "K" as the central focus
- Made of polished LIGHT BLUE aquamarine gemstone material with silver arcane accents
- The letter should have a bright, LIGHT BLUE color as the primary color
- Decorated with subtle arcane rune engravings carved into the surface
- Small silver and purple gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with mystical/arcane decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a precious LIGHT BLUE gemstone artifact with magical glow

${RISE_BASE_STYLE}`;
  }

  // Letter Q (Common) - PINK with arcane background
  if (normalizedName === "q" || normalizedName.includes("letter q")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A large, ornate letter "Q" as the central focus
- Made of polished PINK rose quartz gemstone material with silver arcane accents
- The letter should have a vibrant PINK color as the primary color
- Decorated with subtle arcane rune engravings carved into the surface
- Small silver and purple gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with mystical/arcane decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a precious PINK gemstone artifact with magical glow

${RISE_BASE_STYLE}`;
  }

  // Letter J (Common) - GREEN with arcane background
  if (normalizedName === "j" || normalizedName.includes("letter j")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A large, ornate letter "J" as the central focus
- Made of polished GREEN emerald gemstone material with silver arcane accents
- The letter should have a rich, vibrant GREEN color as the primary color
- Decorated with subtle arcane rune engravings carved into the surface
- Small silver and purple gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with mystical/arcane decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a precious GREEN gemstone artifact with magical glow

${RISE_BASE_STYLE}`;
  }

  // Number 10 (Common) - BLUE with arcane background
  if (normalizedName === "10" || normalizedName.includes("ten")) {
    return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A large, ornate number "10" as the central focus
- Made of polished BLUE sapphire gemstone material with silver arcane accents
- The number should have a rich, deep BLUE color as the primary color
- Decorated with subtle arcane rune engravings carved into the surface
- Small silver and purple gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with mystical/arcane decorative flourishes

COMPOSITION:
- Number centered and filling approximately 70% of the frame
- Number should appear to be a precious BLUE gemstone artifact with magical glow

${RISE_BASE_STYLE}`;
  }

  // Default fallback - generic fantasy symbol
  return `Create a slot machine symbol for a wizard/fantasy-themed game.

MAIN SUBJECT:
- A ${name} themed icon rendered in mystical wizard/fantasy style
- Made of or decorated with polished silver and enchanted materials
- Rich details with purple, teal, and arcane energy accents
- Magical rune decorative elements
- 3D appearance with depth and dimension

COMPOSITION:
- Subject centered and filling approximately 70% of the frame
- Should appear as a precious magical artifact

${RISE_BASE_STYLE}`;
}

// ===== GATES OF FEDESVIN (Olympus/Greek theme) =====

const GATES_BASE_STYLE = `
STYLE REQUIREMENTS (MANDATORY - MUST FOLLOW EXACTLY):
- Art style: High-quality digital painting, semi-realistic with stylized mythological elements
- Rendering: Smooth gradients, divine light effects, polished game art quality
- Color palette: Celestial blues, radiant golds, marble whites, and electric lightning accents
- Lighting: Dramatic golden-white divine rim lighting, with electric blue lightning flashes
- Detail level: High detail on the main subject, slightly softer background

BACKGROUND REQUIREMENTS (MANDATORY):
- Mount Olympus temple interior background
- Massive marble columns with Greek ionic/corinthian capitals
- Bright blue sky with divine golden clouds visible between columns
- Subtle lightning bolts crackling in the background
- Golden divine light flooding in from above
- Slightly blurred/depth-of-field background to make the symbol pop
- The background must fill the ENTIRE canvas edge-to-edge
- NO white borders, NO white edges, NO margins anywhere

FORMAT: Square 1:1 aspect ratio, suitable for a slot machine symbol.
`;

const GATES_PREMIUM_FRAME = `
FRAME/BORDER REQUIREMENTS (MANDATORY):
- Add an ornate GOLDEN Greek/Olympian-style frame/border around the ENTIRE image
- The frame MUST touch ALL FOUR EDGES of the image (no gaps at edges)
- Frame width: approximately 5-8% of the image on each side
- Frame design: Intricate golden border with Greek meander/key patterns
- Frame color: Radiant polished gold with subtle blue lightning energy accents
- Corner decorations: Small golden laurel wreath motifs with lightning bolt accents
- The frame should have depth and dimension (3D appearance)
- Inner edge of frame: subtle golden divine glow effect
- The artwork must extend FULLY to the inner edge of the frame (no gaps)
- CRITICAL: The outer edge of the frame must be FLUSH with the image boundary
`;

const GATES_SCATTER_FRAME = `
FRAME/BORDER REQUIREMENTS (MANDATORY):
- Add an ornate RED Olympian-style frame/border around the ENTIRE image
- The frame MUST touch ALL FOUR EDGES of the image (no gaps at edges)
- Frame width: approximately 5-8% of the image on each side
- Frame design: Intricate deep crimson border with Greek meander patterns carved into it
- Frame color: Rich crimson/ruby red with subtle golden trim on the edges
- Corner decorations: Small golden lightning bolt motifs with ruby red gems
- The frame should have depth and dimension (3D appearance)
- Inner edge of frame: subtle red glow effect with golden highlights
- The artwork must extend FULLY to the inner edge of the frame (no gaps)
- CRITICAL: The outer edge of the frame must be FLUSH with the image boundary
`;

// ===== GATES OF FEDESVIN PROMPTS =====

function getPromptForGatesSymbol(name: string, isScatter: boolean): string {
  const normalizedName = name.toLowerCase().trim();

  // Scatter symbol - the cat as Zeus
  if (isScatter || normalizedName.includes("fedesvin") || normalizedName.includes("zeus") || normalizedName.includes("scatter")) {
    return `Create a slot machine symbol for a Greek mythology/Olympus-themed game called "Gates of Fedesvin".

MAIN SUBJECT (MUST KEEP EXACTLY AS DESCRIBED):
- A CHUBBY/FAT gray and white cat (similar to British Shorthair) sitting comfortably
- The cat has green eyes and a sweet, slightly smug expression
- The cat wears a golden Greek laurel wreath crown on its head
- A decorative golden collar with blue sapphire gems around the cat's neck
- The cat is holding a glowing lightning bolt in one paw
- The cat is sitting ON TOP of a marble throne with golden Greek engravings
- Divine golden light and small lightning sparks emanating around the cat
- The cat looks powerful yet adorable, like a tiny Zeus

COMPOSITION:
- FULL ART: The cat and throne must fill the ENTIRE frame edge-to-edge
- Cat and throne centered as the main focus
- Golden divine light and lightning emanating from behind
- NO empty space - the artwork extends to all edges

${GATES_SCATTER_FRAME}

${GATES_BASE_STYLE}

This is a "Zeus" themed scatter/wild symbol for a Greek mythology slot game.`;
  }

  // Red Gem
  if (normalizedName.includes("red") && normalizedName.includes("gem") || normalizedName === "red gem") {
    return `Create a slot machine symbol for a Greek mythology/Olympus-themed game.

MAIN SUBJECT:
- A brilliant, large faceted RUBY gemstone as the central focus
- Rich, deep crimson red color with internal fire and brilliance
- Set in an ornate golden Greek-style setting with meander/key pattern border
- Tiny lightning energy crackling INSIDE the gem, visible through the facets
- The gem emits a warm red divine glow
- 3D appearance with realistic light refraction and sparkle

COMPOSITION:
- Gem centered and filling approximately 70% of the frame
- Golden setting framing the gem elegantly
- Red divine light radiating outward

${GATES_PREMIUM_FRAME}

${GATES_BASE_STYLE}`;
  }

  // Purple Gem
  if (normalizedName.includes("purple") && normalizedName.includes("gem") || normalizedName === "purple gem") {
    return `Create a slot machine symbol for a Greek mythology/Olympus-themed game.

MAIN SUBJECT:
- A brilliant, large faceted AMETHYST gemstone as the central focus
- Rich, deep royal purple color with divine inner glow
- Set in an ornate golden Greek-style setting with Greek key pattern border
- Subtle divine purple energy swirling inside the gem
- The gem emits an ethereal purple glow
- 3D appearance with realistic light refraction and sparkle

COMPOSITION:
- Gem centered and filling approximately 70% of the frame
- Golden setting framing the gem elegantly
- Purple divine light radiating outward

${GATES_PREMIUM_FRAME}

${GATES_BASE_STYLE}`;
  }

  // Green Gem
  if (normalizedName.includes("green") && normalizedName.includes("gem") || normalizedName === "green gem") {
    return `Create a slot machine symbol for a Greek mythology/Olympus-themed game.

MAIN SUBJECT:
- A brilliant, large faceted EMERALD gemstone as the central focus
- Rich, vibrant green color with celestial inner light
- Set in an ornate golden setting with olive branch motifs
- Subtle celestial green energy glowing inside the gem
- The gem emits an ethereal green glow
- 3D appearance with realistic light refraction and sparkle

COMPOSITION:
- Gem centered and filling approximately 70% of the frame
- Golden olive branch setting framing the gem elegantly
- Green celestial light radiating outward

${GATES_PREMIUM_FRAME}

${GATES_BASE_STYLE}`;
  }

  // Blue Gem
  if (normalizedName.includes("blue") && normalizedName.includes("gem") || normalizedName === "blue gem") {
    return `Create a slot machine symbol for a Greek mythology/Olympus-themed game.

MAIN SUBJECT:
- A brilliant, large faceted SAPPHIRE gemstone as the central focus
- Rich, deep electric blue color with lightning energy inside
- Set in an ornate golden setting with trident motif accents
- Electric blue lightning energy crackling inside the gem
- The gem emits a powerful blue electric glow
- 3D appearance with realistic light refraction and sparkle

COMPOSITION:
- Gem centered and filling approximately 70% of the frame
- Golden trident-motif setting framing the gem elegantly
- Blue electric light radiating outward

${GATES_PREMIUM_FRAME}

${GATES_BASE_STYLE}`;
  }

  // Gold Cup / Chalice
  if (normalizedName.includes("cup") || normalizedName.includes("kylix")) {
    return `Create a slot machine symbol for a Greek mythology/Olympus-themed game.

MAIN SUBJECT:
- An ornate golden Greek chalice/kylix (drinking cup) as the central focus
- Made of polished, radiant gold with a metallic sheen
- Greek meander/key pattern engraved around the rim
- Decorated with divine engravings of lightning bolts and laurel wreaths
- Small sapphire and ruby gems inlaid at key points
- Divine golden light emanating from within the cup
- 3D appearance with depth and dimension

COMPOSITION:
- Cup centered and filling approximately 70% of the frame
- Golden divine glow surrounding the cup

${GATES_PREMIUM_FRAME}

${GATES_BASE_STYLE}`;
  }

  // Gold Ring
  if (normalizedName.includes("ring")) {
    return `Create a slot machine symbol for a Greek mythology/Olympus-themed game.

MAIN SUBJECT:
- An ornate golden Greek-style signet ring as the central focus
- Made of polished, radiant gold with intricate craftsmanship
- Ring features a laurel wreath design carved into the face
- Subtle Greek key pattern engraved around the band
- Small lightning bolt motif accents
- Divine golden glow emanating from the ring
- 3D appearance with depth and dimension

COMPOSITION:
- Ring centered and filling approximately 70% of the frame
- Slight angle to show the face and band detail
- Golden divine light behind it

${GATES_PREMIUM_FRAME}

${GATES_BASE_STYLE}`;
  }

  // Hourglass
  if (normalizedName.includes("hourglass") || normalizedName.includes("timer")) {
    return `Create a slot machine symbol for a Greek mythology/Olympus-themed game.

MAIN SUBJECT:
- A golden hourglass as the central focus
- Frame made of polished gold with Greek meander pattern engravings
- Top and bottom caps are ornate marble with golden trim
- The sand inside is golden and celestial, glowing with divine light
- Tiny lightning sparks mixed with the falling sand
- Greek laurel decorations on the frame joints
- 3D appearance with depth and dimension

COMPOSITION:
- Hourglass centered and filling approximately 70% of the frame
- Golden celestial light emanating from the sand
- Divine glow surrounding the hourglass

${GATES_PREMIUM_FRAME}

${GATES_BASE_STYLE}`;
  }

  // Chalice / Amphora
  if (normalizedName.includes("chalice") || normalizedName.includes("amphora") || normalizedName.includes("goblet")) {
    return `Create a slot machine symbol for a Greek mythology/Olympus-themed game.

MAIN SUBJECT:
- A golden Greek amphora/goblet as the central focus
- Made of polished, radiant gold with elaborate craftsmanship
- Decorated with Zeus lightning bolt motifs engraved into the surface
- Handles shaped like golden serpents or eagles
- Greek meander pattern around the rim and base
- Small sapphire gems inlaid between the lightning motifs
- Divine golden light emanating from within
- 3D appearance with depth and dimension

COMPOSITION:
- Amphora centered and filling approximately 70% of the frame
- Golden divine glow surrounding the vessel

${GATES_PREMIUM_FRAME}

${GATES_BASE_STYLE}`;
  }

  // Default fallback - generic Olympus symbol
  return `Create a slot machine symbol for a Greek mythology/Olympus-themed game.

MAIN SUBJECT:
- A ${name} themed icon rendered in ancient Greek/Olympian style
- Made of or decorated with polished gold and marble
- Rich details with sapphire blue and lightning accents
- Greek meander and laurel decorative elements
- 3D appearance with depth and dimension

COMPOSITION:
- Subject centered and filling approximately 70% of the frame
- Should appear as a precious divine Greek artifact

${GATES_BASE_STYLE}`;
}

// ===== MAIN HANDLER =====

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ===== AUTH: Require admin =====
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: claimsData.claims.sub,
      _role: "admin",
    });

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    // ===== END AUTH =====

    const { symbolId } = await req.json();

    if (!symbolId) {
      return new Response(
        JSON.stringify({ error: "symbolId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating AI symbol for symbolId: ${symbolId}`);

    // Fetch symbol with game_id for theme routing
    const { data: symbol, error: fetchError } = await supabase
      .from("slot_symbols")
      .select("name, is_scatter, game_id")
      .eq("id", symbolId)
      .single();

    if (fetchError || !symbol) {
      console.error("Failed to fetch symbol:", fetchError);
      return new Response(
        JSON.stringify({ error: "Symbol not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating symbol for: ${symbol.name} (is_scatter: ${symbol.is_scatter}, game_id: ${symbol.game_id})`);

    // Route to correct prompt set based on game_id
    let prompt: string;
    if (symbol.game_id === "rise-of-fedesvin") {
      prompt = getPromptForRiseSymbol(symbol.name, symbol.is_scatter);
    } else if (symbol.game_id === "gates-of-fedesvin") {
      prompt = getPromptForGatesSymbol(symbol.name, symbol.is_scatter);
    } else {
      prompt = getPromptForSymbol(symbol.name, symbol.is_scatter);
    }

    const themeLabel = symbol.game_id === "rise-of-fedesvin" ? "Rise of Fedesvin"
      : symbol.game_id === "gates-of-fedesvin" ? "Gates of Fedesvin"
      : "Book of Fedesvin";
    console.log(`Using ${themeLabel} prompt for: ${symbol.name}`);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      const errorText = await aiResponse.text();
      console.error(`AI API error: ${status} - ${errorText}`);

      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI generation failed: ${status}`);
    }

    const aiData = await aiResponse.json();
    console.log("AI response received");

    const imageData = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageData) {
      throw new Error("No image generated by AI");
    }

    const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) {
      throw new Error("Invalid image format from AI");
    }

    const imageFormat = base64Match[1];
    const base64Content = base64Match[2];

    const binaryString = atob(base64Content);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const timestamp = Date.now();
    const filename = `ai-generated-${symbolId}-${timestamp}.${imageFormat}`;

    console.log(`Uploading to storage: ${filename}`);

    const { error: uploadError } = await supabase.storage
      .from("slot-symbols")
      .upload(filename, bytes, {
        contentType: `image/${imageFormat}`,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from("slot-symbols")
      .getPublicUrl(filename);

    const imageUrl = urlData.publicUrl;
    console.log(`Image uploaded successfully: ${imageUrl}`);

    const { error: updateError } = await supabase
      .from("slot_symbols")
      .update({ image_url: imageUrl })
      .eq("id", symbolId);

    if (updateError) {
      console.error("Database update error:", updateError);
      throw new Error(`Failed to update symbol: ${updateError.message}`);
    }

    console.log(`Symbol ${symbolId} updated with new image URL`);

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl,
        symbolId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating symbol:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
