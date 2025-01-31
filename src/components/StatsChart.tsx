'use client';

import { useStats } from '@/context/StatsContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type StatType = 'points' | 'assists' | 'rebounds' | 'plusMinus';

type StatLabelsType = {
  [K in StatType]: string;
};

type GameDataType = {
  date: string;
  points: number;
  assists: number;
  rebounds: number;
  plusMinus: number;
  opponent: string;
  isHome: boolean;
  result: string;
};

const statLabels: StatLabelsType = {
  points: 'Points',
  assists: 'Assists',
  rebounds: 'Rebounds',
  plusMinus: 'Plus/Minus'
};

export default function StatsChart() {
  const { gameData, selectedStat, isLoading } = useStats();

  if (isLoading || !gameData.length) return null;

  const reversedGameData = [...gameData].reverse();

  const chartData: ChartData<'line'> = {
    labels: reversedGameData.map(game => game.date),
    datasets: [
      {
        label: statLabels[selectedStat as StatType],
        data: reversedGameData.map(game => game[selectedStat as keyof GameDataType] as number),
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: reversedGameData.map(game => 
          game.result === 'W' ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
        ),
        pointRadius: 8,
        pointStyle: reversedGameData.map(game => 
          game.isHome ? 'circle' : 'rectRot'
        ),
        borderWidth: 1,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${statLabels[selectedStat as StatType]} by Game`,
      },
      tooltip: {
        callbacks: {
          label: function(context: { dataIndex: number }) {
            const gameIndex = context.dataIndex;
            const game = reversedGameData[gameIndex];
            const statValue = game[selectedStat as keyof GameDataType];
            const location = game.isHome ? 'Home' : 'Away';
            const opponent = game.opponent;
            const result = game.result;
            return [
              `${location} vs ${opponent} (${result})`,
              `${statLabels[selectedStat as StatType]}: ${statValue}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: selectedStat === 'plusMinus' ? 5 : 2,
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-center items-center gap-8 mb-6 text-lg">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-black"></div>
            <span>Home</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-black transform rotate-45"></div>
            <span>Away</span>
          </div>
        </div>
        <div className="h-6 w-px bg-gray-300 mx-4"></div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Win</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Loss</span>
          </div>
        </div>
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
} 