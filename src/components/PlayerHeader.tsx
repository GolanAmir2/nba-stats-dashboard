import Image from 'next/image';

export default function PlayerHeader() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-24">
          <Image 
            src="https://cdn.nba.com/headshots/nba/latest/1040x760/1630166.png" 
            alt="Deni Avdija"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Deni Avdija</h1>
          <p className="text-gray-600">Portland Trail Blazers &bull; #9</p>
          <p className="text-sm text-gray-500">Forward &bull; 6&apos;9&quot; &bull; 210 lbs</p>
        </div>
      </div>
    </div>
  );
} 