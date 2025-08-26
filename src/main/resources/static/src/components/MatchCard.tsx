import { Match } from '@/data/mockMatches';
import { leagueLogos, leagueNames, LeagueKey } from '@/data/leagueLogos';

// Props que o componente recebe
interface MatchCardProps {
  match: Match;
}

// Componente do card de cada jogo
// Mostra as informações de uma partida de futebol
export const MatchCard = ({ match }: MatchCardProps) => {
  
  // Função para formatar o status do jogo
  const getStatusDisplay = () => {
    switch (match.status) {
      case 'live':
        return {
          text: `${match.minute}'`,
          color: 'text-match-live',
          bgColor: 'bg-match-live/10',
          dot: 'bg-match-live'
        };
      case 'finished':
        return {
          text: 'Finalizado',
          color: 'text-match-finished',
          bgColor: 'bg-match-finished/10',
          dot: 'bg-match-finished'
        };
      case 'scheduled':
        return {
          text: new Date(match.date).toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          color: 'text-match-scheduled',
          bgColor: 'bg-match-scheduled/10',
          dot: 'bg-match-scheduled'
        };
      default:
        return {
          text: 'Agendado',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          dot: 'bg-muted-foreground'
        };
    }
  };

  const status = getStatusDisplay();
  const leagueKey = match.league as LeagueKey;

  return (
    <div className="bg-gradient-card hover:shadow-card-hover transition-all duration-300 p-6 rounded-lg shadow-card border border-border hover:border-primary/20 transform hover:-translate-y-1">
      
      {/* Cabeçalho com logo e nome da liga */}
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={leagueLogos[leagueKey]} 
          alt={`Logo ${leagueNames[leagueKey]}`}
          className="w-8 h-8 object-contain rounded-full"
          onError={(e) => {
            // Fallback caso a imagem não carregue
            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="%23ccc"/></svg>';
          }}
        />
        <h3 className="font-semibold text-foreground">
          {leagueNames[leagueKey]}
        </h3>
      </div>

      {/* Times e placar */}
      <div className="space-y-3 mb-4">
        
        {/* Time da casa */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">
            {match.homeTeam}
          </span>
          <span className="text-2xl font-bold text-foreground min-w-[2rem] text-center">
            {match.homeScore !== null ? match.homeScore : '-'}
          </span>
        </div>

        {/* Linha divisória */}
        <div className="h-px bg-border"></div>

        {/* Time visitante */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">
            {match.awayTeam}
          </span>
          <span className="text-2xl font-bold text-foreground min-w-[2rem] text-center">
            {match.awayScore !== null ? match.awayScore : '-'}
          </span>
        </div>
      </div>

      {/* Status e horário */}
      <div className="flex justify-between items-center">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${status.bgColor} ${status.color}`}>
          {/* Ponto indicador para jogos ao vivo */}
          {match.status === 'live' && (
            <div className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`}></div>
          )}
          {status.text}
        </div>
        
        {/* Data do jogo */}
        <span className="text-sm text-muted-foreground">
          {new Date(match.date).toLocaleDateString('pt-BR')}
        </span>
      </div>
    </div>
  );
};