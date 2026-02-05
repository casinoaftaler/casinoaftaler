export function SlotPageLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-amber-950 via-stone-950 to-black">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin h-12 w-12 border-4 border-amber-500 border-t-transparent rounded-full" />
        <p className="text-amber-500/80 text-lg">Indlæser spillemaskine...</p>
      </div>
    </div>
  );
}
