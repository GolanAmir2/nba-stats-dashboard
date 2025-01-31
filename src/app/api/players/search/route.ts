import { NextResponse } from 'next/server';

type Player = {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
};

type NBAPlayerData = {
  resultSets: [{
    rowSet: [string | number, string | number, string, string, string, string, string, string, string][];
  }];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://stats.nba.com/stats/playerindex?Historical=0&LeagueID=00&Season=2023-24`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch players');
    }

    const data: NBAPlayerData = await response.json();
    const players: Player[] = data.resultSets[0].rowSet
      .filter((player) => 
        player[2].toString().toLowerCase().includes(query.toLowerCase())
      )
      .map((player) => ({
        id: player[0].toString(),
        name: player[2].toString(),
        teamId: player[7].toString(),
        teamName: player[8].toString()
      }));

    return NextResponse.json(players);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
} 