'use client';

import { useStats } from '@/context/StatsContext';
import type { StatType } from '@/context/StatsContext';

const stats: { value: StatType; label: string }[] = [
  { value: 'points', label: 'Points' },
  { value: 'assists', label: 'Assists' },
  { value: 'rebounds', label: 'Rebounds' },
  { value: 'plusMinus', label: 'Plus/Minus' }
];

export default function StatSelector() {
  const { selectedStat, setSelectedStat } = useStats();

  return (
    <select
      value={selectedStat}
      onChange={(e) => setSelectedStat(e.target.value as StatType)}
      className="p-2 border rounded-lg"
    >
      {stats.map(stat => (
        <option key={stat.value} value={stat.value}>
          {stat.label}
        </option>
      ))}
    </select>
  );
} 