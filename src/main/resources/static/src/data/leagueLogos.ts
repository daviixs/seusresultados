// Sistema organizado de logos das ligas
// Para trocar uma logo, basta alterar a URL aqui

export const leagueLogos = {
  bundesliga: 'https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg',
  laliga: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/LaLiga_logo_2023.svg',
  ligue1: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Ligue_1_Uber_Eats_logo.svg',
  premier: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
  brasileirao: 'https://upload.wikimedia.org/wikipedia/pt/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png',
  seriea: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Serie_A.svg'
} as const;

// Nomes das ligas para exibição
export const leagueNames = {
  'bundesliga': 'Bundesliga',
  'laliga': 'LaLiga',
  'ligue1': 'Ligue 1',
  'premier': 'Premier League',
  'brasileirao': 'Brasileirão',
  'seriea': 'Serie A'
} as const;

// Tipo para TypeScript
export type LeagueKey = keyof typeof leagueLogos;