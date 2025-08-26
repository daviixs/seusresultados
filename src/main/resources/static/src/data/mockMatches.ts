// Dados fictícios (mock data) para quando a API não responder
// Dados realistas de jogos de futebol das principais ligas

export interface Match {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'live' | 'finished' | 'scheduled';
  minute?: number;
  date: string;
}

export const mockMatches: Match[] = [
  // Premier League
  {
    id: '1',
    league: 'premier',
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    minute: 67,
    date: '2024-01-20T15:00:00Z'
  },
  {
    id: '2',
    league: 'premier',
    homeTeam: 'Liverpool',
    awayTeam: 'Chelsea',
    homeScore: 3,
    awayScore: 0,
    status: 'finished',
    date: '2024-01-20T12:30:00Z'
  },

  // LaLiga
  {
    id: '3',
    league: 'laliga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: null,
    awayScore: null,
    status: 'scheduled',
    date: '2024-01-21T20:00:00Z'
  },
  {
    id: '4',
    league: 'laliga',
    homeTeam: 'Atlético Madrid',
    awayTeam: 'Sevilla',
    homeScore: 1,
    awayScore: 1,
    status: 'finished',
    date: '2024-01-20T18:00:00Z'
  },

  // Bundesliga
  {
    id: '5',
    league: 'bundesliga',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeScore: 1,
    awayScore: 0,
    status: 'live',
    minute: 23,
    date: '2024-01-20T18:30:00Z'
  },
  {
    id: '6',
    league: 'bundesliga',
    homeTeam: 'RB Leipzig',
    awayTeam: 'Bayer Leverkusen',
    homeScore: 2,
    awayScore: 2,
    status: 'finished',
    date: '2024-01-20T15:30:00Z'
  },

  // Serie A
  {
    id: '7',
    league: 'seriea',
    homeTeam: 'Juventus',
    awayTeam: 'Inter Milan',
    homeScore: null,
    awayScore: null,
    status: 'scheduled',
    date: '2024-01-21T19:45:00Z'
  },
  {
    id: '8',
    league: 'seriea',
    homeTeam: 'AC Milan',
    awayTeam: 'Napoli',
    homeScore: 0,
    awayScore: 1,
    status: 'live',
    minute: 88,
    date: '2024-01-20T17:00:00Z'
  },

  // Ligue 1
  {
    id: '9',
    league: 'ligue1',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    homeScore: 4,
    awayScore: 1,
    status: 'finished',
    date: '2024-01-20T20:00:00Z'
  },
  {
    id: '10',
    league: 'ligue1',
    homeTeam: 'Lyon',
    awayTeam: 'Monaco',
    homeScore: 1,
    awayScore: 1,
    status: 'live',
    minute: 45,
    date: '2024-01-20T16:00:00Z'
  },

  // Brasileirão
  {
    id: '11',
    league: 'brasileirao',
    homeTeam: 'Flamengo',
    awayTeam: 'Palmeiras',
    homeScore: null,
    awayScore: null,
    status: 'scheduled',
    date: '2024-01-21T21:00:00Z'
  },
  {
    id: '12',
    league: 'brasileirao',
    homeTeam: 'Corinthians',
    awayTeam: 'São Paulo',
    homeScore: 2,
    awayScore: 0,
    status: 'finished',
    date: '2024-01-20T19:00:00Z'
  }
];