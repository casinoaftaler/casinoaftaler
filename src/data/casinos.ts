export interface Casino {
  id: string;
  name: string;
  slug: string;
  rating: number;
  bonusTitle: string;
  bonusAmount: string;
  bonusType: string;
  wageringRequirements: string;
  validity: string;
  minDeposit: string;
  payoutTime: string;
  features: string[];
  pros: string[];
  cons: string[];
  description: string;
}

export const casinos: Casino[] = [
  {
    id: "1",
    name: "Royal Casino",
    slug: "royal-casino",
    rating: 4.8,
    bonusTitle: "Welcome Bonus",
    bonusAmount: "100% up to $1,000",
    bonusType: "No-sticky",
    wageringRequirements: "35x",
    validity: "30 days",
    minDeposit: "$20",
    payoutTime: "24 hours",
    features: ["Live betting", "Popular slots", "Mobile friendly"],
    pros: ["Fast withdrawals", "Great game selection", "24/7 support"],
    cons: ["High wagering requirements", "Limited payment options"],
    description: "Royal Casino offers an exceptional gaming experience with over 2,000 games from top providers. Their no-sticky bonus means you can withdraw your real money at any time without affecting the bonus."
  },
  {
    id: "2",
    name: "Lucky Star Casino",
    slug: "lucky-star-casino",
    rating: 4.6,
    bonusTitle: "First Deposit Bonus",
    bonusAmount: "200% up to $500",
    bonusType: "Sticky",
    wageringRequirements: "40x",
    validity: "14 days",
    minDeposit: "$10",
    payoutTime: "48 hours",
    features: ["Free spins", "VIP program", "Crypto accepted"],
    pros: ["Low minimum deposit", "Generous bonus", "VIP rewards"],
    cons: ["Sticky bonus terms", "Slower payouts"],
    description: "Lucky Star Casino brings the excitement with a massive 200% welcome bonus. Perfect for players who love slot games and want to maximize their playing time with bonus funds."
  },
  {
    id: "3",
    name: "Diamond Club",
    slug: "diamond-club",
    rating: 4.9,
    bonusTitle: "Exclusive Bonus",
    bonusAmount: "150% up to $750 + 100 Free Spins",
    bonusType: "No-sticky",
    wageringRequirements: "30x",
    validity: "21 days",
    minDeposit: "$25",
    payoutTime: "12 hours",
    features: ["Fast payout", "Live dealers", "Table games"],
    pros: ["Fastest payouts", "Low wagering", "Free spins included"],
    cons: ["Higher minimum deposit", "Limited countries"],
    description: "Diamond Club is the premium choice for serious players. With industry-leading payout speeds and a no-sticky bonus structure, your winnings are always accessible."
  },
  {
    id: "4",
    name: "Golden Tiger",
    slug: "golden-tiger",
    rating: 4.5,
    bonusTitle: "Welcome Package",
    bonusAmount: "$1,500 Welcome Package",
    bonusType: "Split bonus",
    wageringRequirements: "50x",
    validity: "7 days",
    minDeposit: "$15",
    payoutTime: "72 hours",
    features: ["Progressive jackpots", "Mobile app", "Weekly promotions"],
    pros: ["Huge bonus package", "Many promotions", "Good mobile app"],
    cons: ["Short validity period", "High wagering"],
    description: "Golden Tiger offers one of the largest welcome packages in the industry. Spread across your first four deposits, this bonus gives you plenty of opportunities to explore their extensive game library."
  }
];
