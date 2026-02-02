# Design System

## 1. Princípios de Design

- Clareza acima de estética
- Hierarquia visual explícita
- Redução de carga cognitiva
- Consistência semântica e visual
- Neutralidade visual (evitar modismos)

---

## 2. Identidade Visual

### 2.1 Estilo Visual

- Estilo sóbrio e funcional
- Ausência de elementos decorativos desnecessários
- Ênfase em texto, dados e estrutura
- Uso restrito de ícones, apenas quando agregam significado semântico

---

## 3. Tipografia

### 3.1 Fontes

**Fonte Primária (Texto e Interface)**
- Inter  
  *Alternativa:* Roboto, Source Sans 3

**Fonte Secundária (Destaques Numéricos e Métricas)**
- Inter SemiBold ou Medium

### 3.2 Hierarquia Tipográfica

| Uso | Tamanho | Peso |
|----|--------|------|
| Título Principal (H1) | 24–28px | SemiBold |
| Título de Seção (H2) | 20–22px | SemiBold |
| Subtítulo (H3) | 16–18px | Medium |
| Texto Base | 14–16px | Regular |
| Legendas | 12–13px | Regular |

- Alinhamento à esquerda
- Espaçamento vertical consistente (8px, 16px, 24px)

---

## 4. Paleta de Cores

### 4.1 Cores Principais

| Uso | Cor | Hex |
|---|---|---|
| Primária | Azul acadêmico | #1F3A5F |
| Secundária | Cinza neutro | #6B7280 |
| Fundo | Cinza claro | #F9FAFB |

### 4.2 Cores Funcionais

| Estado | Cor | Hex |
|---|---|---|
| Sucesso | Verde sóbrio | #2E7D32 |
| Alerta | Amarelo discreto | #F9A825 |
| Erro | Vermelho controlado | #C62828 |
| Informação | Azul claro | #1565C0 |

- Evitar gradientes
- Evitar cores saturadas
- Contraste mínimo WCAG AA

---

## 5. Componentes de Interface

### 5.1 Botões

**Primário**
- Fundo: cor primária
- Texto: branco
- Uso restrito a ações principais

**Secundário**
- Fundo: branco
- Borda: cinza médio
- Texto: cor primária

**Texto**
- Sem fundo ou borda
- Usado para ações auxiliares

---

### 5.2 Cards

- Fundo branco
- Borda fina cinza claro
- Sem sombra ou sombra mínima
- Usados para:
  - Resumos
  - Métricas
  - Agrupamento semântico

---

### 5.3 Tabelas e Listas

- Cabeçalho com fundo cinza claro
- Linhas com separadores sutis
- Texto alinhado à esquerda
- Valores numéricos alinhados à direita

---

### 5.4 Indicadores de Status

- Uso de **badges textuais**, não apenas cores
- Exemplo:
  - `Pago`
  - `Pendente`
  - `Atrasado`

Formato:
- Borda fina
- Texto em maiúsculas ou small caps
- Cores funcionais discretas

---

## 6. Layout e Grid

### 6.1 Grid

- Grid de 12 colunas (desktop)
- Coluna única (mobile)
- Margens amplas para leitura confortável

### 6.2 Espaçamento

- Sistema baseado em múltiplos de 8px
- Separação clara entre seções
- Evitar densidade excessiva de informação

---

## 7. Ícones

- Estilo linear (outline)
- Espessura consistente
- Usar apenas quando reforçam significado
- Nunca como único meio de transmitir informação

---

## 8. Estados e Feedback

### 8.1 Estados Visuais

- Hover discreto
- Foco visível (acessibilidade)
- Estados desabilitados claramente distinguíveis

### 8.2 Feedback ao Usuário

- Mensagens textuais claras
- Linguagem objetiva e neutra
- Evitar termos ambíguos ou informais

Exemplo:
- “Pagamento registrado com sucesso.”
- “Há pedidos com pagamento pendente.”

---

## 9. Acessibilidade

- Contraste mínimo WCAG 2.1 AA
- Navegação completa via teclado
- Labels explícitos em campos
- Mensagens de erro descritivas
- Não depender exclusivamente de cor

---

## 10. Tom de Comunicação

- Formal, claro e objetivo
- Evitar jargões técnicos desnecessários
- Preferir termos consistentes e bem definidos
- Mensagens curtas e informativas

---

## 11. Observações para Prototipação (Google Stitch)

- Priorizar legibilidade sobre estética
- Manter consistência entre telas
- Repetir padrões de layout
- Usar o mesmo conjunto de componentes em todo o protótipo
- Destacar claramente ações primárias e estados críticos
