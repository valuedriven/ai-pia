# Product Requirements Definition (PRD)

## 1. Visão Geral do produto (sumário executivo)

O produto é uma plataforma digital destinada a microempreendedores que realizam vendas por redes sociais e aplicativos de mensagem. Seu objetivo é organizar e apoiar o fluxo de atendimento e vendas, reduzindo perdas causadas por processos manuais, desorganização de mensagens e falta de acompanhamento dos pedidos.

A solução centraliza contatos, conversas e pedidos originados de redes sociais, oferecendo uma visão estruturada do funil de vendas, priorização de atendimentos e acompanhamento do status de cada negociação, sem exigir conhecimentos técnicos ou processos complexos por parte do usuário.

O foco inicial do produto é simplicidade, rapidez de adoção e impacto direto na conversão de vendas.

---

## 2. Principais Recursos e Funcionalidades (Requisitos Funcionais)

### 2.1 Gestão de Clientes

- Cadastro manual com dados básicos dos clientes

### 2.2 Gestão de Pedidos

- Criação manual de pedidos
- Registro de informações básicas do pedido como cliente, produtos e forma de pagamento
- Atualização do status do pedido (ex: criado, aguardando pagamento, pago, entregue, cancelado)

### 2.3 Acompanhamento de Pagamentos

- Registro de pagamentos associados a pedidos
- Suporte a pagamentos parciais
- Indicação de pagamentos pendentes, concluídos ou atrasados
- Registro de data e valor de cada pagamento

### 2.4 Organização do Fluxo de Pedidos

- Visualização dos pedidos em um quadro de fluxo (ex: Aguardando pagamento, Pago, Entregue)
- Movimentação manual dos pedidos entre etapas
- Identificação visual de pedidos pendentes ou atrasados

### 2.5 Lembretes e Alertas

- Alertas de pedidos sem pagamento após período configurável
- Lembretes de cobrança manual
- Notificações de pedidos próximos ao vencimento

### 2.6 Relatórios Simples

- Total de vendas realizadas por período
- Total de valores pendentes de pagamento
- Taxa de pedidos pagos vs. não pagos
- Tempo médio entre criação do pedido e pagamento
- Dashboard gerencial

---

## 3. Principais Requisitos Técnicos (Requisitos Não Funcionais)

### 3.1 Autenticação e Autorização

- Autenticação baseada em e-mail e senha ou suporte a login social (ex: Google).
- Controle de acesso por usuário (perfil único na versão inicial).
- Proteção de rotas e dados por sessão/token (JWT ou equivalente).

### 3.2 Tecnologia de Backend

- Utlização do framework NestJS.
- API RESTful.
- Arquitetura modular e escalável.

### 3.3 Tecnologia de Frontend

- Utilização do framework Next.js e Tailwind CSS.
- Aplicação web responsiva.
- Interface simples, orientada a fluxo e produtividade.

### 3.4 Banco de Dados

- Banco de dados relacional PostgreSQL.
- Estrutura preparada para: Usuários, Contatos, Conversas, Pedidos.

### 3.5 Acessibilidade

- Interface compatível com leitores de tela.
- Contraste adequado de cores.
- Textos claros e linguagem simples.
- Conformidade básica com WCAG 2.1 (nível A/AA).

---

## 4. Métricas de Sucesso

### 4.1 Métricas de Uso

- Número de usuários ativos diários (DAU)
- Quantidade de pedidos registrados

### 4.2 Métricas de Eficiência

- Redução do tempo médio de resposta ao cliente

### 4.3 Métricas de Negócio

- Aumento percentual nas vendas realizadas
- Redução de vendas perdidas por falta de acompanhamento

### 4.4 Métricas de Satisfação

- Feedback qualitativo dos usuários
- Taxa de churn mensal
