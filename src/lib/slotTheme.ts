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
  
  // Auto-spin popover
  autoSpinBtnBg: string;
  autoSpinBtnBorder: string;
  autoSpinBtnText: string;
  autoSpinBtnHoverBg: string;
  autoSpinBtnHoverText: string;
  autoSpinPopoverBg: string;
  autoSpinPopoverBorder: string;
  autoSpinCountActiveBg: string;
  autoSpinCountActiveBorder: string;
  autoSpinCountActiveText: string;
  autoSpinCountBg: string;
  autoSpinCountBorder: string;
  autoSpinCountText: string;
  autoSpinCountHoverBg: string;
  autoSpinCountHoverText: string;
  autoSpinStartBg: string;
  autoSpinStartHoverBg: string;
  autoSpinStartBorder: string;
  autoSpinLabelText: string;
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
  
  autoSpinBtnBg: "bg-amber-800/40",
  autoSpinBtnBorder: "border-amber-500/30",
  autoSpinBtnText: "text-amber-300",
  autoSpinBtnHoverBg: "hover:bg-amber-700/50",
  autoSpinBtnHoverText: "hover:text-amber-200",
  autoSpinPopoverBg: "bg-amber-950/95",
  autoSpinPopoverBorder: "border-amber-500/30",
  autoSpinCountActiveBg: "bg-amber-500/30",
  autoSpinCountActiveBorder: "border-amber-400/50",
  autoSpinCountActiveText: "text-amber-200",
  autoSpinCountBg: "bg-amber-900/40",
  autoSpinCountBorder: "border-amber-500/20",
  autoSpinCountText: "text-amber-400/70",
  autoSpinCountHoverBg: "hover:bg-amber-800/40",
  autoSpinCountHoverText: "hover:text-amber-300",
  autoSpinStartBg: "bg-amber-600/80",
  autoSpinStartHoverBg: "hover:bg-amber-500/80",
  autoSpinStartBorder: "border-amber-400/30",
  autoSpinLabelText: "text-amber-300",
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
  
  autoSpinBtnBg: "bg-purple-800/40",
  autoSpinBtnBorder: "border-purple-500/30",
  autoSpinBtnText: "text-purple-300",
  autoSpinBtnHoverBg: "hover:bg-purple-700/50",
  autoSpinBtnHoverText: "hover:text-purple-200",
  autoSpinPopoverBg: "bg-purple-950/95",
  autoSpinPopoverBorder: "border-purple-500/30",
  autoSpinCountActiveBg: "bg-purple-500/30",
  autoSpinCountActiveBorder: "border-purple-400/50",
  autoSpinCountActiveText: "text-purple-200",
  autoSpinCountBg: "bg-purple-900/40",
  autoSpinCountBorder: "border-purple-500/20",
  autoSpinCountText: "text-purple-400/70",
  autoSpinCountHoverBg: "hover:bg-purple-800/40",
  autoSpinCountHoverText: "hover:text-purple-300",
  autoSpinStartBg: "bg-purple-600/80",
  autoSpinStartHoverBg: "hover:bg-purple-500/80",
  autoSpinStartBorder: "border-purple-400/30",
  autoSpinLabelText: "text-purple-300",
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
  
  autoSpinBtnBg: "bg-blue-800/40",
  autoSpinBtnBorder: "border-blue-500/30",
  autoSpinBtnText: "text-blue-300",
  autoSpinBtnHoverBg: "hover:bg-blue-700/50",
  autoSpinBtnHoverText: "hover:text-blue-200",
  autoSpinPopoverBg: "bg-blue-950/95",
  autoSpinPopoverBorder: "border-blue-500/30",
  autoSpinCountActiveBg: "bg-blue-500/30",
  autoSpinCountActiveBorder: "border-blue-400/50",
  autoSpinCountActiveText: "text-blue-200",
  autoSpinCountBg: "bg-blue-900/40",
  autoSpinCountBorder: "border-blue-500/20",
  autoSpinCountText: "text-blue-400/70",
  autoSpinCountHoverBg: "hover:bg-blue-800/40",
  autoSpinCountHoverText: "hover:text-blue-300",
  autoSpinStartBg: "bg-blue-600/80",
  autoSpinStartHoverBg: "hover:bg-blue-500/80",
  autoSpinStartBorder: "border-blue-400/30",
  autoSpinLabelText: "text-blue-300",
};

const bonanzaTheme: SlotTheme = {
  accent: "text-pink-400",
  accentLight: "text-pink-300",
  accentDark: "text-pink-500",
  accentMuted: "text-pink-500/70",
  bgAccent: "bg-pink-500/20",
  bgAccentStrong: "bg-pink-500/30",
  borderAccent: "border-pink-500/30",
  borderAccentStrong: "border-pink-600/50",
  panelFrom: "from-pink-950/90",
  panelVia: "via-pink-900/70",
  panelTo: "to-pink-950/90",
  btnFrom: "from-pink-800/60",
  btnVia: "",
  btnTo: "to-pink-950/60",
  btnHoverFrom: "hover:from-pink-700/70",
  btnHoverTo: "hover:to-pink-900/70",
  spinBtnGradient: "bg-[radial-gradient(ellipse_at_30%_20%,_hsl(330,80%,70%)_0%,_hsl(325,75%,56%)_25%,_hsl(320,70%,45%)_50%,_hsl(315,65%,35%)_75%,_hsl(310,60%,25%)_100%)]",
  spinBtnBorder: "border-pink-400/80",
  spinBtnShadow: "shadow-[inset_0_2px_4px_rgba(255,182,220,0.6),inset_0_-3px_6px_rgba(120,20,60,0.4),0_0_25px_rgba(236,72,153,0.5),0_6px_20px_rgba(0,0,0,0.5)]",
  spinBtnShadowMd: "md:shadow-[inset_0_3px_6px_rgba(255,182,220,0.6),inset_0_-4px_8px_rgba(120,20,60,0.4),0_0_35px_rgba(236,72,153,0.6),0_8px_25px_rgba(0,0,0,0.5)]",
  spinBtnHoverShadow: "hover:shadow-[inset_0_2px_4px_rgba(255,182,220,0.8),inset_0_-3px_6px_rgba(120,20,60,0.3),0_0_50px_rgba(236,72,153,0.8),0_8px_30px_rgba(0,0,0,0.5)] hover:border-pink-300",
  spinBtnActiveShadow: "active:shadow-[inset_0_4px_12px_rgba(80,10,40,0.5),0_0_20px_rgba(236,72,153,0.4)]",
  spinBtnText: "text-pink-950",
  spinBtnTextShadow: "[text-shadow:0_1px_0_rgba(255,182,220,0.8),0_-1px_0_rgba(120,20,60,0.3)]",
  spinBtnRingBorder: "border-t-pink-200/90 border-r-pink-400/50",
  spinBtnIconColor: "text-pink-900",
  dropShadowGlow: "drop-shadow-[0_0_4px_rgba(236,72,153,0.5)]",
  dropShadowGlowStrong: "drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]",
  winBarShadow: "shadow-[inset_0_1px_0_rgba(236,72,153,0.3),0_0_20px_rgba(236,72,153,0.3),0_4px_12px_rgba(0,0,0,0.4)]",
  winBarGlowShadow: "shadow-[inset_0_1px_0_rgba(236,72,153,0.4),0_0_30px_rgba(236,72,153,0.5),0_4px_12px_rgba(0,0,0,0.4)]",
  dialogBg: "bg-gradient-to-b from-pink-950 via-pink-900/95 to-pink-950",
  dialogBorder: "border-2 border-pink-600/50",
  dialogShadow: "shadow-[0_0_40px_rgba(236,72,153,0.3),0_8px_32px_rgba(0,0,0,0.5)]",
  frameDropShadow: `drop-shadow(0 0 20px rgba(0,0,0,0.6)) 
                     drop-shadow(0 0 40px rgba(0,0,0,0.4)) 
                     drop-shadow(0 0 80px rgba(0,0,0,0.3))
                     drop-shadow(0 4px 30px rgba(236,72,153,0.15))`,
  frameBorderColor: "border-pink-400",
  leaderboardCardBorder: "border-pink-500/30",
  leaderboardCardBg: "bg-gradient-to-b from-pink-950/95 via-black/90 to-pink-950/95",
  leaderboardHeaderBorder: "border-pink-500/10",
  leaderboardTitleText: "text-pink-100",
  leaderboardIconBg: "bg-pink-500/20",
  leaderboardIconColor: "text-pink-500",
  leaderboardTopRowBg: "bg-gradient-to-r from-pink-500/10 to-transparent",
  leaderboardUserRing: "ring-pink-500/50",
  leaderboardUserBg: "bg-pink-500/10",
  leaderboardUserBadgeBorder: "border-pink-500/50",
  leaderboardUserBadgeText: "text-pink-400",
  leaderboardUserBadgeBg: "bg-pink-500/10",
  leaderboardNameText: "text-pink-100",
  leaderboardPointsText: "text-pink-500",
  leaderboardSpinsText: "text-pink-100",
  leaderboardShowAllText: "text-pink-500",
  leaderboardShowAllHoverText: "hover:text-pink-400",
  leaderboardShowAllHoverBg: "hover:bg-pink-500/10",
  leaderboardShowAllBorder: "border-pink-500/30",
  leaderboardEmptyIconColor: "text-pink-500/50",
  leaderboardEmptyText: "text-pink-100/80",
  leaderboardEmptySubtext: "text-pink-100/60",
  leaderboardDialogBg: "bg-gradient-to-b from-pink-950/98 via-black/95 to-pink-950/98",
  leaderboardDialogBorder: "border-pink-500/30",
  leaderboardDialogTitleText: "text-pink-100",
  leaderboardTabsBg: "bg-pink-950/50",
  leaderboardTabActive: "data-[state=active]:bg-pink-500/20",
  leaderboardTabActiveText: "data-[state=active]:text-pink-100",
  leaderboardSearchBg: "bg-pink-950/50",
  leaderboardSearchBorder: "border-pink-500/20",
  leaderboardSearchText: "text-pink-100",
  leaderboardSearchPlaceholder: "placeholder:text-pink-100/40",
  leaderboardSearchRing: "focus-visible:ring-pink-500/30",
  leaderboardSeparator: "bg-pink-500/20",
  leaderboardGlowShadow: "shadow-[0_0_30px_rgba(236,72,153,0.1)]",
  autoSpinBtnBg: "bg-pink-800/40",
  autoSpinBtnBorder: "border-pink-500/30",
  autoSpinBtnText: "text-pink-300",
  autoSpinBtnHoverBg: "hover:bg-pink-700/50",
  autoSpinBtnHoverText: "hover:text-pink-200",
  autoSpinPopoverBg: "bg-pink-950/95",
  autoSpinPopoverBorder: "border-pink-500/30",
  autoSpinCountActiveBg: "bg-pink-500/30",
  autoSpinCountActiveBorder: "border-pink-400/50",
  autoSpinCountActiveText: "text-pink-200",
  autoSpinCountBg: "bg-pink-900/40",
  autoSpinCountBorder: "border-pink-500/20",
  autoSpinCountText: "text-pink-400/70",
  autoSpinCountHoverBg: "hover:bg-pink-800/40",
  autoSpinCountHoverText: "hover:text-pink-300",
  autoSpinStartBg: "bg-pink-600/80",
  autoSpinStartHoverBg: "hover:bg-pink-500/80",
  autoSpinStartBorder: "border-pink-400/30",
  autoSpinLabelText: "text-pink-300",
};

const themes: Record<string, SlotTheme> = {
  "book-of-fedesvin": egyptianTheme,
  "rise-of-fedesvin": wizardTheme,
  "gates-of-fedesvin": olympusTheme,
  "fedesvin-bonanza": bonanzaTheme,
};

export function getSlotTheme(gameId: string = "book-of-fedesvin"): SlotTheme {
  return themes[gameId] || egyptianTheme;
}
