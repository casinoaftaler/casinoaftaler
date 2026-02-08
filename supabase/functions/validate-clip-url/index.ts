const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface ValidationResult {
  valid: boolean;
  error?: string;
  originalUrl: string;
  resolvedUrl: string | null;
  platform: 'twitch' | 'youtube' | 'unknown';
  clipId: string | null;
  metadata: {
    title?: string;
    thumbnailUrl?: string;
    durationSeconds?: number;
    requiresManualReview: boolean;
    validationNotes?: string;
  };
}

// Follow redirects to get final URL
async function resolveUrl(url: string): Promise<string> {
  try {
    // Use HEAD request first to follow redirects without downloading content
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    return response.url;
  } catch {
    // If HEAD fails, try GET
    try {
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      return response.url;
    } catch {
      return url; // Return original if all fails
    }
  }
}

// Detect platform from resolved URL
function detectPlatform(url: string): 'twitch' | 'youtube' | 'unknown' {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('twitch.tv') || lowerUrl.includes('clips.twitch.tv')) {
    return 'twitch';
  }
  
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
    return 'youtube';
  }
  
  return 'unknown';
}

// Extract Twitch clip ID
function extractTwitchClipId(url: string): string | null {
  // clips.twitch.tv/ClipName format
  const clipsMatch = url.match(/clips\.twitch\.tv\/([^?/]+)/);
  if (clipsMatch) return clipsMatch[1];
  
  // twitch.tv/channel/clip/ClipName format
  const clipMatch = url.match(/twitch\.tv\/[^/]+\/clip\/([^?/]+)/);
  if (clipMatch) return clipMatch[1];
  
  return null;
}

// Extract YouTube video ID
function extractYouTubeId(url: string): string | null {
  // youtu.be/ID format
  const shortMatch = url.match(/youtu\.be\/([^?/]+)/);
  if (shortMatch) return shortMatch[1];
  
  // youtube.com/watch?v=ID format
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  
  // youtube.com/embed/ID format
  const embedMatch = url.match(/youtube\.com\/embed\/([^?/]+)/);
  if (embedMatch) return embedMatch[1];
  
  // youtube.com/shorts/ID format
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?/]+)/);
  if (shortsMatch) return shortsMatch[1];
  
  return null;
}

// Fetch YouTube video metadata using oEmbed
async function fetchYouTubeMetadata(videoId: string): Promise<{ title?: string; thumbnailUrl?: string; durationSeconds?: number }> {
  try {
    // Use oEmbed for basic metadata
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oembedUrl);
    
    if (!response.ok) {
      return {};
    }
    
    const data = await response.json();
    
    return {
      title: data.title,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      // YouTube oEmbed doesn't provide duration, so we can't validate it without API key
      durationSeconds: undefined,
    };
  } catch {
    return {};
  }
}

// Fetch Twitch clip metadata
async function fetchTwitchClipMetadata(clipId: string): Promise<{ title?: string; thumbnailUrl?: string; durationSeconds?: number }> {
  const clientId = Deno.env.get('TWITCH_CLIENT_ID');
  const clientSecret = Deno.env.get('TWITCH_CLIENT_SECRET');
  
  if (!clientId || !clientSecret) {
    console.log('Twitch credentials not configured, skipping metadata fetch');
    return {};
  }
  
  try {
    // Get access token
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    });
    
    if (!tokenResponse.ok) {
      console.error('Failed to get Twitch token');
      return {};
    }
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    // Fetch clip data
    const clipResponse = await fetch(`https://api.twitch.tv/helix/clips?id=${clipId}`, {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!clipResponse.ok) {
      console.error('Failed to fetch clip data');
      return {};
    }
    
    const clipData = await clipResponse.json();
    const clip = clipData.data?.[0];
    
    if (!clip) {
      return {};
    }
    
    return {
      title: clip.title,
      thumbnailUrl: clip.thumbnail_url,
      durationSeconds: clip.duration ? Math.round(clip.duration) : undefined,
    };
  } catch (error) {
    console.error('Error fetching Twitch metadata:', error);
    return {};
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      // Return 200 with validation failure so client can read the message
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'URL is required',
          originalUrl: url || '',
          resolvedUrl: null,
          platform: 'unknown',
          clipId: null,
          metadata: { requiresManualReview: false },
        } as ValidationResult),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const originalUrl = url.trim();
    
    // Basic URL format validation
    let parsedUrl: URL;
    try {
      // Add protocol if missing
      const urlToValidate = originalUrl.startsWith('http') ? originalUrl : `https://${originalUrl}`;
      parsedUrl = new URL(urlToValidate);
    } catch {
      // Return 200 with validation failure so client can read the message
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Invalid URL format',
          originalUrl,
          resolvedUrl: null,
          platform: 'unknown',
          clipId: null,
          metadata: { requiresManualReview: false },
        } as ValidationResult),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Resolving URL:', parsedUrl.href);
    
    // Resolve redirects
    const resolvedUrl = await resolveUrl(parsedUrl.href);
    console.log('Resolved URL:', resolvedUrl);
    
    // Detect platform from resolved URL
    const platform = detectPlatform(resolvedUrl);
    
    // If platform is unknown, accept but mark for manual review
    if (platform === 'unknown') {
      console.log('Platform could not be determined, marking for manual review');
      
      const result: ValidationResult = {
        valid: true, // Accept the submission
        originalUrl,
        resolvedUrl,
        platform: 'unknown',
        clipId: null,
        metadata: {
          requiresManualReview: true,
          validationNotes: 'Platform kunne ikke bekræftes automatisk. URL-opløsning returnerede ikke et genkendt Twitch eller YouTube link.',
        },
      };

      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract clip/video ID
    let clipId: string | null = null;
    let metadata: { title?: string; thumbnailUrl?: string; durationSeconds?: number } = {};
    
    if (platform === 'twitch') {
      clipId = extractTwitchClipId(resolvedUrl);
      if (clipId) {
        metadata = await fetchTwitchClipMetadata(clipId);
      }
    } else if (platform === 'youtube') {
      clipId = extractYouTubeId(resolvedUrl);
      if (clipId) {
        metadata = await fetchYouTubeMetadata(clipId);
      }
    }

    // Check duration (max 2 minutes = 120 seconds)
    const maxDuration = 120;
    let requiresManualReview = false;
    
    if (metadata.durationSeconds !== undefined) {
      if (metadata.durationSeconds > maxDuration) {
        // Return 200 with validation failure so client can read the message
        return new Response(
          JSON.stringify({ 
            valid: false, 
            error: `Clip er for lang (${Math.round(metadata.durationSeconds)}s). Maksimalt tilladt er 2 minutter.`,
            originalUrl,
            resolvedUrl,
            platform,
            clipId,
            metadata: { ...metadata, requiresManualReview: false },
          } as ValidationResult),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Duration couldn't be determined - mark for manual review
      requiresManualReview = true;
      console.log('Duration could not be determined, marking for manual review');
    }

    // Build validation notes
    let validationNotes: string | undefined;
    if (requiresManualReview) {
      validationNotes = 'Varighed kunne ikke verificeres automatisk.';
    }

    const result: ValidationResult = {
      valid: true,
      originalUrl,
      resolvedUrl,
      platform,
      clipId,
      metadata: {
        title: metadata.title,
        thumbnailUrl: metadata.thumbnailUrl,
        durationSeconds: metadata.durationSeconds,
        requiresManualReview,
        validationNotes,
      },
    };

    console.log('Validation successful:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error validating clip URL:', error);
    return new Response(
      JSON.stringify({ 
        valid: false, 
        error: 'Failed to validate URL',
        originalUrl: '',
        resolvedUrl: null,
        platform: 'unknown',
        clipId: null,
        metadata: { requiresManualReview: false },
      } as ValidationResult),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
