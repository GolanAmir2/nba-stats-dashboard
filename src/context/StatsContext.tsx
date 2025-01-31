'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type StatType = 'points' | 'assists' | 'rebounds' | 'plusMinus';

export type GameDataType = {
  date: string;
  points: number;
  assists: number;
  rebounds: number;
  plusMinus: number;
  opponent: string;
  isHome: boolean;
  result: string;
};

type StatsContextType = {
  gameData: GameDataType[];
  isLoading: boolean;
  selectedStat: StatType;
  setSelectedStat: (stat: StatType) => void;
  selectedPlayerId: string | null;
  setSelectedPlayerId: (id: string) => void;
  fetchPlayerStats: (playerId: string) => Promise<void>;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [gameData, setGameData] = useState<GameDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStat, setSelectedStat] = useState<StatType>('points');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const fetchPlayerStats = async (playerId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/stats?playerId=${playerId}`);
      const data = await response.json();
      setGameData(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setGameData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StatsContext.Provider 
      value={{
        gameData,
        isLoading,
        selectedStat,
        setSelectedStat,
        selectedPlayerId,
        setSelectedPlayerId,
        fetchPlayerStats,
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