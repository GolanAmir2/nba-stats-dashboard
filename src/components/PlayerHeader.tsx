export default function PlayerHeader() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
      <div className="flex items-center space-x-4">
        <img 
          src="https://cdn.nba.com/headshots/nba/latest/1040x760/1630166.png" 
          alt="Deni Avdija"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">Deni Avdija</h1>
          <p className="text-gray-600">Washington Wizards | #9</p>
          <p className="text-sm text-gray-500">Forward | 6'9" | 210 lbs</p>
        </div>
      </div>
    </div>
  );
} 