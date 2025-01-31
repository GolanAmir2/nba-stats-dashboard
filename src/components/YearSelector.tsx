'use client';

import { useStats } from '@/context/StatsContext';

export default function YearSelector() {
  const { selectedPlayerId, fetchPlayerStats } = useStats();

  const years = ['2024-25', '2023-24', '2022-23', '2021-22', '2020-21'];

  const handleYearChange = (year: string) => {
    if (selectedPlayerId) {
      fetchPlayerStats(selectedPlayerId);
    }
  };

  return (
    <select
      onChange={(e) => handleYearChange(e.target.value)}
      defaultValue="2024-25"
      className="p-2 border rounded-lg"
    >
      {years.map(year => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
