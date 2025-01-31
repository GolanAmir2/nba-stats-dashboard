export type GameStats = {
  date: string;
  points: number;
  opponent: string;
  isHome: boolean;
};

export type TooltipData = {
  x: number;
  y: number;
  data: GameStats;
} | null; 