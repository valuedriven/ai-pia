# Design System

## 1. Princípios

- Clareza acima de estética
- Semântica antes de aparência
- Consistência e previsibilidade
- Acessibilidade por padrão (WCAG 2.1 AA)
- Estilo neutro e atemporal
- Uso de tokens semânticos

---

## 2. Tokens de Design

### 2.1 Tokens de Cor (Semânticos)

```yaml
color:
  background:
    primary
    secondary
    surface
    subtle
  text:
    primary
    secondary
    muted
    inverse
  border:
    default
    subtle
    focus
  action:
    primary
    primary-hover
    secondary
    danger
  feedback:
    success
    warning
    error
    info
```

---

### 2.2 Tokens Tipográficos

```yaml
font:
  family:
    base
  size:
    xs
    sm
    md
    lg
    xl
    display
  weight:
    regular
    medium
    semibold
  lineHeight:
    tight
    normal
    relaxed
```

---

### 2.3 Tokens de Espaçamento

```yaml
space:
  xs
  sm
  md
  lg
  xl
  2xl
```

---

### 2.4 Tokens de Forma e Elevação

```yaml
radius:
  sm
  md
  lg
  pill

shadow:
  none
  sm
```

---

## 3. Componentes

### Botão

```yaml
button:
  variant:
    primary
    secondary
    ghost
    danger
  state:
    default
    hover
    focus
    disabled
    loading
```

---

### Input

```yaml
input:
  state:
    default
    focus
    error
    disabled
```

---

### Card

```yaml
card:
  surface: background.surface
  border: border.subtle
```

---

### Badge

```yaml
badge:
  context:
    operational
    financial
  tone:
    neutral
    success
    warning
    error
    info
```

---

## 4. Layout

```yaml
layout:
  container:
    maxWidth
    padding
  grid:
    cols:
      mobile
      tablet
      desktop
    gap
```

---

## 5. Feedback

```yaml
state:
  loading
  empty
  error
  success
```

---

## 6. Acessibilidade

- Contraste garantido via tokens
- Navegação por teclado
- Focus visível
- `prefers-reduced-motion` respeitado

---

## 7. Animações

```yaml
motion:
  duration:
    fast
    normal
  easing:
    standard
    entrance
    exit
```

---

## 8. Ícones

```yaml
icon:
  size:
    sm
    md
    lg
```

---

## 9. Diretrizes para IA

- Usar tokens semânticos
- Não gerar valores visuais fixos
- Documento como SSOT
