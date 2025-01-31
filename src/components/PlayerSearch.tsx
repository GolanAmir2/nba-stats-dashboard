'use client';

import { useStats } from '@/context/StatsContext';
import { useState } from 'react';

type Player = {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
};

export default function PlayerSearch() {
  const { setSelectedPlayerId, fetchPlayerStats } = useStats();
  const [query, setQuery] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  const searchPlayers = async (search: string) => {
    if (search.length < 3) {
      setPlayers([]);
      return;
    }

    try {
      const response = await fetch(`/api/players/search?q=${search}`);
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error searching players:', error);
    }
  };

  const handlePlayerSelect = (playerId: string) => {
    setSelectedPlayerId(playerId);
    fetchPlayerStats(playerId, '2024-25');
    setPlayers([]);
    setQuery('');
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searchPlayers(e.target.value);
        }}
        placeholder="Search players..."
        className="p-2 border rounded-lg w-full"
      />
      {players.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {players.map(player => (
            <button
              key={player.id}
              onClick={() => handlePlayerSelect(player.id)}
              className="w-full text-left p-2 hover:bg-gray-100 block"
            >
              {player.name} - {player.teamName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 