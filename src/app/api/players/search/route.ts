import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('name')?.toLowerCase() || '';

  if (!searchTerm || searchTerm.length < 2) {
    return NextResponse.json([]);
  }

  try {
    // Using stats.nba.com API instead of data.nba.net
    const url = 'https://stats.nba.com/stats/playerindex?Historical=0&LeagueID=00';
    
    const response = await fetch(url, {
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Host': 'stats.nba.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'x-nba-stats-origin': 'stats',
        'x-nba-stats-token': 'true',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`NBA API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Process the NBA API response
    const players = data.resultSets[0].rowSet
      .filter((player: any[]) => {
        const fullName = `${player[1]}`.toLowerCase();
        return fullName.includes(searchTerm);
      })
      .map((player: any[]) => ({
        id: player[0],
        name: player[1],
        teamName: player[8] || 'N/A'  // TEAM_NAME is usually at index 8
      }))
      .slice(0, 10);

    console.log(`Found ${players.length} players matching "${searchTerm}"`);
    
    return NextResponse.json(players);
  } catch (error) {
    console.error('Error searching players:', error);
    return NextResponse.json(
      { error: 'Failed to search players' },
      { status: 500 }
    );
  }
} 