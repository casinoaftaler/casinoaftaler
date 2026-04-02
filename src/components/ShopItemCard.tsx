import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronDown, ChevronUp } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import type { ShopItem } from "@/hooks/useShopItems";

interface ShopItemCardProps {
  item: ShopItem;
}

export function ShopItemCard({ item }: ShopItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBuyClick = () => {
    if (item.external_url) {
      window.open(item.external_url, "_blank", "noopener,noreferrer");
    }
  };

  const shouldShowReadMore = item.description && item.description.length > 80;

  return (
    <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <AspectRatio ratio={16 / 9}>
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            width={400}
            height={225}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50">
            <MenuIcon iconName="shopping-cart" className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </AspectRatio>
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
        {item.description && (
          <div className="space-y-1">
            <p className={`text-sm text-muted-foreground ${!isExpanded && shouldShowReadMore ? 'line-clamp-2' : ''}`}>
              {item.description}
            </p>
            {shouldShowReadMore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-0.5 transition-colors"
              >
                {isExpanded ? (
                  <>
                    Vis mindre <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Læs mere <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>
            )}
          </div>
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
