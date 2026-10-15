# Design System — resumo para implementação

Fonte original: `design-system.pdf`. Os valores de código já estão em `frontend/src/styles/tokens.css` — **sempre use as variáveis, nunca o HEX direto**.

## Visão geral

- Site de sorveteria, mascote = sorvete de casquinha de óculos escuros.
- Estilo cartoon, divertido, neon sobre fundo escuro, cantos arredondados.
- **Somente tema escuro**. pt-BR. **Mobile first**.

## Cores

| Token | HEX | Uso |
|---|---|---|
| `--color-bg` | #171018 | Fundo, footer |
| `--color-surface` | #231628 | Cards, modais, inputs |
| `--color-surface-2` | #2E1B35 | Hover de card, dropdowns |
| `--color-border` | #3F2A49 | Bordas e divisores |
| `--color-primary` | #7B1FA2 | Navbar, seções — **nunca como cor de texto** |
| `--color-primary-hover` | #8E24AA | Hover roxo |
| `--color-secondary` | #FF4081 | Botões CTA, links |
| `--color-secondary-hover` | #FF5C93 | Hover do botão rosa |
| `--color-on-secondary` | #171018 | Texto dentro do botão rosa |
| `--color-accent` | #FF8C1A | Ícones, detalhes, borda em hover |
| `--color-price` | #FFD43B | Preços e badges de promo |
| `--color-text` | #FFF0C2 | Texto principal |
| `--color-text-muted` | #D8CFA8 | Texto secundário |
| `--color-success` / `-error` / `-warning` | #4CAF50 / #EF5350 / #FFB300 | Feedback (sempre com ícone + texto) |
| `--color-focus` | #FFD43B | Anel de foco |
| `--color-glow` | #E000E8 | Brilho magenta do mascote (medido) |

Combinações proibidas: creme sobre rosa (2.9:1), roxo como texto sobre o fundo (2.3:1). Botão rosa usa texto escuro.

## Tipografia

- **Fredoka** 700 nos títulos; 600 em botões, preços e badges.
- **Nunito** 400 no texto; 700 para ênfase.
- Escala: `--text-h1` clamp(2.5–4.5rem), `--text-h2` clamp(2–3rem), `--text-h3` 1.5rem, corpo 1rem / 1.6.

## Forma, espaço e layout

- Raios: 8 / 16 / 24 / pill. Espaçamento em escala de 4px (`--space-1` … `--space-16`).
- Container 1200px, padding 16px (mobile) / 24px (desktop). Navbar 72px.
- Breakpoints: sm 640 · md 768 · lg 1024 · xl 1280. Grid do cardápio: 1 / 2 / 3 / 4 colunas.
- Seções alternam fundo escuro e roxo.

## Componentes

- **Button**: `primary` (rosa), `secondary` (borda roxa), `ghost`. Pill, altura mínima 44px, estados hover/focus/active (scale .97)/disabled/loading.
- **FlavorCard**: superfície + borda + sombra; imagem, nome, descrição, preço; hover sobe 4px com borda laranja; badge “Novo”/“Promo”.
- **PriceBadge**: Fredoka 600 amarelo, formatado em BRL.
- **Inputs**: superfície, foco com borda rosa + anel amarelo, erro com borda vermelha + ícone + mensagem.
- **Toast/Alert**: sempre ícone + texto. Sucesso de pedido mostra o mascote feliz.
- **Skeleton** para carregamento; toda tela com dados tem estados carregando / erro / vazio.

## Mascote

Poses, arquivos e onde usar: ver `assets/README.md`. Regras: máximo 1 mascote grande por tela; não distorcer nem recolorir; animação só flutuar/balançar e respeitando `prefers-reduced-motion`.

## Pendências do PDF e o que foi decidido

| Pendência | Situação |
|---|---|
| Logo final | Provisório: rosto do mascote + “ai-ce” em Fredoka |
| Endereço, horários, contatos | Provisórios em `frontend/src/config/site.ts` |
| Lista real de produtos | Provisória em `frontend/src/mocks/flavors.ts` |
| HEX do magenta | **#E000E8** |
| Poses restantes | Pendente — ver prompts em `assets/README.md` |
| Tailwind ou CSS puro | **CSS puro com variáveis** |
