'use client';

import { useStats } from '@/context/StatsContext';
import LoadingSpinner from './LoadingSpinner';

const statLabels = {
  points: 'Points',
  assists: 'Assists',
  rebounds: 'Rebounds',
  plusMinus: 'Plus/Minus'
};

export default function SeasonStats() {
  const { gameData, selectedYear, isLoading, selectedStat } = useStats();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!gameData.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
        <p className="text-center text-gray-500">No stats available for this season</p>
      </div>
    );
  }

  // Calculate season average for selected stat
  const totalStats = gameData.reduce((sum, game) => sum + (game[selectedStat as keyof typeof game] as number), 0);
  const averageStats = (totalStats / gameData.length).toFixed(1);

  // Calculate home/away splits
  const homeGames = gameData.filter(game => game.isHome === true);
  const awayGames = gameData.filter(game => game.isHome === false);
  
  const homeAverage = homeGames.length > 0
    ? (homeGames.reduce((sum, game) => sum + (game[selectedStat as keyof typeof game] as number), 0) / homeGames.length).toFixed(1)
    : 'N/A';
    
  const awayAverage = awayGames.length > 0
    ? (awayGames.reduce((sum, game) => sum + (game[selectedStat as keyof typeof game] as number), 0) / awayGames.length).toFixed(1)
    : 'N/A';

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <h2 className="text-lg font-bold mb-2">{selectedYear} Season {statLabels[selectedStat as keyof typeof statLabels]}</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Season Average</p>
          <p className="text-xl font-bold">{averageStats}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Home Average</p>
          <p className="text-xl font-bold text-red-600">{homeAverage}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Away Average</p>
          <p className="text-xl font-bold text-yellow-500">{awayAverage}</p>
        </div>
      </div>
    </div>
  );
} 