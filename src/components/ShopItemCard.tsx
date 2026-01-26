import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart } from "lucide-react";
import type { ShopItem } from "@/hooks/useShopItems";

interface ShopItemCardProps {
  item: ShopItem;
}

export function ShopItemCard({ item }: ShopItemCardProps) {
  const handleBuyClick = () => {
    if (item.external_url) {
      window.open(item.external_url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card className="overflow-hidden border-primary/50 bg-card hover:border-primary transition-colors">
      <AspectRatio ratio={16 / 9}>
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </AspectRatio>
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="font-bold text-foreground uppercase">PRIS: </span>
            <span className="text-primary font-semibold">{item.price}</span>
          </div>
          <div>
            <span className="font-bold text-foreground uppercase">LAGER: </span>
            <span className="text-muted-foreground">{item.stock}</span>
          </div>
        </div>
        <Button
          onClick={handleBuyClick}
          className="w-full rounded-full"
          disabled={!item.external_url}
        >
          KØB
        </Button>
      </CardContent>
    </Card>
  );
}
