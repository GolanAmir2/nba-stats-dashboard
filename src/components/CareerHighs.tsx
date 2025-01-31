'use client';

import { useStats } from '@/context/StatsContext';

export default function CareerHighs() {
  const { gameData, selectedStat } = useStats();

  if (!gameData.length) return null;

  const getCareerHigh = () => {
    const highestGame = [...gameData].sort((a, b) => 
      (b[selectedStat as keyof typeof b] as number) - 
      (a[selectedStat as keyof typeof a] as number)
    )[0];

    return {
      value: highestGame[selectedStat as keyof typeof highestGame],
      date: highestGame.date,
      opponent: highestGame.opponent,
      result: highestGame.result
    };
  };

  const careerHigh = getCareerHigh();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <h2 className="text-lg font-bold mb-4">Career High</h2>
      <div className="text-center">
        <p className="text-3xl font-bold mb-2">{careerHigh.value}</p>
        <p className="text-gray-600">
          vs {careerHigh.opponent} • {careerHigh.date} • {careerHigh.result}
        </p>
      </div>
    </div>
  );
} 