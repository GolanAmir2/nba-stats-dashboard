import { NextResponse } from 'next/server';

type Player = {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
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

    const data = await response.json();
    const players: Player[] = data.resultSets[0].rowSet
      .filter((player: any[]) => 
        player[2].toLowerCase().includes(query.toLowerCase())
      )
      .map((player: any[]) => ({
        id: player[0],
        name: player[2],
        teamId: player[7],
        teamName: player[8]
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