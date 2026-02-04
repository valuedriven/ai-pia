# Definições de UX

## 1 Diretrizes gerais

### 1.1 Princípios de Design

- Clareza acima de estética
- Hierarquia visual explícita
- Redução de carga cognitiva
- Consistência semântica e visual
- Neutralidade visual (evitar modismos)

### 1.2 Identidade Visual

- Estilo sóbrio e funcional
- Ausência de elementos decorativos desnecessários
- Ênfase em texto, dados e estrutura (imagens usadas apenas em produtos)

### 1.3. Acessibilidade

- Compatibilidade com leitores de tela (ARIA labels em todos os elementos interativos)
- Contraste adequado de cores (ratio mínimo 4.5:1 para texto normal, 3:1 para grande)
- Navegação por teclado (Tab order lógico, focus visible em todos os elementos)
- Conformidade com WCAG 2.1 (nível AA)
- Estados de foco visíveis (ring 2px #1F3A5F ou outline padrão do navegador)
- Textos alternativos em imagens (alt descritivo ou aria-label)
- Skip links para navegação principal
- Redução de movimento respeitada (`prefers-reduced-motion`)

---

## 2 Tipografia

### 2.1 Fontes

- Fonte Primária (Texto e Interface): Inter (Google Fonts)
- Fonte Secundária (Destaques Numéricos e Métricas): Inter SemiBold ou Medium

### 2.2 Hierarquia Tipográfica

| Uso | Tamanho | Peso | Line Height |
|----|--------|------|-------------|
| Título Principal (H1) | 28px (24px mobile) | SemiBold (600) | 1.2 |
| Título de Seção (H2) | 22px (20px mobile) | SemiBold (600) | 1.3 |
| Subtítulo (H3) | 18px (16px mobile) | Medium (500) | 1.4 |
| Texto Base | 16px (14px mobile) | Regular (400) | 1.5 |
| Legendas | 13px (12px mobile) | Regular (400) | 1.4 |
| Dados Numéricos (KPIs) | 32px (28px mobile) | SemiBold (600) | 1.2 |

---

## 3. Paleta de Cores

### 3.1 Cores Principais

| Uso | Cor | Hex | Tailwind |
|---|---|---|---|
| Primária | Azul acadêmico | #1F3A5F | `bg-[#1F3A5F]` |
| Primária Hover | Azul mais escuro | #152A45 | `hover:bg-[#152A45]` |
| Secundária | Cinza neutro | #6B7280 | `text-gray-500` |
| Fundo | Cinza claro | #F9FAFB | `bg-gray-50` |
| Texto | Cinza escuro | #111827 | `text-gray-900` |
| Texto Secundário | Cinza médio | #4B5563 | `text-gray-600` |
| Borda | Cinza claro | #E5E7EB | `border-gray-200` |
| Card Background | Branco | #FFFFFF | `bg-white` |

### 3.2 Cores Funcionais

| Estado | Cor | Hex | Tailwind Equivalent |
|---|---|---|---|
| Sucesso | Verde sóbrio | #2E7D32 | `text-green-700` |
| Sucesso Light | Verde claro | #E8F5E9 | `bg-green-50` |
| Alerta | Amarelo discreto | #F9A825 | `text-yellow-700` |
| Alerta Light | Amarelo claro | #FFF8E1 | `bg-yellow-50` |
| Erro | Vermelho controlado | #C62828 | `text-red-700` |
| Erro Light | Vermelho claro | #FFEBEE | `bg-red-50` |
| Informação | Azul claro | #1565C0 | `text-blue-700` |
| Informação Light | Azul muito claro | #E3F2FD | `bg-blue-50` |

### 3.3 Modo Escuro (Dark Mode)

**Status:** Fora de escopo para MVP (Versão 1.0). Será implementado em versão futura.

**Especificação provisória (futura):**

- Fundo: #0F172A (`bg-slate-900`)
- Card: #1E293B (`bg-slate-800`)
- Texto: #F8FAFC (`text-slate-50`)
- Texto Secundário: #94A3B8 (`text-slate-400`)

---

## 4. Componentes de Interface

### 4.1 Botões

**Primário**

- Fundo: #1F3A5F
- Texto: Branco (#FFFFFF)
- Border Radius: `rounded-md` (6px)
- Padding: 12px 24px (py-3 px-6)
- Fonte: 14px, Medium (500)
- Hover: #152A45 (transição 200ms ease)
- Active: #0F1A2E
- Disabled: Opacidade 50%, cursor not-allowed

**Secundário**

- Fundo: Branco (#FFFFFF)
- Borda: 1px sólida #D1D5DB
- Texto: #1F3A5F
- Border Radius: `rounded-md` (6px)
- Padding: 12px 24px
- Hover: Fundo #F9FAFB (transição 200ms ease)

**Terciário (Ghost)**

- Fundo: Transparente
- Texto: #1F3A5F
- Padding: 8px 16px
- Hover: Fundo #F3F4F6 (transição 200ms ease)

**Botão de Perigo**

- Fundo: #C62828
- Texto: Branco
- Hover: #B71C1C

### 4.2 Cards

- Fundo: Branco (#FFFFFF)
- Borda: 1px sólida #E5E7EB (`border border-gray-200`)
- Border Radius: `rounded-lg` (8px)
- Padding: 24px (p-6)
- Sem sombra (estilo flat)
- **Área de Imagem:**
  - Proporção sugerida: 16:9 (produtos em lista) ou 1:1 (grid de vitrine)
  - Comportamento: `object-cover`
  - Fallback visual: Ícone de imagem (`image` do Lucide) em fundo #F3F4F6 quando URL inválida ou vazia
  - **Validação de URL:** Aceitar apenas URLs HTTPS para imagens externas (JPEG, PNG, WebP)
  - **Tamanho máximo recomendado:** 2MB por imagem
- **Conteúdo:** 
  - Título: 16px, SemiBold, #111827
  - Preço: 18px, SemiBold, #1F3A5F
  - Descrição: 14px, Regular, #6B7280, max 2 linhas (truncate)
  - Botão de ação: Primário ou Secundário, full-width no card de produto

**Estados de Loading:**

- Skeleton: Animação pulse em fundo #E5E7EB
- Altura mantida durante loading
- Conteúdo textual substituído por blocos cinza arredondados

### 4.3 Tabelas e Listas

- Cabeçalho: Fundo #F9FAFB (`bg-gray-50`), texto #6B7280, 12px, Medium, uppercase
- Linhas: Fundo branco, separador 1px #E5E7EB (`border-b`)
- Hover na linha: Fundo #F9FAFB (transição 150ms)
- Células: Padding 16px (py-4 px-4)
- Texto alinhado à esquerda
- Valores numéricos e monetários alinhados à direita
- Ações: Ícones 20px, cor #6B7280, hover #1F3A5F

**Estado Vazio:**

- Ícone 48px (box ou inbox), cor #D1D5DB
- Texto: "Nenhum registro encontrado", 14px, #6B7280
- Subtexto opcional: "Comece criando um novo registro", 13px, #9CA3AF

**Loading de Tabela:**

- 5 linhas de skeleton
- Cada linha: altura 56px, background #F3F4F6 com animação pulse

### 4.4 Indicadores de Status (Badges)

Uso de **badges textuais** com fundo suave e texto escuro, border radius 9999px (`rounded-full`).

#### 4.4.1 Status do Pedido (Fluxo Operacional)

| Status | Fundo | Texto | Exemplo Tailwind |
|--------|-------|-------|------------------|
| Novo | bg-blue-50 | text-blue-700 | `bg-blue-50 text-blue-700` |
| Pago | bg-green-50 | text-green-700 | `bg-green-50 text-green-700` |
| Em Preparação | bg-yellow-50 | text-yellow-700 | `bg-yellow-50 text-yellow-700` |
| Faturado | bg-purple-50 | text-purple-700 | `bg-purple-50 text-purple-700` |
| Despachado | bg-indigo-50 | text-indigo-700 | `bg-indigo-50 text-indigo-700` |
| Entregue | bg-gray-100 | text-gray-700 | `bg-gray-100 text-gray-700` |
| Cancelado | bg-red-50 | text-red-700 | `bg-red-50 text-red-700` |

#### 4.4.2 Status de Pagamento (Financeiro)

| Status | Fundo | Texto | Exemplo Tailwind |
|--------|-------|-------|------------------|
| Pendente | bg-yellow-50 | text-yellow-700 | `bg-yellow-50 text-yellow-700` |
| Pago | bg-green-50 | text-green-700 | `bg-green-50 text-green-700` |
| Reembolsado | bg-gray-100 | text-gray-600 | `bg-gray-100 text-gray-600` |

**Nota:** O status "Pago" pode aparecer tanto no fluxo operacional (quando o pedido transita de "Novo" para "Pago") quanto no financeiro (indicando quitação). Na UI, usar o contexto para determinar qual badge aplicar.

Padding: 4px 12px (px-3 py-1)
Fonte: 12px, Medium (500)

### 4.5 Formulários

**Inputs**

- Borda: 1px #D1D5DB (`border-gray-300`)
- Border Radius: `rounded-md` (6px)
- Padding: 10px 14px
- Fonte: 14px
- Placeholder: #9CA3AF
- Focus: Ring 2px #1F3A5F, border #1F3A5F (transição 200ms)
- Disabled: Fundo #F3F4F6, texto #9CA3AF
- Error: Borda #C62828, ring #C62828

**Labels**

- Fonte: 14px, Medium (500), #374151
- Margin bottom: 6px

**Mensagens de Erro**

- Cor: #C62828
- Fonte: 12px, Regular
- Ícone: AlertCircle (16px) alinhado à esquerda
- Margin top: 4px
- Formato: "[Ícone] Mensagem descritiva"

**Mensagens de Sucesso**

- Cor: #2E7D32
- Fonte: 14px, Regular
- Ícone: CheckCircle (16px)
- Fundo: #E8F5E9 (quando em alert/notification)

**Estado de Loading no Formulário:**

- Spinner 16px ao lado do texto do botão submit
- Botão desabilitado durante submit
- Campos readonly durante submit

### 4.6 Navegação

**Sidebar (Desktop)**

- Largura: 256px (w-64)
- Fundo: Branco
- Borda direita: 1px #E5E7EB
- Item ativo: Fundo #F3F4F6, texto #1F3A5F, borda esquerda 3px #1F3A5F
- Item inativo: Texto #6B7280
- Hover: Fundo #F9FAFB
- Ícones: 20px, Lucide

**Top Bar Mobile**

- Altura: 64px
- Fundo: Branco
- Sombra sutil: shadow-sm
- Menu hambúrger: Ícone 24px
- Logo centralizada ou alinhada à esquerda

**Bottom Navigation (Mobile - Cliente)**

- Altura: 64px
- Fundo: Branco
- Borda superior: 1px #E5E7EB
- Itens principais: Início (Home), Vitrine, Meus Pedidos, Perfil
- Item ativo: Cor #1F3A5F
- Item inativo: Cor #9CA3AF
- **Nota:** Apenas visível para usuários no fluxo de cliente (não administrativo)

---

## 5. Layout e Grid

### 5.1 Grid System

- Container centralizado (`max-w-7xl mx-auto`)
- Padding lateral consistente:
  - Mobile: 16px (`px-4`)
  - Tablet: 24px (`px-6`)
  - Desktop: 32px (`px-8`)
- Grid de cards responsivo:
  - Mobile: 1 coluna (`grid-cols-1`)
  - Tablet (640px+): 2 colunas (`sm:grid-cols-2`)
  - Desktop (1024px+): 3 ou 4 colunas (`lg:grid-cols-3` or `lg:grid-cols-4`)
- Gap entre cards: 24px (`gap-6`)

### 5.2 Breakpoints Responsivos

| Breakpoint | Largura | Uso Principal |
|------------|---------|---------------|
| `sm` | ≥ 640px | Tablet pequeno, telas maiores de celular |
| `md` | ≥ 768px | Tablet, sidebar colapsável |
| `lg` | ≥ 1024px | Desktop pequeno, sidebar expandida |
| `xl` | ≥ 1280px | Desktop padrão |
| `2xl` | ≥ 1536px | Desktop grande |

### 5.3 Espaçamento

**Escala de Padding/Margin:**

- 4px (`space-1`)
- 8px (`space-2`)
- 12px (`space-3`)
- 16px (`space-4`)
- 24px (`space-6`)
- 32px (`space-8`)
- 48px (`space-12`)

**Seções:**

- Espaçamento entre seções: 48px (mobile), 64px (desktop)
- Espaçamento entre grupos relacionados: 24px
- Espaçamento entre itens relacionados: 16px
- Espaçamento entre label e input: 6px

---

## 6. Feedback ao Usuário

### 6.1 Mensagens e Alertas

**Toast Notifications (Sucesso)**

- Posição: Topo direito (desktop), topo central (mobile)
- Fundo: #FFFFFF
- Borda esquerda: 4px #2E7D32
- Sombra: shadow-lg
- Ícone: CheckCircle, cor #2E7D32
- Título: 14px, SemiBold, #111827
- Mensagem: 13px, Regular, #6B7280
- Duração: 4000ms
- Animação: Slide in 300ms ease-out, fade out 200ms

**Toast Notifications (Erro)**

- Borda esquerda: 4px #C62828
- Ícone: XCircle, cor #C62828
- Duração: 6000ms (erros permanecem mais tempo)

**Toast Notifications (Informação)**

- Borda esquerda: 4px #1565C0
- Ícone: Info, cor #1565C0

### 6.2 Estados de Loading

- Todas as listagens devem possuir estado vazio e loading

**Skeleton Screens:**

- Background: #F3F4F6
- Highlight: #E5E7EB
- Animação: Shimmer (left to right) ou Pulse
- Duração: 1500ms loop
- Border radius: 4px (textos), 8px (cards)

**Spinners:**

- Tamanhos: 16px (botões), 24px (seções), 48px (página)
- Cor: #1F3A5F
- Stroke width: 2px
- Animação: Rotate 360deg, 1000ms linear infinite

**Progresso de Carregamento de Página:**

- Barra fina no topo (2px)
- Cor: #1F3A5F
- Animação: Indeterminada (shimmer)

### 6.3 Estados de Erro

**Erro de Conexão:**

- Ícone: WifiOff (48px), cor #9CA3AF
- Título: "Sem conexão"
- Mensagem: "Verifique sua internet e tente novamente"
- Botão: "Tentar novamente" (Secundário)

**Erro 404:**

- Código: 96px, Bold, #E5E7EB
- Título: "Página não encontrada"
- Mensagem: "O recurso que você procura não existe"
- Botão: "Voltar para o início" (Primário)

**Erro 500:**

- Ícone: AlertTriangle (48px), cor #C62828
- Título: "Erro no servidor"
- Mensagem: "Algo deu errado. Tente novamente mais tarde."
- Botão: "Tentar novamente" (Secundário)

---

## 7. Animações e Transições

### 7.1 Durações Padrão

- Micro-interações (hover, focus): 150-200ms
- Modais e dropdowns: 200-300ms
- Page transitions: 300-400ms
- Toasts: 300ms (entrada), 200ms (saída)

### 7.2 Curvas de Aceleração

- Padrão: `ease` (ease-in-out)
- Entrada: `ease-out` (decelelar ao final)
- Saída: `ease-in` (acelerar ao final)
- Spring (bounce): `cubic-bezier(0.34, 1.56, 0.64, 1)` (apenas para modais importantes)

### 7.3 Padrões de Animação

**Hover em Cards:**

- Transform: translateY(-2px)
- Sombra: shadow-md (aparece suavemente)
- Duração: 200ms ease

**Modal/Dialog:**

- Backdrop: Fade in opacity 0 → 0.5, 200ms
- Conteúdo: Scale 0.95 → 1, opacity 0 → 1, 200ms ease-out
- Fechamento: Inverso, 150ms ease-in

**Dropdown Menu:**

- Origem: top, 8px acima
- Opacity: 0 → 1
- Transform: translateY(-8px) → translateY(0)
- Duração: 150ms ease-out

**Page Transition:**

- Opacity: 0 → 1
- Transform: translateY(10px) → translateY(0)
- Duração: 300ms ease-out

---

## 8. Ícones

**Biblioteca:** Lucide React
**Tamanhos padrão:**

- XS: 14px
- SM: 16px
- MD: 20px (padrão)
- LG: 24px
- XL: 32px

**Uso:**

- Navegação: 20px
- Ações em tabela: 18px
- Ilustrações de estado vazio: 48px
- Ícones de input (prefixo): 16px

---

## 9. Padrões de Busca e Filtro

**Busca Global:**

- Input com ícone Search (16px)
- Placeholder: "Buscar..."
- Largura: 240px (desktop), 100% (mobile)
- Debounce: 300ms
- Loading state: Spinner 16px no lugar do ícone

**Filtros:**

- Dropdown de seleção (Select nativo ou custom)
- Chips de filtro ativos (badges com X para remover)
- Botão "Limpar filtros" (Terciário)

**Ordenação:**

- Ícone ArrowUpDown ao lado do header clicável
- Alternância: Asc → Desc → Default

---

## 10. Diretrizes para Desenvolvimento Assistido por IA

- Respeitar padrões definidos neste documento.
- Gerar código compatível com as diretrizes descritas.
- Este documento será usado como base para geração de protótipos em ferramentas como o Google Stitch e Google AI Studio.
- As informações contidas neste documento devem ser entendidas diretrizes e não regras fixas. V1 pode ter mais liberdade.
- **Importante:** Separar visualmente Status do Pedido (operacional) de Status de Pagamento (financeiro) nas interfaces administrativas.
- **Validação:** Sempre implementar estados de loading e vazio em listagens; validar URLs de imagem antes de renderizar.