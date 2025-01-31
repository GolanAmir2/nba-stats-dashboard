'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type GameStats = {
  date: string;
  points: number;
  assists: number;
  rebounds: number;
  plusMinus: number;
  opponent: string;
  isHome: boolean;
};

type StatsContextType = {
  gameData: GameStats[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedStat: string;
  setSelectedStat: (stat: string) => void;
  isLoading: boolean;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [gameData, setGameData] = useState<GameStats[]>([]);
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [selectedStat, setSelectedStat] = useState('points');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Deni's player ID is hardcoded
        const response = await fetch(`/api/stats?playerId=1630166&season=${selectedYear}`);
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setGameData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [selectedYear]);

  return (
    <StatsContext.Provider 
      value={{ 
        gameData, 
        selectedYear, 
        setSelectedYear, 
        selectedStat,
        setSelectedStat,
        isLoading 
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
} 