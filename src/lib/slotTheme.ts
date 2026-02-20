/**
 * Game-specific color themes for slot machines.
 * Each theme maps semantic color roles to Tailwind classes.
 */

export interface SlotTheme {
  // Primary accent colors (text)
  accent: string;         // e.g. "text-amber-400" or "text-purple-400"
  accentLight: string;    // e.g. "text-amber-300"
  accentDark: string;     // e.g. "text-amber-500"
  accentMuted: string;    // e.g. "text-amber-500/70"
  
  // Background accent colors
  bgAccent: string;       // e.g. "bg-amber-500/20"
  bgAccentStrong: string; // e.g. "bg-amber-500/30"
  
  // Border colors
  borderAccent: string;   // e.g. "border-amber-500/30"
  borderAccentStrong: string; // e.g. "border-amber-600/50"
  
  // Gradient from/to for panels
  panelFrom: string;      // e.g. "from-amber-950/90"
  panelVia: string;       // e.g. "via-amber-900/70"
  panelTo: string;        // e.g. "to-amber-950/90"
  
  // Button gradient classes
  btnFrom: string;
  btnVia: string;
  btnTo: string;
  btnHoverFrom: string;
  btnHoverTo: string;
  
  // Spin button - radial gradient CSS value
  spinBtnGradient: string;
  spinBtnBorder: string;
  spinBtnShadow: string;
  spinBtnShadowMd: string;
  spinBtnHoverShadow: string;
  spinBtnActiveShadow: string;
  spinBtnText: string;
  spinBtnTextShadow: string;
  spinBtnRingBorder: string;
  spinBtnIconColor: string;
  
  // Drop shadow for glow effects
  dropShadowGlow: string;
  dropShadowGlowStrong: string;
  
  // Win bar shadow (CSS value)
  winBarShadow: string;
  winBarGlowShadow: string;
  
  // Dialog background
  dialogBg: string;
  dialogBorder: string;
  dialogShadow: string;
  
  // Frame drop shadow filter (CSS)
  frameDropShadow: string;
  
  // Fallback corner border color
  frameBorderColor: string;
  
  // Leaderboard colors
  leaderboardCardBorder: string;
  leaderboardCardBg: string;
  leaderboardHeaderBorder: string;
  leaderboardTitleText: string;
  leaderboardIconBg: string;
  leaderboardIconColor: string;
  leaderboardTopRowBg: string;
  leaderboardUserRing: string;
  leaderboardUserBg: string;
  leaderboardUserBadgeBorder: string;
  leaderboardUserBadgeText: string;
  leaderboardUserBadgeBg: string;
  leaderboardNameText: string;
  leaderboardPointsText: string;
  leaderboardSpinsText: string;
  leaderboardShowAllText: string;
  leaderboardShowAllHoverText: string;
  leaderboardShowAllHoverBg: string;
  leaderboardShowAllBorder: string;
  leaderboardEmptyIconColor: string;
  leaderboardEmptyText: string;
  leaderboardEmptySubtext: string;
  leaderboardDialogBg: string;
  leaderboardDialogBorder: string;
  leaderboardDialogTitleText: string;
  leaderboardTabsBg: string;
  leaderboardTabActive: string;
  leaderboardTabActiveText: string;
  leaderboardSearchBg: string;
  leaderboardSearchBorder: string;
  leaderboardSearchText: string;
  leaderboardSearchPlaceholder: string;
  leaderboardSearchRing: string;
  leaderboardSeparator: string;
  leaderboardGlowShadow: string;
}

const egyptianTheme: SlotTheme = {
  accent: "text-amber-400",
  accentLight: "text-amber-300",
  accentDark: "text-amber-500",
  accentMuted: "text-amber-500/70",
  
  bgAccent: "bg-amber-500/20",
  bgAccentStrong: "bg-amber-500/30",
  
  borderAccent: "border-amber-500/30",
  borderAccentStrong: "border-amber-600/50",
  
  panelFrom: "from-amber-950/90",
  panelVia: "via-amber-900/70",
  panelTo: "to-amber-950/90",
  
  btnFrom: "from-amber-800/60",
  btnVia: "",
  btnTo: "to-amber-950/60",
  btnHoverFrom: "hover:from-amber-700/70",
  btnHoverTo: "hover:to-amber-900/70",
  
  spinBtnGradient: "bg-[radial-gradient(ellipse_at_30%_20%,_hsl(45,100%,70%)_0%,_hsl(43,96%,56%)_25%,_hsl(38,92%,45%)_50%,_hsl(30,85%,35%)_75%,_hsl(25,80%,25%)_100%)]",
  spinBtnBorder: "border-amber-400/80",
  spinBtnShadow: "shadow-[inset_0_2px_4px_rgba(255,230,150,0.6),inset_0_-3px_6px_rgba(120,80,20,0.4),0_0_25px_rgba(251,191,36,0.5),0_6px_20px_rgba(0,0,0,0.5)]",
  spinBtnShadowMd: "md:shadow-[inset_0_3px_6px_rgba(255,230,150,0.6),inset_0_-4px_8px_rgba(120,80,20,0.4),0_0_35px_rgba(251,191,36,0.6),0_8px_25px_rgba(0,0,0,0.5)]",
  spinBtnHoverShadow: "hover:shadow-[inset_0_2px_4px_rgba(255,230,150,0.8),inset_0_-3px_6px_rgba(120,80,20,0.3),0_0_50px_rgba(251,191,36,0.8),0_8px_30px_rgba(0,0,0,0.5)] hover:border-amber-300",
  spinBtnActiveShadow: "active:shadow-[inset_0_4px_12px_rgba(80,50,10,0.5),0_0_20px_rgba(251,191,36,0.4)]",
  spinBtnText: "text-amber-950",
  spinBtnTextShadow: "[text-shadow:0_1px_0_rgba(255,230,150,0.8),0_-1px_0_rgba(120,80,20,0.3)]",
  spinBtnRingBorder: "border-t-amber-200/90 border-r-amber-400/50",
  spinBtnIconColor: "text-amber-900",
  
  dropShadowGlow: "drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]",
  dropShadowGlowStrong: "drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]",
  
  winBarShadow: "shadow-[inset_0_1px_0_rgba(251,191,36,0.3),0_0_20px_rgba(251,191,36,0.3),0_4px_12px_rgba(0,0,0,0.4)]",
  winBarGlowShadow: "shadow-[inset_0_1px_0_rgba(251,191,36,0.4),0_0_30px_rgba(251,191,36,0.5),0_4px_12px_rgba(0,0,0,0.4)]",
  
  dialogBg: "bg-gradient-to-b from-amber-950 via-amber-900/95 to-amber-950",
  dialogBorder: "border-2 border-amber-600/50",
  dialogShadow: "shadow-[0_0_40px_rgba(251,191,36,0.3),0_8px_32px_rgba(0,0,0,0.5)]",
  
  frameDropShadow: `drop-shadow(0 0 20px rgba(0,0,0,0.6)) 
                     drop-shadow(0 0 40px rgba(0,0,0,0.4)) 
                     drop-shadow(0 0 80px rgba(0,0,0,0.3))
                     drop-shadow(0 4px 30px rgba(251,191,36,0.15))`,
  
  frameBorderColor: "border-amber-400",
  
  leaderboardCardBorder: "border-amber-500/30",
  leaderboardCardBg: "bg-gradient-to-b from-amber-950/95 via-black/90 to-amber-950/95",
  leaderboardHeaderBorder: "border-amber-500/10",
  leaderboardTitleText: "text-amber-100",
  leaderboardIconBg: "bg-amber-500/20",
  leaderboardIconColor: "text-amber-500",
  leaderboardTopRowBg: "bg-gradient-to-r from-amber-500/10 to-transparent",
  leaderboardUserRing: "ring-amber-500/50",
  leaderboardUserBg: "bg-amber-500/10",
  leaderboardUserBadgeBorder: "border-amber-500/50",
  leaderboardUserBadgeText: "text-amber-400",
  leaderboardUserBadgeBg: "bg-amber-500/10",
  leaderboardNameText: "text-amber-100",
  leaderboardPointsText: "text-amber-500",
  leaderboardSpinsText: "text-amber-100",
  leaderboardShowAllText: "text-amber-500",
  leaderboardShowAllHoverText: "hover:text-amber-400",
  leaderboardShowAllHoverBg: "hover:bg-amber-500/10",
  leaderboardShowAllBorder: "border-amber-500/30",
  leaderboardEmptyIconColor: "text-amber-500/50",
  leaderboardEmptyText: "text-amber-100/80",
  leaderboardEmptySubtext: "text-amber-100/60",
  leaderboardDialogBg: "bg-gradient-to-b from-amber-950/98 via-black/95 to-amber-950/98",
  leaderboardDialogBorder: "border-amber-500/30",
  leaderboardDialogTitleText: "text-amber-100",
  leaderboardTabsBg: "bg-amber-950/50",
  leaderboardTabActive: "data-[state=active]:bg-amber-500/20",
  leaderboardTabActiveText: "data-[state=active]:text-amber-100",
  leaderboardSearchBg: "bg-amber-950/50",
  leaderboardSearchBorder: "border-amber-500/20",
  leaderboardSearchText: "text-amber-100",
  leaderboardSearchPlaceholder: "placeholder:text-amber-100/40",
  leaderboardSearchRing: "focus-visible:ring-amber-500/30",
  leaderboardSeparator: "bg-amber-500/20",
  leaderboardGlowShadow: "shadow-[0_0_30px_rgba(251,191,36,0.1)]",
};

const wizardTheme: SlotTheme = {
  accent: "text-purple-400",
  accentLight: "text-purple-300",
  accentDark: "text-purple-500",
  accentMuted: "text-purple-500/70",
  
  bgAccent: "bg-purple-500/20",
  bgAccentStrong: "bg-purple-500/30",
  
  borderAccent: "border-purple-500/30",
  borderAccentStrong: "border-purple-600/50",
  
  panelFrom: "from-purple-950/90",
  panelVia: "via-purple-900/70",
  panelTo: "to-purple-950/90",
  
  btnFrom: "from-purple-800/60",
  btnVia: "",
  btnTo: "to-purple-950/60",
  btnHoverFrom: "hover:from-purple-700/70",
  btnHoverTo: "hover:to-purple-900/70",
  
  spinBtnGradient: "bg-[radial-gradient(ellipse_at_30%_20%,_hsl(270,80%,70%)_0%,_hsl(265,75%,56%)_25%,_hsl(260,70%,45%)_50%,_hsl(255,65%,35%)_75%,_hsl(250,60%,25%)_100%)]",
  spinBtnBorder: "border-purple-400/80",
  spinBtnShadow: "shadow-[inset_0_2px_4px_rgba(200,170,255,0.6),inset_0_-3px_6px_rgba(60,20,120,0.4),0_0_25px_rgba(168,85,247,0.5),0_6px_20px_rgba(0,0,0,0.5)]",
  spinBtnShadowMd: "md:shadow-[inset_0_3px_6px_rgba(200,170,255,0.6),inset_0_-4px_8px_rgba(60,20,120,0.4),0_0_35px_rgba(168,85,247,0.6),0_8px_25px_rgba(0,0,0,0.5)]",
  spinBtnHoverShadow: "hover:shadow-[inset_0_2px_4px_rgba(200,170,255,0.8),inset_0_-3px_6px_rgba(60,20,120,0.3),0_0_50px_rgba(168,85,247,0.8),0_8px_30px_rgba(0,0,0,0.5)] hover:border-purple-300",
  spinBtnActiveShadow: "active:shadow-[inset_0_4px_12px_rgba(40,10,80,0.5),0_0_20px_rgba(168,85,247,0.4)]",
  spinBtnText: "text-purple-950",
  spinBtnTextShadow: "[text-shadow:0_1px_0_rgba(200,170,255,0.8),0_-1px_0_rgba(60,20,120,0.3)]",
  spinBtnRingBorder: "border-t-purple-200/90 border-r-purple-400/50",
  spinBtnIconColor: "text-purple-900",
  
  dropShadowGlow: "drop-shadow-[0_0_4px_rgba(168,85,247,0.5)]",
  dropShadowGlowStrong: "drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]",
  
  winBarShadow: "shadow-[inset_0_1px_0_rgba(168,85,247,0.3),0_0_20px_rgba(168,85,247,0.3),0_4px_12px_rgba(0,0,0,0.4)]",
  winBarGlowShadow: "shadow-[inset_0_1px_0_rgba(168,85,247,0.4),0_0_30px_rgba(168,85,247,0.5),0_4px_12px_rgba(0,0,0,0.4)]",
  
  dialogBg: "bg-gradient-to-b from-purple-950 via-purple-900/95 to-purple-950",
  dialogBorder: "border-2 border-purple-600/50",
  dialogShadow: "shadow-[0_0_40px_rgba(168,85,247,0.3),0_8px_32px_rgba(0,0,0,0.5)]",
  
  frameDropShadow: `drop-shadow(0 0 20px rgba(0,0,0,0.6)) 
                     drop-shadow(0 0 40px rgba(0,0,0,0.4)) 
                     drop-shadow(0 0 80px rgba(0,0,0,0.3))
                     drop-shadow(0 4px 30px rgba(168,85,247,0.15))`,
  
  frameBorderColor: "border-purple-400",
  
  leaderboardCardBorder: "border-purple-500/30",
  leaderboardCardBg: "bg-gradient-to-b from-purple-950/95 via-black/90 to-purple-950/95",
  leaderboardHeaderBorder: "border-purple-500/10",
  leaderboardTitleText: "text-purple-100",
  leaderboardIconBg: "bg-purple-500/20",
  leaderboardIconColor: "text-purple-500",
  leaderboardTopRowBg: "bg-gradient-to-r from-purple-500/10 to-transparent",
  leaderboardUserRing: "ring-purple-500/50",
  leaderboardUserBg: "bg-purple-500/10",
  leaderboardUserBadgeBorder: "border-purple-500/50",
  leaderboardUserBadgeText: "text-purple-400",
  leaderboardUserBadgeBg: "bg-purple-500/10",
  leaderboardNameText: "text-purple-100",
  leaderboardPointsText: "text-purple-500",
  leaderboardSpinsText: "text-purple-100",
  leaderboardShowAllText: "text-purple-500",
  leaderboardShowAllHoverText: "hover:text-purple-400",
  leaderboardShowAllHoverBg: "hover:bg-purple-500/10",
  leaderboardShowAllBorder: "border-purple-500/30",
  leaderboardEmptyIconColor: "text-purple-500/50",
  leaderboardEmptyText: "text-purple-100/80",
  leaderboardEmptySubtext: "text-purple-100/60",
  leaderboardDialogBg: "bg-gradient-to-b from-purple-950/98 via-black/95 to-purple-950/98",
  leaderboardDialogBorder: "border-purple-500/30",
  leaderboardDialogTitleText: "text-purple-100",
  leaderboardTabsBg: "bg-purple-950/50",
  leaderboardTabActive: "data-[state=active]:bg-purple-500/20",
  leaderboardTabActiveText: "data-[state=active]:text-purple-100",
  leaderboardSearchBg: "bg-purple-950/50",
  leaderboardSearchBorder: "border-purple-500/20",
  leaderboardSearchText: "text-purple-100",
  leaderboardSearchPlaceholder: "placeholder:text-purple-100/40",
  leaderboardSearchRing: "focus-visible:ring-purple-500/30",
  leaderboardSeparator: "bg-purple-500/20",
  leaderboardGlowShadow: "shadow-[0_0_30px_rgba(168,85,247,0.1)]",
};

const olympusTheme: SlotTheme = {
  accent: "text-blue-400",
  accentLight: "text-blue-300",
  accentDark: "text-blue-500",
  accentMuted: "text-blue-500/70",
  
  bgAccent: "bg-blue-500/20",
  bgAccentStrong: "bg-blue-500/30",
  
  borderAccent: "border-blue-500/30",
  borderAccentStrong: "border-blue-600/50",
  
  panelFrom: "from-blue-950/90",
  panelVia: "via-blue-900/70",
  panelTo: "to-blue-950/90",
  
  btnFrom: "from-blue-800/60",
  btnVia: "",
  btnTo: "to-blue-950/60",
  btnHoverFrom: "hover:from-blue-700/70",
  btnHoverTo: "hover:to-blue-900/70",
  
  spinBtnGradient: "bg-[radial-gradient(ellipse_at_30%_20%,_hsl(210,80%,70%)_0%,_hsl(215,75%,56%)_25%,_hsl(220,70%,45%)_50%,_hsl(225,65%,35%)_75%,_hsl(230,60%,25%)_100%)]",
  spinBtnBorder: "border-blue-400/80",
  spinBtnShadow: "shadow-[inset_0_2px_4px_rgba(170,200,255,0.6),inset_0_-3px_6px_rgba(20,60,120,0.4),0_0_25px_rgba(59,130,246,0.5),0_6px_20px_rgba(0,0,0,0.5)]",
  spinBtnShadowMd: "md:shadow-[inset_0_3px_6px_rgba(170,200,255,0.6),inset_0_-4px_8px_rgba(20,60,120,0.4),0_0_35px_rgba(59,130,246,0.6),0_8px_25px_rgba(0,0,0,0.5)]",
  spinBtnHoverShadow: "hover:shadow-[inset_0_2px_4px_rgba(170,200,255,0.8),inset_0_-3px_6px_rgba(20,60,120,0.3),0_0_50px_rgba(59,130,246,0.8),0_8px_30px_rgba(0,0,0,0.5)] hover:border-blue-300",
  spinBtnActiveShadow: "active:shadow-[inset_0_4px_12px_rgba(10,40,80,0.5),0_0_20px_rgba(59,130,246,0.4)]",
  spinBtnText: "text-blue-950",
  spinBtnTextShadow: "[text-shadow:0_1px_0_rgba(170,200,255,0.8),0_-1px_0_rgba(20,60,120,0.3)]",
  spinBtnRingBorder: "border-t-blue-200/90 border-r-blue-400/50",
  spinBtnIconColor: "text-blue-900",
  
  dropShadowGlow: "drop-shadow-[0_0_4px_rgba(59,130,246,0.5)]",
  dropShadowGlowStrong: "drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]",
  
  winBarShadow: "shadow-[inset_0_1px_0_rgba(59,130,246,0.3),0_0_20px_rgba(59,130,246,0.3),0_4px_12px_rgba(0,0,0,0.4)]",
  winBarGlowShadow: "shadow-[inset_0_1px_0_rgba(59,130,246,0.4),0_0_30px_rgba(59,130,246,0.5),0_4px_12px_rgba(0,0,0,0.4)]",
  
  dialogBg: "bg-gradient-to-b from-blue-950 via-blue-900/95 to-blue-950",
  dialogBorder: "border-2 border-blue-600/50",
  dialogShadow: "shadow-[0_0_40px_rgba(59,130,246,0.3),0_8px_32px_rgba(0,0,0,0.5)]",
  
  frameDropShadow: `drop-shadow(0 0 20px rgba(0,0,0,0.6)) 
                     drop-shadow(0 0 40px rgba(0,0,0,0.4)) 
                     drop-shadow(0 0 80px rgba(0,0,0,0.3))
                     drop-shadow(0 4px 30px rgba(59,130,246,0.15))`,
  
  frameBorderColor: "border-blue-400",
  
  leaderboardCardBorder: "border-blue-500/30",
  leaderboardCardBg: "bg-gradient-to-b from-blue-950/95 via-black/90 to-blue-950/95",
  leaderboardHeaderBorder: "border-blue-500/10",
  leaderboardTitleText: "text-blue-100",
  leaderboardIconBg: "bg-blue-500/20",
  leaderboardIconColor: "text-blue-500",
  leaderboardTopRowBg: "bg-gradient-to-r from-blue-500/10 to-transparent",
  leaderboardUserRing: "ring-blue-500/50",
  leaderboardUserBg: "bg-blue-500/10",
  leaderboardUserBadgeBorder: "border-blue-500/50",
  leaderboardUserBadgeText: "text-blue-400",
  leaderboardUserBadgeBg: "bg-blue-500/10",
  leaderboardNameText: "text-blue-100",
  leaderboardPointsText: "text-blue-500",
  leaderboardSpinsText: "text-blue-100",
  leaderboardShowAllText: "text-blue-500",
  leaderboardShowAllHoverText: "hover:text-blue-400",
  leaderboardShowAllHoverBg: "hover:bg-blue-500/10",
  leaderboardShowAllBorder: "border-blue-500/30",
  leaderboardEmptyIconColor: "text-blue-500/50",
  leaderboardEmptyText: "text-blue-100/80",
  leaderboardEmptySubtext: "text-blue-100/60",
  leaderboardDialogBg: "bg-gradient-to-b from-blue-950/98 via-black/95 to-blue-950/98",
  leaderboardDialogBorder: "border-blue-500/30",
  leaderboardDialogTitleText: "text-blue-100",
  leaderboardTabsBg: "bg-blue-950/50",
  leaderboardTabActive: "data-[state=active]:bg-blue-500/20",
  leaderboardTabActiveText: "data-[state=active]:text-blue-100",
  leaderboardSearchBg: "bg-blue-950/50",
  leaderboardSearchBorder: "border-blue-500/20",
  leaderboardSearchText: "text-blue-100",
  leaderboardSearchPlaceholder: "placeholder:text-blue-100/40",
  leaderboardSearchRing: "focus-visible:ring-blue-500/30",
  leaderboardSeparator: "bg-blue-500/20",
  leaderboardGlowShadow: "shadow-[0_0_30px_rgba(59,130,246,0.1)]",
};

const themes: Record<string, SlotTheme> = {
  "book-of-fedesvin": egyptianTheme,
  "rise-of-fedesvin": wizardTheme,
  "gates-of-fedesvin": olympusTheme,
};

export function getSlotTheme(gameId: string = "book-of-fedesvin"): SlotTheme {
  return themes[gameId] || egyptianTheme;
}
