/**
 * Download symbol images as individual files.
 * Works for both regular symbols and multiplier orbs.
 */
export async function downloadSymbolImages(
  symbols: { name: string; imageUrl: string }[]
) {
  for (const sym of symbols) {
    try {
      const response = await fetch(sym.imageUrl);
      const blob = await response.blob();
      const ext = sym.imageUrl.match(/\.(png|jpg|jpeg|webp|gif)/i)?.[1] || "png";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${sym.name.replace(/[^a-zA-Z0-9_-]/g, "_")}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      // Small delay between downloads to avoid browser blocking
      await new Promise((r) => setTimeout(r, 200));
    } catch (e) {
      console.error(`Failed to download ${sym.name}:`, e);
    }
  }
}
