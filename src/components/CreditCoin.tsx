import coinImage from "@/assets/fedesvin-credit-coin.webp";
import { cn } from "@/lib/utils";

const SIZES = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" } as const;

interface CreditCoinProps {
  size?: keyof typeof SIZES;
  className?: string;
}

export function CreditCoin({ size = "md", className }: CreditCoinProps) {
  return <img src={coinImage} alt="Credit coin" className={cn(SIZES[size], "inline-block align-middle", className)} />;
}
