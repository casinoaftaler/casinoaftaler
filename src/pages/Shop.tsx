import { useShopItems } from "@/hooks/useShopItems";
import { ShopItemCard } from "@/components/ShopItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react";

export default function Shop() {
  const { data: items, isLoading, error } = useShopItems(false);

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Butik</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Her kan du shoppe eksklusive varer, men der er en lille twist – alt her kan kun købes med point, som du optjener ved at se vores streams på Twitch! Det betyder, at jo mere du ser, desto flere point tjener du, og desto flere fede produkter kan du få fat i. Så det er bare at sætte dig godt til rette, nyde vores streams, og se pointene rulle ind. Gå på opdagelse i vores udvalg og start din rejse mod de unikke præmier i dag!
        </p>
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
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Butik</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Her kan du shoppe eksklusive varer, men der er en lille twist – alt her kan kun købes med point, som du optjener ved at se vores streams på Twitch! Det betyder, at jo mere du ser, desto flere point tjener du, og desto flere fede produkter kan du få fat i. Så det er bare at sætte dig godt til rette, nyde vores streams, og se pointene rulle ind. Gå på opdagelse i vores udvalg og start din rejse mod de unikke præmier i dag!
        </p>
        <p className="text-destructive">Der opstod en fejl ved indlæsning af produkter.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Butik</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Her kan du shoppe eksklusive varer, men der er en lille twist – alt her kan kun købes med point, som du optjener ved at se vores streams på Twitch! Det betyder, at jo mere du ser, desto flere point tjener du, og desto flere fede produkter kan du få fat i. Så det er bare at sætte dig godt til rette, nyde vores streams, og se pointene rulle ind. Gå på opdagelse i vores udvalg og start din rejse mod de unikke præmier i dag!
      </p>
      
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
  );
}
