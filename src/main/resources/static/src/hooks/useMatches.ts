import { useState, useEffect } from 'react';
import { Match, mockMatches } from '@/data/mockMatches';

// Hook personalizado para gerenciar os dados dos jogos
// Agora permite alternar entre Hoje e Amanhã
export const useMatches = () => {
  // Estado para armazenar os jogos
  const [matches, setMatches] = useState<Match[]>([]);
  
  // Estado para controlar o carregamento (skeleton loading)
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar erros da API
  const [error, setError] = useState<string | null>(null);

  // Dia selecionado: 'today' | 'tomorrow'
  const [day, setDay] = useState<'today' | 'tomorrow'>('today');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔄 Buscando dados da API para', day);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let endpoint = '/api/matches';
        if (day === 'tomorrow') {
          const t = new Date(Date.now() + 24 * 60 * 60 * 1000);
          const yyyy = t.getFullYear();
          const mm = String(t.getMonth() + 1).padStart(2, '0');
          const dd = String(t.getDate()).padStart(2, '0');
          const isoDay = `${yyyy}-${mm}-${dd}`; // yyyy-MM-dd
          endpoint = `/api/matches?date=${isoDay}`;
        }
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        console.log('⚠️ API falhou, usando dados fictícios');
        setError('API indisponível');
        
        // Usa dados mock quando a API falha
        setMatches(mockMatches);
      } finally {
        setLoading(false);
      }
    };

    // Busca sempre que trocar o dia
    fetchMatches();
  }, [day]);

  // Função para agrupar jogos por liga
  const getMatchesByLeague = () => {
    const grouped: { [key: string]: Match[] } = {};
    
    matches.forEach(match => {
      if (!grouped[match.league]) {
        grouped[match.league] = [];
      }
      grouped[match.league].push(match);
    });
    
    return grouped;
  };

  return {
    matches,           // Lista completa de jogos
    loading,           // Estado de carregamento
    error,             // Mensagem de erro (se houver)
    getMatchesByLeague, // Função para agrupar por liga
    day,
    setDay,
  };
};