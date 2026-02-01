import { useShopItems } from "@/hooks/useShopItems";
import { ShopItemCard } from "@/components/ShopItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react";

const description = "Her kan du shoppe eksklusive varer, men der er en lille twist – alt her kan kun købes med point, som du optjener ved at se vores streams på Twitch! Det betyder, at jo mere du ser, desto flere point tjener du, og desto flere fede produkter kan du få fat i. Så det er bare at sætte dig godt til rette, nyde vores streams, og se pointene rulle ind. Gå på opdagelse i vores udvalg og start din rejse mod de unikke præmier i dag!";

function ShopHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[hsl(210_80%_60%)] blur-xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[hsl(260_70%_60%)] blur-xl" />
      </div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center text-white">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-white/10 p-4">
              <ShoppingBag className="h-12 w-12" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Butik</h1>
          <p className="text-lg text-white/80">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Shop() {
  const { data: items, isLoading, error } = useShopItems(false);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <ShopHero />
        <div className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <ShopHero />
        <div className="py-16">
          <div className="container">
            <p className="text-destructive">Der opstod en fejl ved indlæsning af produkter.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ShopHero />
      <div className="py-16">
        <div className="container">
          {items && items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ShopItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <ShoppingBag className="h-16 w-16 mb-4" />
              <p className="text-lg">Der er ingen produkter i butikken endnu.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
