# Especificação de UI

## 1. Fluxos de Navegação

### 1.1 Cliente

1. Navega na vitrine (produtos com imagem e preço).
2. Verifica detalhe do produto.
3. Enche carrinho.
4. Faz login.
5. Cria pedido (checkout simplificado).
6. Acompanha status (aguardando pagamento, pago, etc.).

### 1.2 Administrador

1. Gerencia produtos.
2. Gerencia clientes.
3. Analisa dashboard.
4. Acompanha lista de pedidos recebidos.

---

## 2. Detalhamento das Telas

### 2.1 – Login

- Campos: E-mail, Senha.
- Botões: Entrar.
- Links: Criar conta (define perfil Admin ou Cliente no cadastro).

### 2.2 – Dashboard Administrativo

- Conteúdo: Cards de métricas (KPIs): Total Recebido (R$), Total Pendente (R$), Pedidos em Atraso, Satisfação do cliente.
- Links: Produtos, Clientes, Pedidos, Pagamentos.
- Observações: Lista resumida dos últimos 5 pedidos.

### 2.3 – Cadastro e Gestão de Produtos

- Campos: URL da Imagem, Nome do Produto, Descrição, Preço, Estoque, Categoria, Ativo/Inativo.
- Botões: Cadastrar Produto, Salvar, Editar, Excluir.
- Links: —
- Visualização em tabela com imagem (miniatura), nome, preço, estoque e ações.
- Formulário único para criação e edição.

### 2.4 – Vitrine de Produtos

- Campos: Busca de produtos.
- Botões: Adicionar, Ver Detalhes.
- Links: —
- Grid de cards de produtos.
- Cada card exibe imagem, nome e preço formatado.
- Pode ser acessada por usuário logado ou não.

### 2.5 – Criação de Pedido / Carrinho

- Campos: Quantidade por item
- Botões: Confirmar Pedido
- Links: —
- Lista de itens selecionados (imagem, nome, quantidade, subtotal)
- Exibição do valor total calculado automaticamente

### 2.6 – Lista de Pedidos (Cliente)

- Campos: —
- Botões: —
- Links: Acessar Detalhe do Pedido
- Lista histórica de pedidos
- Colunas: ID, Data, Total, Status (com badge visual)

### 2.7 – Detalhe do Pedido

- Campos: —
- Botões: Alterar Status (Admin), Registrar Pagamento (Admin)
- Links: —
- Cabeçalho com ID e status atual
- Lista de itens exibindo o preço pago no momento da compra
- Histórico de pagamentos associados ao pedido

### 2.8 – Registro de Pagamento

- Campos: Valor, Data, Método de Pagamento
- Botões: Confirmar
- Links: —
- Disponível para usuário administrador
- Valor sugerido automaticamente como saldo restante

---

## 3 - Componentes Reutilizáveis

- Cartão de produto.
- Tabela de pedidos.
- Indicadores de status.

---

## 4. Diretrizes para IA

- Manter nomenclatura consistente entre telas.
- Gerar interfaces alinhadas ao mapa de navegação e aos fluxos definidos.
- Este documento será utilizado para criar protótipos e wireframes em ferramentas como o Google Stitch.
