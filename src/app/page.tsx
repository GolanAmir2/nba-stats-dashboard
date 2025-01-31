'use client';

import PlayerHeader from '@/components/PlayerHeader';
import StatSelector from '@/components/StatSelector';
import YearSelector from '@/components/YearSelector';
import StatsChart from '@/components/StatsChart';
import DetailedStats from '@/components/DetailedStats';
import SeasonStats from '@/components/SeasonStats';
import { useStats } from '@/context/StatsContext';
import { useEffect } from 'react';

export default function Home() {
  const { setSelectedPlayerId, fetchPlayerStats } = useStats();

  // Set Deni's ID and fetch his stats on initial load
  useEffect(() => {
    const deniId = '1630166';  // Deni Avdija's NBA ID
    setSelectedPlayerId(deniId);
    fetchPlayerStats(deniId);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <PlayerHeader />
      <div className="flex gap-4 mb-8">
        <YearSelector />
        <StatSelector />
      </div>
      <div className="grid grid-cols-1 gap-8">
        <StatsChart />
        <DetailedStats />
        <SeasonStats />
      </div>
    </main>
  );
}
