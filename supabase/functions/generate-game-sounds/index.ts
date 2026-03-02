import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Sound definitions with prompts and durations per game theme
type SoundDef = { prompt: string; duration: number; settingSuffix: string };

const GATES_SOUNDS: Record<string, SoundDef> = {
  spinSound: {
    prompt: "Ancient Greek temple wind whoosh with ethereal clouds swirling, divine energy building, short mystical gust sound effect",
    duration: 1.5,
    settingSuffix: "spin",
  },
  stopSound: {
    prompt: "Heavy marble column slam impact with deep reverberating echo in a Greek temple, solid stone landing thud",
    duration: 1,
    settingSuffix: "stop",
  },
  smallWinSound: {
    prompt: "Gentle golden coins dropping on marble floor with soft angelic harp notes, light celestial chime, pleasant small reward",
    duration: 2,
    settingSuffix: "small_win",
  },
  mediumWinSound: {
    prompt: "Triumphant Greek lyre melody with cascading gold coins, celestial choir accent, medium intensity divine reward fanfare",
    duration: 3,
    settingSuffix: "medium_win",
  },
  bigWinSound: {
    prompt: "Epic Zeus thunderbolt strike with massive golden explosion, triumphant orchestral brass fanfare, heavenly choir celebration, cascading coins and lightning crackle, godly power unleashed",
    duration: 5,
    settingSuffix: "big_win",
  },
  bonusTriggerSound: {
    prompt: "Dramatic thunder rumble building to powerful Zeus lightning bolt strike, divine portal opening with celestial energy surge, epic ancient Greek god power activation",
    duration: 4,
    settingSuffix: "bonus_trigger",
  },
  bonusWinSound: {
    prompt: "Majestic Mount Olympus celebration with triumphant horns, golden harps, angelic choir crescendo, massive coin shower, divine victory anthem",
    duration: 5,
    settingSuffix: "bonus_win",
  },
  scatterSound1: {
    prompt: "Single dramatic thunder crack with divine energy pulse, Zeus lightning bolt charging, mystical ancient Greek power surge",
    duration: 1.5,
    settingSuffix: "scatter_1",
  },
  scatterSound2: {
    prompt: "Intensifying double thunder rumble with electric crackle, divine power building stronger, ancient temple energy resonating",
    duration: 2,
    settingSuffix: "scatter_2",
  },
  scatterSound3: {
    prompt: "Ultimate triple lightning strike with massive thunder explosion, divine choir burst, Zeus power at maximum, epic celestial climax",
    duration: 2.5,
    settingSuffix: "scatter_3",
  },
  scatterCelebrationSound: {
    prompt: "Grand Mount Olympus gates opening with divine light burst, celestial trumpets and heavenly choir, golden energy cascade, free spins victory celebration",
    duration: 4,
    settingSuffix: "scatter_celebration",
  },
};

const BONANZA_SOUNDS: Record<string, SoundDef> = {
  spinSound: {
    prompt: "Bubbly candy whoosh with sugar crystals swirling, fizzy soda pop carbonation rush, sweet whimsical gust sound effect",
    duration: 1.5,
    settingSuffix: "spin",
  },
  stopSound: {
    prompt: "Gummy candy bounce landing with soft squish impact, jellybean drop on glass surface, satisfying candy plop",
    duration: 1,
    settingSuffix: "stop",
  },
  smallWinSound: {
    prompt: "Sweet candy chimes with sugar sprinkle tinkle, gentle xylophone notes, light bubblegum pop, pleasant small candy reward jingle",
    duration: 2,
    settingSuffix: "small_win",
  },
  mediumWinSound: {
    prompt: "Joyful candy pop melody with bubblegum burst fanfare, cascading sugar crystals, cheerful gummy bounce rhythm, medium candy celebration",
    duration: 3,
    settingSuffix: "medium_win",
  },
  bigWinSound: {
    prompt: "Massive candy explosion with lollipop fireworks, gummy bear celebration parade, sugar rush crescendo, rainbow sprinkle cascade, epic cotton candy symphony",
    duration: 5,
    settingSuffix: "big_win",
  },
  bonusTriggerSound: {
    prompt: "Candy factory power-up with swirling lollipops accelerating, bubblegum bubble growing to massive burst, sugar energy surge building to climax",
    duration: 4,
    settingSuffix: "bonus_trigger",
  },
  bonusWinSound: {
    prompt: "Epic candy kingdom celebration with sugar symphony orchestra, gummy bear fanfare, rainbow sprinkle cascade, massive lollipop fireworks finale",
    duration: 5,
    settingSuffix: "bonus_win",
  },
  scatterSound1: {
    prompt: "Single candy wrapper crinkle unwrap with sweet sparkle chime, bubblegum stretch and soft pop",
    duration: 1.5,
    settingSuffix: "scatter_1",
  },
  scatterSound2: {
    prompt: "Intensifying candy crinkle cascade with fizzy soda bubbles, multiple bubblegum pops building energy, sugar crystals rattling",
    duration: 2,
    settingSuffix: "scatter_2",
  },
  scatterSound3: {
    prompt: "Ultimate candy explosion burst with massive bubblegum pop, sugar firework crackle, rainbow sprinkle shower climax, sweet maximum power",
    duration: 2.5,
    settingSuffix: "scatter_3",
  },
  scatterCelebrationSound: {
    prompt: "Grand candy land gates opening with rainbow sugar burst, whimsical music box fanfare, cotton candy cloud explosion, sweet kingdom free spins celebration",
    duration: 4,
    settingSuffix: "scatter_celebration",
  },
  symbolHighlightSound: {
    prompt: "Sparkling sugar crystal shimmer with gentle candy chime accent, sweet glowing highlight twinkle, magical candy dust sprinkle",
    duration: 1,
    settingSuffix: "symbol_highlight",
  },
  symbolExplodeSound: {
    prompt: "Candy shattering burst with colorful sugar crystal explosion, bubblegum pop splatter, sweet confetti scatter impact, satisfying candy crunch break",
    duration: 1.5,
    settingSuffix: "symbol_explode",
  },
  bombFizzSound: {
    prompt: "Fizzing candy fuse sizzle with sparkling sugar crackle building intensity, effervescent soda pop carbonation hiss, sweet bomb countdown sparkle",
    duration: 2,
    settingSuffix: "bomb_fizz",
  },
  bonusEndSound: {
    prompt: "Cheerful candy music box winding down with final sugar chime, sweet lollipop twirl slowdown, gentle gummy bear farewell jingle, candy kingdom closing melody",
    duration: 3,
    settingSuffix: "bonus_end",
  },
  scatterLandSound: {
    prompt: "Single heavy gummy bear landing with sweet candy impact thud, magical sugar sparkle burst on contact, lollipop stick striking candy glass",
    duration: 1,
    settingSuffix: "scatter_land",
  },
};

const GAME_SOUND_MAPS: Record<string, Record<string, SoundDef>> = {
  "gates-of-olympus": GATES_SOUNDS,
  "fedesvin-bonanza": BONANZA_SOUNDS,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth: require admin
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

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: isAdmin } = await adminClient.rpc("has_role", {
      _user_id: claimsData.claims.sub,
      _role: "admin",
    });

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { gameId, soundType } = await req.json();

    if (!gameId || !soundType) {
      return new Response(
        JSON.stringify({ error: "gameId and soundType are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const soundMap = GAME_SOUND_MAPS[gameId] || GATES_SOUNDS;
    const soundDef = soundMap[soundType];
    if (!soundDef) {
      return new Response(
        JSON.stringify({ error: `Unknown soundType: ${soundType}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ElevenLabs API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating ${soundType} for ${gameId}: "${soundDef.prompt}" (${soundDef.duration}s)`);

    // 1. Generate audio via ElevenLabs
    const elResponse = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: soundDef.prompt,
        duration_seconds: soundDef.duration,
        prompt_influence: 0.3,
      }),
    });

    if (!elResponse.ok) {
      const errText = await elResponse.text();
      console.error(`ElevenLabs error: ${elResponse.status} - ${errText}`);
      return new Response(
        JSON.stringify({ error: `ElevenLabs error: ${elResponse.status}`, details: errText }),
        { status: elResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const audioBuffer = await elResponse.arrayBuffer();
    console.log(`Generated ${audioBuffer.byteLength} bytes for ${soundType}`);

    // 2. Upload to storage
    const timestamp = Date.now();
    const filename = `generated-${gameId}-${soundType}-${timestamp}.mp3`;

    const { error: uploadError } = await adminClient.storage
      .from("slot-sounds")
      .upload(filename, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: `Storage upload failed: ${uploadError.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Get public URL
    const { data: urlData } = adminClient.storage.from("slot-sounds").getPublicUrl(filename);
    const publicUrl = urlData?.publicUrl;

    if (!publicUrl) {
      return new Response(
        JSON.stringify({ error: "Could not get public URL" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Save to site_settings with game-specific key
    const prefix = `${gameId.replace(/-/g, "_")}_sound_file_`;
    const settingKey = `${prefix}${soundDef.settingSuffix}`;

    const { error: settingsError } = await adminClient
      .from("site_settings")
      .upsert(
        { key: settingKey, value: publicUrl },
        { onConflict: "key" }
      );

    if (settingsError) {
      console.error("Settings error:", settingsError);
      return new Response(
        JSON.stringify({ error: `Settings save failed: ${settingsError.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Saved ${soundType} → ${settingKey} = ${publicUrl}`);

    // Return base64 for preview
    const base64Audio = base64Encode(audioBuffer);

    return new Response(
      JSON.stringify({
        success: true,
        soundType,
        settingKey,
        publicUrl,
        audioContent: base64Audio,
        size: audioBuffer.byteLength,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
