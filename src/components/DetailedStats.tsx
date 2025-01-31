'use client';

import { useStats } from '@/context/StatsContext';

type StatLabels = {
  [key: string]: string;
};

const statLabels: StatLabels = {
  points: 'Points',
  assists: 'Assists',
  rebounds: 'Rebounds',
  plusMinus: 'Plus/Minus'
};

export default function DetailedStats() {
  const { gameData, isLoading, selectedStat } = useStats();

  if (isLoading || !gameData.length) return null;

  const calculateStats = () => {
    const lastFiveGames = gameData.slice(0, 5);
    const lastFiveAvg = lastFiveGames.reduce((sum, game) => 
      sum + (game[selectedStat as keyof typeof game] as number), 0) / 5;

    const allValues = gameData.map(game => game[selectedStat as keyof typeof game] as number);
    const highestValue = Math.max(...allValues);
    const gamesPlayed = gameData.length;

    // Calculate threshold based on stat type
    let threshold;
    switch(selectedStat) {
      case 'points':
        threshold = 20;
        break;
      case 'assists':
        threshold = 5;
        break;
      case 'rebounds':
        threshold = 8;
        break;
      case 'plusMinus':
        threshold = 10;
        break;
      default:
        threshold = 0;
    }

    const gamesAboveThreshold = gameData.filter(game => 
      (game[selectedStat as keyof typeof game] as number) >= threshold
    ).length;

    return {
      lastFiveAvg: lastFiveAvg.toFixed(1),
      highestValue,
      gamesPlayed,
      gamesAboveThreshold,
      threshold
    };
  };

  const stats = calculateStats();

  const getThresholdLabel = () => {
    switch(selectedStat) {
      case 'points':
        return 'Games Over 20';
      case 'assists':
        return 'Games Over 5';
      case 'rebounds':
        return 'Games Over 8';
      case 'plusMinus':
        return 'Games Over +10';
      default:
        return 'Games Above Threshold';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <h2 className="text-lg font-bold mb-4">Detailed Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Last 5 Games Avg</p>
          <p className="text-xl font-bold">{stats.lastFiveAvg}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Season High</p>
          <p className="text-xl font-bold">{stats.highestValue}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Games Played</p>
          <p className="text-xl font-bold">{stats.gamesPlayed}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">{getThresholdLabel()}</p>
          <p className="text-xl font-bold">{stats.gamesAboveThreshold}</p>
        </div>
      </div>
    </div>
  );
} 