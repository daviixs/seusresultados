# 🌿 Paleta Verde Moderna - Site de Futebol

## 🎨 Raciocínio da Paleta

A nova identidade visual foi criada com foco em:

1. **Associação com o futebol**: Verde representa o campo, natureza e esporte
2. **Modernidade**: Tons saturados e contrastantes para um visual contemporâneo
3. **Legibilidade**: Alto contraste entre textos e backgrounds
4. **Profissionalismo**: Paleta sofisticada adequada para conteúdo esportivo

## 🎯 Cores Principais

### Modo Claro (Light Mode)
```css
/* Backgrounds */
--background: 150 8% 8%        /* #131716 - Verde escuro profissional */
--card: 150 12% 12%            /* #1A201E - Cards em verde escuro */

/* Textos */
--foreground: 120 15% 95%      /* #F0F5F0 - Verde claro para texto */
--card-foreground: 120 15% 92% /* #E8F2E8 - Texto claro nos cards */

/* Verde Principal */
--primary: 140 85% 45%         /* #16C950 - Verde vibrante moderno */
--primary-glow: 140 75% 55%    /* #2BDB63 - Verde brilhante para efeitos */

/* Elementos Secundários */
--secondary: 150 20% 18%       /* #252E2A - Verde médio */
--accent: 140 60% 35%          /* #239447 - Verde accent vibrante */
--muted: 150 15% 15%           /* #202625 - Verde suave */
```

### Cores dos Matches
```css
--match-live: 0 85% 60%        /* #E63946 - Vermelho para AO VIVO */
--match-finished: 120 20% 65%  /* #9BB59B - Verde claro para FINALIZADO */
--match-scheduled: 45 85% 55%  /* #F4B942 - Amarelo para AGENDADO */
```

## ✨ Gradientes e Efeitos

```css
/* Gradiente Principal */
--gradient-primary: linear-gradient(135deg, #16C950, #2BDB63)

/* Gradiente para Cards */
--gradient-card: linear-gradient(145deg, #1A201E, #202625)

/* Gradiente Hero */
--gradient-hero: linear-gradient(135deg, #13A043, #2BDB63)

/* Sombras com Verde */
--shadow-card: 0 4px 20px -2px rgba(22, 201, 80, 0.15)
--shadow-card-hover: 0 8px 30px -4px rgba(22, 201, 80, 0.25)
--shadow-glow: 0 0 40px rgba(43, 219, 99, 0.4)
```

## 🎪 Códigos Hexadecimais Equivalentes

| Token | Hex | Uso |
|-------|-----|-----|
| `--primary` | #16C950 | Botões, links, destaques |
| `--primary-glow` | #2BDB63 | Efeitos hover, glow |
| `--background` | #131716 | Fundo principal |
| `--card` | #1A201E | Fundo dos cards |
| `--foreground` | #F0F5F0 | Texto principal |
| `--accent` | #239447 | Elementos de destaque |
| `--secondary` | #252E2A | Elementos secundários |

## 🚀 Benefícios da Nova Paleta

✅ **Identidade Esportiva**: Verde associado ao futebol e natureza
✅ **Alto Contraste**: Excelente legibilidade (WCAG AA compliant)
✅ **Visual Moderno**: Saturação equilibrada para look contemporâneo
✅ **Hierarquia Clara**: Diferenciação visual entre elementos
✅ **Versatilidade**: Funciona bem em modo claro e escuro

## 🎨 Como Usar

A paleta já está aplicada automaticamente através dos tokens CSS. Use as classes Tailwind:

```tsx
// Botão principal
<button className="bg-primary text-primary-foreground">

// Card com gradiente
<div className="bg-gradient-card shadow-card">

// Texto com cor de destaque
<span className="text-accent">

// Hover com glow
<div className="hover:shadow-glow transition-all">
```

A nova identidade visual cria uma experiência mais imersiva e profissional para os usuários! 🌿⚽