// Componente de skeleton loading - barras cinzas animadas
// Mostra enquanto os dados estão carregando da API

export const SkeletonCard = () => {
  return (
    <div className="bg-gradient-card p-6 rounded-lg shadow-card border border-border">
      {/* Logo da liga - círculo animado */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full skeleton-text"></div>
        <div className="h-4 w-24 rounded skeleton-text"></div>
      </div>

      {/* Times jogando - barras horizontais */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-32 rounded skeleton-text"></div>
          <div className="h-6 w-8 rounded skeleton-text"></div>
        </div>
        <div className="h-px bg-border"></div>
        <div className="flex items-center justify-between">
          <div className="h-5 w-28 rounded skeleton-text"></div>
          <div className="h-6 w-8 rounded skeleton-text"></div>
        </div>
      </div>

      {/* Status do jogo - barra pequena */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-16 rounded-full skeleton-text"></div>
        <div className="h-4 w-20 rounded skeleton-text"></div>
      </div>
    </div>
  );
};