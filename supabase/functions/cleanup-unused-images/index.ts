import { createClient } from "npm:@supabase/supabase-js@^2.87.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BucketFile {
  name: string;
  bucket: string;
}

interface UnusedFile {
  bucket: string;
  fileName: string;
  publicUrl: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Missing environment variables");
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Validate caller auth
    const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Missing/invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Ikke autoriseret" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!anonKey) {
      return new Response(
        JSON.stringify({ error: "Server konfiguration mangler" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Verify JWT and get user id
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) {
      console.log("JWT claims verification failed", claimsError);
      return new Response(
        JSON.stringify({ error: "Ikke autoriseret" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const requesterUserId = claimsData.claims.sub;

    // Check if user is admin
    const { data: isAdmin, error: roleError } = await supabaseAdmin
      .rpc("has_role", { _user_id: requesterUserId, _role: "admin" });

    if (roleError || !isAdmin) {
      console.log("Role check failed:", { roleError, isAdmin, requesterUserId });
      return new Response(
        JSON.stringify({ error: "Kun administratorer kan rydde op i billeder" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get request body
    const { dryRun = true } = await req.json().catch(() => ({ dryRun: true }));

    console.log(`Starting cleanup with dryRun: ${dryRun}`);

    // Define buckets to check
    const buckets = ["casino-logos", "shop-item-images", "slot-symbols", "slot-frames"];

    // List all files in each bucket
    const allFiles: BucketFile[] = [];
    for (const bucket of buckets) {
      const { data: files, error } = await supabaseAdmin.storage
        .from(bucket)
        .list("", { limit: 1000 });

      if (error) {
        console.error(`Error listing bucket ${bucket}:`, error);
        continue;
      }

      if (files) {
        for (const file of files) {
          // Skip folders (they have no id)
          if (file.id) {
            allFiles.push({ name: file.name, bucket });
          }
        }
      }
    }

    console.log(`Found ${allFiles.length} total files in storage`);

    // Get all used image URLs from database
    const usedFileNames = new Set<string>();

    // 1. Site settings – check ALL values that look like storage URLs
    //    This ensures game-specific assets (rise_of_fedesvin_*, etc.) are never deleted.
    const { data: siteSettings } = await supabaseAdmin
      .from("site_settings")
      .select("key, value");

    if (siteSettings) {
      for (const setting of siteSettings) {
        if (setting.value && setting.value.includes("/storage/v1/object/public/")) {
          const fileName = extractFileName(setting.value);
          if (fileName) usedFileNames.add(fileName);
        }
      }
    }

    // 2. Casino logos
    const { data: casinos } = await supabaseAdmin
      .from("casinos")
      .select("logo_url");

    if (casinos) {
      for (const casino of casinos) {
        if (casino.logo_url) {
          const fileName = extractFileName(casino.logo_url);
          if (fileName) usedFileNames.add(fileName);
        }
      }
    }

    // 3. Shop item images
    const { data: shopItems } = await supabaseAdmin
      .from("shop_items")
      .select("image_url");

    if (shopItems) {
      for (const item of shopItems) {
        if (item.image_url) {
          const fileName = extractFileName(item.image_url);
          if (fileName) usedFileNames.add(fileName);
        }
      }
    }

    // 4. Slot symbol images
    const { data: slotSymbols } = await supabaseAdmin
      .from("slot_symbols")
      .select("image_url");

    if (slotSymbols) {
      for (const symbol of slotSymbols) {
        if (symbol.image_url) {
          const fileName = extractFileName(symbol.image_url);
          if (fileName) usedFileNames.add(fileName);
        }
      }
    }

    console.log(`Found ${usedFileNames.size} files referenced in database`);

    // Find unused files
    const unusedFiles: UnusedFile[] = [];
    for (const file of allFiles) {
      if (!usedFileNames.has(file.name)) {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/${file.bucket}/${file.name}`;
        unusedFiles.push({
          bucket: file.bucket,
          fileName: file.name,
          publicUrl,
        });
      }
    }

    console.log(`Found ${unusedFiles.length} unused files`);

    // Delete unused files if not dry run
    const deletedFiles: UnusedFile[] = [];
    if (!dryRun && unusedFiles.length > 0) {
      // Group files by bucket for batch deletion
      const filesByBucket: Record<string, string[]> = {};
      for (const file of unusedFiles) {
        if (!filesByBucket[file.bucket]) {
          filesByBucket[file.bucket] = [];
        }
        filesByBucket[file.bucket].push(file.fileName);
      }

      // Delete files from each bucket
      for (const [bucket, fileNames] of Object.entries(filesByBucket)) {
        console.log(`Deleting ${fileNames.length} files from bucket ${bucket}`);
        const { error } = await supabaseAdmin.storage
          .from(bucket)
          .remove(fileNames);

        if (error) {
          console.error(`Error deleting files from ${bucket}:`, error);
        } else {
          deletedFiles.push(...unusedFiles.filter(f => f.bucket === bucket));
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        dryRun,
        totalFilesInStorage: allFiles.length,
        totalReferencedFiles: usedFileNames.size,
        unusedFilesCount: unusedFiles.length,
        unusedFiles: unusedFiles,
        deletedCount: deletedFiles.length,
        deletedFiles: dryRun ? [] : deletedFiles,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in cleanup-unused-images function:", error);
    const message = error instanceof Error ? error.message : "En uventet fejl opstod";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Extract file name from a Supabase storage URL
function extractFileName(url: string): string | null {
  if (!url) return null;
  try {
    // URL format: .../storage/v1/object/public/bucket-name/filename.ext
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    // Remove query string if present
    return fileName.split("?")[0];
  } catch {
    return null;
  }
}
