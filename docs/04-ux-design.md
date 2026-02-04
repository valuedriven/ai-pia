# Design de UX

## 1. Princípios de Design

- Clareza acima de estética
- Hierarquia visual explícita
- Redução de carga cognitiva
- Consistência semântica e visual
- Neutralidade visual (evitar modismos)

---

## 2. Identidade Visual

- Estilo sóbrio e funcional
- Ausência de elementos decorativos desnecessários
- Ênfase em texto, dados e estrutura (imagens usadas apenas em produtos)

---

## 3. Tipografia

### 3.1 Fontes

- Fonte Primária (Texto e Interface): Inter (Google Fonts)
- Fonte Secundária (Destaques Numéricos e Métricas): Inter SemiBold ou Medium

### 3.2 Hierarquia Tipográfica

| Uso | Tamanho | Peso |
|----|--------|------|
| Título Principal (H1) | 24–28px | SemiBold |
| Título de Seção (H2) | 20–22px | SemiBold |
| Subtítulo (H3) | 16–18px | Medium |
| Texto Base | 14–16px | Regular |
| Legendas | 12–13px | Regular |

---

## 4. Paleta de Cores

### 4.1 Cores Principais

| Uso | Cor | Hex | Referência Tailwind |
|---|---|---|---|
| Primária | Azul acadêmico | #1F3A5F | `bg-[#1F3A5F]` |
| Secundária | Cinza neutro | #6B7280 | `text-gray-500` |
| Fundo | Cinza claro | #F9FAFB | `bg-gray-50` |
| Texto | Cinza escuro | #111827 | `text-gray-900` |

### 4.2 Cores Funcionais

| Estado | Cor | Hex |
|---|---|---|
| Sucesso | Verde sóbrio | #2E7D32 |
| Alerta | Amarelo discreto | #F9A825 |
| Erro | Vermelho controlado | #C62828 |
| Informação | Azul claro | #1565C0 |

---

## 5. Componentes de Interface

### 5.1 Botões

**Primário**
- Fundo: #1F3A5F
- Texto: Branco
- Border Radius: `rounded-md` (4px ou 6px)

**Secundário**
- Fundo: Branco
- Borda: 1px sólida cinza (#D1D5DB)
- Texto: #1F3A5F

---

### 5.2 Cards

- Fundo branco
- Borda fina cinza claro (`border border-gray-200`)
- Sem sombra (estilo flat)
- **Área de Imagem:**
  - Proporção sugerida: 16:9 ou 1:1
  - Comportamento: `object-cover`
  - Fallback visual (ícone de imagem) caso a URL seja inválida ou vazia.
- **Conteúdo:** Título, Preço em destaque, Botão de ação.

---

### 5.3 Tabelas e Listas

- Cabeçalho com fundo cinza claro (`bg-gray-50`)
- Linhas com separadores sutis (`border-b`)
- Texto alinhado à esquerda
- Valores numéricos alinhados à direita

---

### 5.4 Indicadores de Status (Badges)

- Uso de badges textuais com fundo suave e texto escuro.
- Exemplo:
  - `Pago`: Fundo verde claro / Texto verde escuro
  - `Pendente`: Fundo amarelo claro / Texto amarelo escuro

---

## 6. Layout e Grid

### 6.1 Grid

- Container centralizado (`max-w-7xl mx-auto`)
- Padding lateral consistente (`px-4` mobile, `px-6` desktop)
- Grid de cards responsivo (1 col mobile -> 3 ou 4 cols desktop)

---

## 7. Feedback ao Usuário

- Mensagens textuais claras.
- **Erro de Formulário:** Texto vermelho pequeno abaixo do input.
- **Sucesso:** Toast ou Alerta no topo da tela (ex: "Produto criado com sucesso").

## 8. Acessibilidade

- Compatibilidade com leitores de tela
- Contraste adequado de cores
- Navegação por teclado
- Conformidade com WCAG 2.1 (nível A/AA)
- Busca deve ser feita por todos campos, exceto quando explicitado.
