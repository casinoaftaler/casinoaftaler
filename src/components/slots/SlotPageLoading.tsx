interface SlotPageLoadingProps {
  theme?: "default" | "bonanza";
}

export function SlotPageLoading({ theme = "default" }: SlotPageLoadingProps) {
  const isBonanza = theme === "bonanza";

  return (
    <div className={`min-h-[calc(100vh-4rem)] flex items-center justify-center ${
      isBonanza
        ? "bg-gradient-to-b from-pink-950 via-fuchsia-950 to-purple-950"
        : "bg-gradient-to-b from-amber-950 via-stone-950 to-black"
    }`}>
      <div className="flex flex-col items-center gap-4">
        <div className={`animate-spin h-12 w-12 border-4 rounded-full border-t-transparent ${
          isBonanza ? "border-pink-500" : "border-amber-500"
        }`} />
        <p className={`text-lg ${isBonanza ? "text-pink-400/80" : "text-amber-500/80"}`}>
          Indlæser spillemaskine...
        </p>
      </div>
    </div>
  );
}
