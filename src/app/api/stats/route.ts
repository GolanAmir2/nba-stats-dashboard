import { NextResponse } from 'next/server';

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
  const { searchParams } = new URL(request.url);
  const season = searchParams.get('season') || '2024-25';
  const playerId = searchParams.get('playerId');

  if (!playerId) {
    return NextResponse.json(
      { error: 'Player ID is required' },
      { status: 400 }
    );
  }

  try {
    const url = `https://stats.nba.com/stats/playergamelog?PlayerID=${playerId}&Season=${season}&SeasonType=Regular%20Season`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Host': 'stats.nba.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.nba.com/',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    const data: NBAGameData = await response.json();
    
    const games: GameData[] = data.resultSets[0].rowSet.map((game) => {
      const matchup = game[4].toString() || '';
      const isHome = matchup.includes('vs.');
      
      const defensiveRebounds = Number(game[17]) || 0;
      const offensiveRebounds = Number(game[16]) || 0;
      const totalRebounds = defensiveRebounds + offensiveRebounds;

      return {
        date: game[3].toString(),
        points: Number(game[24]) || 0,
        assists: Number(game[19]) || 0,
        rebounds: totalRebounds,
        plusMinus: Number(game[25]) || 0,
        opponent: isHome ? matchup.split('vs.')[1]?.trim() : matchup.split('@')[1]?.trim(),
        isHome,
        result: game[5].toString()
      };
    });

    return NextResponse.json(games);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 