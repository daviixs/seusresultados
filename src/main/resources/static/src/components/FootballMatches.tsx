import { useMatches } from '@/hooks/useMatches';
import { MatchCard } from './MatchCard';
import { SkeletonCard } from './SkeletonCard';
import { leagueNames, LeagueKey } from '@/data/leagueLogos';

// Componente principal da aplicação
// Gerencia a listagem de jogos de futebol
export const FootballMatches = () => {
  
  // Hook personalizado que busca os dados dos jogos
  const { matches, loading, error, getMatchesByLeague, day, setDay } = useMatches();

  // Enquanto está carregando, mostra skeleton loading
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          
          {/* Cabeçalho da página */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              ⚽ Jogos de Futebol
            </h1>
            <p className="text-muted-foreground">
              Carregando partidas das principais ligas...
            </p>
          </div>

          {/* Grid de skeleton cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cria 6 skeleton cards para mostrar loading */}
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Se não há jogos para mostrar
  if (!loading && matches.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Nenhum jogo encontrado
          </h1>
          <p className="text-muted-foreground">
            Não foi possível carregar os jogos no momento.
          </p>
        </div>
      </div>
    );
  }

  // Agrupa os jogos por liga
  const matchesByLeague = getMatchesByLeague();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho da página */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            <img
                src="/LogoP.jpg"
                alt="Logo"
                className="rounded w-32 h-auto h-32 object-cover mx-auto"
            />
          </h1>
          <p className="text-muted-foreground">
            Acompanhe as partidas das principais ligas do mundo
          </p>
          
          {/* Mostra aviso se estiver usando dados mock */}
          {error && (
            <div className="mt-4 p-3 bg-match-scheduled/10 border border-match-scheduled/20 rounded-lg text-match-scheduled text-sm max-w-md mx-auto">
              ℹ️ Exibindo dados fictícios - API indisponível
            </div>
          )}
        </div>

        {/* Filtro: Hoje / Amanhã */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setDay('today')}
            className={`px-4 py-2 rounded-md border transition ${day === 'today' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
          >
            Hoje
          </button>
          <button
            onClick={() => setDay('tomorrow')}
            className={`px-4 py-2 rounded-md border transition ${day === 'tomorrow' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
          >
            Amanhã
          </button>
        </div>

        {/* Lista as ligas e seus jogos */}
        <div className="space-y-8">
          {Object.entries(matchesByLeague).map(([leagueKey, leagueMatches]) => (
            <div key={leagueKey}>
              
              {/* Nome da liga */}
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-primary rounded-full"></div>
                {leagueNames[leagueKey as LeagueKey]}
                <span className="text-sm text-muted-foreground font-normal">
                  ({leagueMatches.length} {leagueMatches.length === 1 ? 'jogo' : 'jogos'})
                </span>
              </h2>

              {/* Grid de cards dos jogos desta liga */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leagueMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="text-center mt-12 py-6 border-t border-border">
          <p className="text-muted-foreground text-sm">
            Dados atualizados em tempo real • React + Spring Boot
          </p>
        </div>
      </div>
    </div>
  );
};