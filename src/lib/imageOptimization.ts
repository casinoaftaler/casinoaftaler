/**
 * Optimize Supabase Storage image URLs by using the render/image endpoint.
 * This serves resized, optimized images instead of full-size originals.
 *
 * @param url - Original Supabase storage URL
 * @param width - Desired width in pixels
 * @param quality - Image quality (1-100), default 75
 * @returns Optimized URL or original URL if not a Supabase storage URL
 */
export function optimizeStorageImage(
  url: string | null | undefined,
  width: number,
  quality: number = 75
): string | null | undefined {
  if (!url) return url;

  // Only transform Supabase storage URLs
  if (!url.includes('/storage/v1/object/public/')) return url;

  return url.replace(
    '/storage/v1/object/public/',
    '/storage/v1/render/image/public/'
  ) + `?width=${width}&quality=${quality}&resize=contain`;
}
