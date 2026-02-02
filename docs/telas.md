# Descrição de Interfaces

## 1 Tela: Login

**Objetivo da Tela**  
Permitir que o usuário acesse sua conta de forma simples e rápida.

**Usuário Envolvido**  
Microempreendedor (usuário final)

**Elementos Principais**
- Campo de e-mail
- Campo de senha
- Botão **Entrar**
- Botão **Entrar com Google**
- Link **Criar conta**
- Link **Esqueci minha senha**

**Ações Disponíveis**
- Autenticar usuário
- Redirecionar para cadastro
- Recuperar senha

**Navegação**
- Login bem-sucedido → Dashboard  
- Criar conta → Tela de Cadastro

---

## 2 Tela: Dashboard (Visão Geral)

**Objetivo da Tela**  
Fornecer uma visão rápida do status financeiro e operacional dos pedidos.

**Usuário Envolvido**  
Microempreendedor

**Elementos Principais**
- Resumo de métricas:
  - Total recebido
  - Total pendente
  - Pedidos em atraso
- Lista resumida de pedidos recentes
- Botão de ação primária: **Novo Pedido**

**Ações Disponíveis**
- Criar novo pedido
- Acessar lista completa de pedidos
- Visualizar detalhes de um pedido

**Navegação**
- Novo Pedido → Tela de Criação de Pedido  
- Pedido selecionado → Tela de Detalhe do Pedido

---

## 3 Tela: Lista de Pedidos

**Objetivo da Tela**  
Permitir a visualização, filtragem e organização dos pedidos.

**Usuário Envolvido**  
Microempreendedor

**Elementos Principais**
- Lista ou quadro de pedidos por status
- Filtros:
  - Status do pedido
  - Período
  - Pagamento pendente
- Indicadores visuais de atraso

**Ações Disponíveis**
- Filtrar pedidos
- Selecionar pedido
- Criar novo pedido

**Navegação**
- Pedido selecionado → Tela de Detalhe do Pedido  
- Novo Pedido → Tela de Criação de Pedido

---

## 4 Tela: Criação de Pedido

**Objetivo da Tela**  
Registrar um novo pedido de forma rápida.

**Usuário Envolvido**  
Microempreendedor

**Elementos Principais**
- Campo de identificação do cliente (texto livre)
- Campo de descrição do pedido ou produtos
- Campo de valor total
- Seleção de forma de pagamento
- Botão **Salvar Pedido**

**Ações Disponíveis**
- Salvar pedido
- Cancelar criação

**Navegação**
- Salvar Pedido → Tela de Detalhe do Pedido  
- Cancelar → Tela anterior

---

## 5 Tela: Detalhe do Pedido

**Objetivo da Tela**  
Acompanhar o status do pedido e dos pagamentos associados.

**Usuário Envolvido**  
Microempreendedor

**Elementos Principais**
- Informações do pedido
- Status atual do pedido
- Histórico de pagamentos
- Indicador de valor pago x pendente

**Ações Disponíveis**
- Alterar status do pedido
- Registrar novo pagamento
- Editar pedido
- Cancelar pedido

**Navegação**
- Registrar pagamento → Modal ou Tela de Registro de Pagamento  
- Voltar → Lista de Pedidos

---

## 6 Tela: Registro de Pagamento

**Objetivo da Tela**  
Permitir o registro manual de um pagamento recebido.

**Usuário Envolvido**  
Microempreendedor

**Elementos Principais**
- Campo de valor pago
- Campo de data do pagamento
- Seleção de método de pagamento
- Botão **Confirmar Pagamento**

**Ações Disponíveis**
- Confirmar pagamento
- Cancelar

**Navegação**
- Confirmar → Tela de Detalhe do Pedido  
- Cancelar → Tela de Detalhe do Pedido

---
