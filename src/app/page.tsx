import PlayerHeader from '@/components/PlayerHeader';
import StatsChart from '@/components/StatsChart';
import YearSelector from '@/components/YearSelector';
import StatSelector from '@/components/StatSelector';
import SeasonStats from '@/components/SeasonStats';
import DetailedStats from '@/components/DetailedStats';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <PlayerHeader />
      <div className="mb-4 flex space-x-4">
        <YearSelector />
        <StatSelector />
      </div>
      <SeasonStats />
      <DetailedStats />
      <StatsChart />
    </main>
  );
}
