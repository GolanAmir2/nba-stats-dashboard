import { NextResponse } from 'next/server';

export const maxDuration = 300; // Set max duration to 300 seconds
export const dynamic = 'force-dynamic'; // Disable caching for now

type GameData = {
  date: string;
  points: number;
  assists: number;
  rebounds: number;
  plusMinus: number;
  opponent: string;
  isHome: boolean;
  result: string;
};

type NBAGameData = {
  resultSets: [{
    rowSet: [string | number, string | number, string, string, string, string, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number][];
  }];
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season') || '2024-25';
    const playerId = searchParams.get('playerId');

    if (!playerId) {
      return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
    }

    // Fetch data from NBA API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(
      `https://stats.nba.com/stats/playergamelog?PlayerID=${playerId}&Season=${season}&SeasonType=Regular%20Season`,
      {
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Host': 'stats.nba.com',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.nba.com/',
          'x-nba-stats-origin': 'stats',
          'x-nba-stats-token': 'true'
        },
        signal: controller.signal,
        cache: 'no-store'
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`NBA API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data into the format your frontend expects
    const games = data.resultSets[0].rowSet.map((game: any) => ({
      date: game[3],
      opponent: game[5],
      result: game[4].split(' ')[0],
      isHome: !game[5].startsWith('@'),
      points: game[24],
      assists: game[21],
      rebounds: game[20],
      plusMinus: game[27]
    }));

    return NextResponse.json(games);

  } catch (error) {
    console.error('Error fetching player stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player stats' },
      { status: 500 }
    );
  }
} 