'use client';

import { useState, useEffect, useRef } from 'react';
import { useStats } from '@/context/StatsContext';

type Player = {
  id: string;
  name: string;
  teamName: string;
};

export default function PlayerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { setSelectedPlayer, selectedPlayer } = useStats();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchPlayers = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        setSelectedIndex(-1);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(`/api/players/search?name=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching players:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchPlayers, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          const selectedPlayer = searchResults[selectedIndex];
          handleSelectPlayer(selectedPlayer);
        }
        break;
      case 'Escape':
        setSearchResults([]);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setSearchTerm(player.name);
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="relative w-64" ref={searchRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for a player..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search players"
      />
      
      {isSearching && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
      
      {searchResults.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {searchResults.map((player, index) => (
            <button
              key={player.id}
              onClick={() => handleSelectPlayer(player)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                ${selectedIndex === index ? 'bg-gray-100' : ''}`}
            >
              <div className="font-medium">{player.name}</div>
              <div className="text-sm text-gray-600">{player.teamName}</div>
            </button>
          ))}
        </div>
      )}

      {selectedPlayer && searchTerm === '' && (
        <div className="absolute right-3 top-3">
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedPlayer(null);
            }}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Clear selection"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
} 