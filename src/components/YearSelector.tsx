'use client';

import { useStats } from '@/context/StatsContext';

const availableYears = [
  '2024-25',
  '2023-24',
  '2022-23',
  '2021-22',
  '2020-21',
];

export default function YearSelector() {
  const { selectedYear, setSelectedYear } = useStats();

  return (
    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      {availableYears.map((year) => (
        <option key={year} value={year}>
          {year} Season
        </option>
      ))}
    </select>
  );
}
