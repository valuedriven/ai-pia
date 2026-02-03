# Descrição de Interfaces

## Visão Geral de Usuários e Fluxos

### Tipos de Usuário
- **Microempreendedor (Admin):** Gestão total do negócio.
- **Cliente:** Consumo e acompanhamento.

### Fluxos de Navegação
- **Admin:** Login → Dashboard → Produtos → Pedidos → Pagamentos.
- **Cliente:** Login/Vitrine → Detalhe Produto → Carrinho/Checkout → Meus Pedidos.

---

## 1. Tela: Login

**Elementos Principais**
- Campo de e-mail e Senha
- Botão **Entrar**
- Link **Criar conta** (Define se é Admin ou Cliente no cadastro)

---

## 2. Tela: Dashboard Administrativo (Microempreendedor)

**Elementos Principais**
- Cards de métricas (KPIs):
  - Total Recebido (R$)
  - Total Pendente (R$)
  - Pedidos em Aberto (Qtd)
- Lista resumida dos últimos 5 pedidos.

**Navegação**
- Sidebar ou Menu Superior com links para Produtos, Pedidos e Pagamentos.

---

## 3. Tela: Cadastro e Gestão de Produtos

**Objetivo** CRUD de produtos.

**Elementos Principais (Lista)**
- Tabela com: Imagem (miniatura), Nome, Preço, Estoque, Ações (Editar/Excluir).

**Elementos Principais (Formulário)**
- **URL da Imagem** (Campo de texto simples na V1).
- Nome do Produto.
- Descrição.
- Preço (Input numérico/decimal).
- Estoque (Input numérico).
- Switch Ativo/Inativo.

---

## 4. Tela: Vitrine de Produtos (Cliente)

**Objetivo** Navegação pública ou logada para compra.

**Elementos Principais**
- Grid de Cards de Produtos.
- Cada card contém:
  - **Imagem de destaque**.
  - Nome do produto.
  - Preço formatado (R$).
  - Botão "Adicionar" ou "Ver Detalhes".
- Barra de busca simples.

---

## 5. Tela: Criação de Pedido / Carrinho (Cliente)

**Objetivo** Revisão e confirmação de compra.

**Elementos Principais**
- Lista de itens selecionados (Imagem, Nome, Qtd, Subtotal).
- Resumo de valores (Total Geral).
- Botão **Confirmar Pedido**.

---

## 6. Tela: Lista de Pedidos (Cliente)

**Elementos Principais**
- Lista histórica de pedidos.
- Colunas: #ID, Data, Total, Status (Badge colorido).

---

## 7. Tela: Detalhe do Pedido (Visão Comum)

**Elementos Principais**
- Cabeçalho: Status atual e ID.
- Lista de Itens (exibindo o **preço pago na época**, não o atual).
- Histórico de Pagamentos registrados.

**Ações Específicas (Admin)**
- Alterar Status (Dropdown).
- Registrar Pagamento (Botão que abre modal/tela).

---

## 8. Tela: Registro de Pagamento (Modal ou Tela)

**Usuário:** Admin
**Elementos:**
- Valor (default = restante a pagar).
- Data.
- Método (Texto livre ou Select: PIX, Dinheiro, Cartão).
- Botão Confirmar.

---