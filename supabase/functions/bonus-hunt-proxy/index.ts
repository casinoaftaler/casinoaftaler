import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const STREAMSYSTEM_BASE = "https://www.streamsystem.bet/api/bonushunt/data";
const STREAMER_ID = "959262659";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const huntId = url.searchParams.get("huntId");
    const fromArchive = url.searchParams.get("archive") === "true";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // If requesting a specific past hunt, try archive first
    if (huntId && fromArchive) {
      const { data: archived } = await supabase
        .from("bonus_hunt_archives")
        .select("api_data")
        .eq("hunt_number", parseInt(huntId))
        .maybeSingle();

      if (archived?.api_data) {
        return new Response(JSON.stringify(archived.api_data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
        });
      }
    }

    // Fetch from StreamSystem API
    const apiUrl = huntId
      ? `${STREAMSYSTEM_BASE}/${STREAMER_ID}?visibleId=${huntId}`
      : `${STREAMSYSTEM_BASE}/${STREAMER_ID}`;

    const response = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      // If API fails for a past hunt, try archive as fallback
      if (huntId) {
        const { data: archived } = await supabase
          .from("bonus_hunt_archives")
          .select("api_data")
          .eq("hunt_number", parseInt(huntId))
          .maybeSingle();

        if (archived?.api_data) {
          return new Response(JSON.stringify(archived.api_data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      return new Response(
        JSON.stringify({ error: `StreamSystem API returned ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    // Archive the hunt data (upsert by hunt_number)
    if (data?.data?.name) {
      const huntData = data.data;
      const huntNumber = parseInt(huntData.name.replace(/\D/g, ''), 10) || 0;

      if (huntNumber > 0) {
        const stats = huntData.statistics || {};
        await supabase
          .from("bonus_hunt_archives")
          .upsert({
            hunt_number: huntNumber,
            api_data: data,
            hunt_name: huntData.name,
            hunt_status: huntData.played ? 'completed' : 'active',
            total_slots: stats.numberOfSlots || 0,
            opened_slots: stats.openedSlots || 0,
            start_balance: huntData.start || 0,
            end_balance: huntData.end || null,
            average_x: stats.runAverage ? parseFloat(stats.runAverage) : null,
          }, { onConflict: 'hunt_number' });
      }
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
