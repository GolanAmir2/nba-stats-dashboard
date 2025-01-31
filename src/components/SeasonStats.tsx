'use client';

import { useStats } from '@/context/StatsContext';

export default function SeasonStats() {
  const { gameData, selectedStat, isLoading } = useStats();

  if (isLoading || !gameData.length) return null;

  const calculateSeasonStats = () => {
    const total = gameData.reduce((sum, game) => sum + game[selectedStat], 0);
    const average = total / gameData.length;
    const wins = gameData.filter(game => game.result === 'W').length;
    const losses = gameData.length - wins;

    return {
      total: total.toFixed(0),
      average: average.toFixed(1),
      wins,
      losses
    };
  };

  const stats = calculateSeasonStats();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <h2 className="text-lg font-bold mb-4">Season Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Average</p>
          <p className="text-xl font-bold">{stats.average}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Wins</p>
          <p className="text-xl font-bold">{stats.wins}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Losses</p>
          <p className="text-xl font-bold">{stats.losses}</p>
        </div>
      </div>
    </div>
  );
} 