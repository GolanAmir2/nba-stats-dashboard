'use client';

import { useStats } from '@/context/StatsContext';

export default function Streaks() {
  const { gameData, selectedStat } = useStats();

  if (!gameData.length) return null;

  const calculateStreaks = () => {
    let currentStreak = 0;
    let longestStreak = 0;
    const threshold = selectedStat === 'points' ? 20 : 
                     selectedStat === 'assists' ? 5 : 
                     selectedStat === 'rebounds' ? 8 : 5;

    // Calculate current streak
    for (let i = 0; i < gameData.length; i++) {
      if ((gameData[i][selectedStat as keyof typeof gameData[i]] as number) >= threshold) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate longest streak
    let tempStreak = 0;
    for (let i = 0; i < gameData.length; i++) {
      if ((gameData[i][selectedStat as keyof typeof gameData[i]] as number) >= threshold) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    return { currentStreak, longestStreak };
  };

  const { currentStreak, longestStreak } = calculateStreaks();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <h2 className="text-lg font-bold mb-4">Streaks</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Current Streak</p>
          <p className="text-xl font-bold">{currentStreak} games</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Longest Streak</p>
          <p className="text-xl font-bold">{longestStreak} games</p>
        </div>
      </div>
    </div>
  );
} 