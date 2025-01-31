'use client';

import { useStats } from '@/context/StatsContext';

const statOptions = [
  { value: 'points', label: 'Points' },
  { value: 'assists', label: 'Assists' },
  { value: 'rebounds', label: 'Rebounds' },
  { value: 'plusMinus', label: 'Plus/Minus' },
];

export default function StatSelector() {
  const { selectedStat, setSelectedStat } = useStats();

  return (
    <select
      value={selectedStat}
      onChange={(e) => setSelectedStat(e.target.value)}
      className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      {statOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
} 