# Especificação de Entidades e UI

## 1. Entidades

### 1.1. Principais Entidades

- Produto: Nome do Produto, Categoria, Imagem, Descrição, Estoque, Ativo.
- Cliente: Nome do cliente, Endereço, e-mail, Telefone, Ativo.
- Pedido: Número do pedido, Valor Total, Identificação do Cliente, Endereço de entrega, Status do Pedido, Data de pagamento, Método de pagamento.
- Item de Pedido: Identificação do pedido, Identificação do produto, Preço Unitário, Quantidade.

### 1.2. Domínios

- Status do pedido: Novo, Pago, Preparação, Faturado, Despachado, Entregue, Cancelado.
- Métodos de pagamento: Cartão de Crédito, Cartão de Débito, Pix, Dinheiro.
- Categorias do produto: Moda e Acessórios, Eletrônicos e Informática, Beleza e Cuidados Pessoais, Casa e Decoração.

**Regras de Transição do Status do Pedido:**

- `Novo` → `Cancelado` (permitido)
- `Novo` → `Pago` → `Preparação` → `Faturado` → `Despachado` → `Entregue` (sequencial)
- Qualquer estado (exceto `Entregue` e `Cancelado`) → `Cancelado` (permitido)

### 1.3 Esquema

Disponível no arquivo prisma.schema.

---

## 2. Interfaces gráficas

### TEL-01 Página Inicial

- Campos: -
- Botões: Login/Logout
- Links: Informações de sessão
- Objetos: Menu lateral, Vitrine, Listagem dos últimos pedidos
- A vitrine está disponível para usuários não logados.

### TEL-02 Login

- Campos: E-mail, Senha.
- Botões: Entrar.
- Links: Criar conta (define perfil Cliente no cadastro).

### TEL-03 Vitrine de Produtos

- Campos: Busca de produtos.
- Botões: Adicionar, Ver Detalhes.
- Links: —
- Grid de cards de produtos.
- Cada card exibe imagem, nome e preço formatado.
- Pode ser acessada por usuário logado ou não.

### TEL-04 Carrinho de Compras

- Campos: Quantidade por item
- Botões: Confirmar Pedido
- Links: —
- Lista de itens selecionados (imagem, nome, quantidade, subtotal)
- Exibição do valor total calculado automaticamente

### TEL-05 Acompanhamento de Pedidos

- Campos: —
- Botões: —
- Links: Acessar Detalhe do Pedido
- Lista histórica de pedidos
- Colunas: ID, Data, Total, Status (com badge visual)

### TEL-06 Detalhe do Pedido

- Campos: —
- Botões: Alterar Status (Admin), Registrar Pagamento (Admin)
- Links: —
- Cabeçalho com ID e status atual
- Lista de itens exibindo o preço pago no momento da compra

### TEL-07 Gestão de Produtos

- Campos: Nome do Produto, Imagem, Descrição, Preço, Estoque, Categoria, Ativo (s/n).
- Botões: Cadastrar, Salvar, Editar, Excluir.
- Links: —
- Visualização em tabela com imagem (miniatura), nome, preço, estoque e ações.
- Formulário único para criação e edição.

### TEL-08 Gestão de Clientes

- Campos: Nome do cliente, Endereço, e-mail, Telefone.
- Botões: Cadastrar, Salvar, Editar, Excluir.
- Links: —
- Visualização em tabela.
- Formulário único para criação e edição.

### TEL-09 Gestão de Pedidos

- Campos: —
- Botões: —
- Links: Acessar Detalhe do Pedido
- Lista histórica de pedidos
- Colunas: ID, Data, Total, Status (com badge visual)

### TEL-10 Dashboard

- Cards de métricas (KPIs): Valor Recebido (R$), Valor Pendente (R$).
- Links: Produtos, Clientes, Pedidos, Pagamentos.
- Observações: Lista resumida dos últimos 5 pedidos.

---

## 3. Fluxo de Navegação

### Home (Página Inicial)

- Banner Principal
- Vitrine
- Rodape
- Login/Logout

### Fluxo de Compra

- Busca: Resultados de Pesquisa
- Produto: Detalhes, Preço
- Carrinho: Resumo de Itens
- Checkout:
    Identificação (Login/Cadastro)
    Envio (Endereço e Frete)
    Pagamento
    Confirmação do Pedido

### Área do Administrador

  Dashboard
  Pedidos
  Produtos
  Clientes  

### Área do Cliente

  Meus Pedidos
  Dados Cadastrais

---

## 4. Diretrizes para IA

- Este documento será utilizado para criar protótipos e wireframes em ferramentas como o Google Stitch
- Gerar interfaces alinhadas ao mapa de navegação e aos fluxos definidos
- Manter nomenclatura consistente entre telas
- Utilizar componentes reutilizáveis sempre que possível
- Respeitar hierarquia visual e espaçamentos do UX Design
- Garantir que ações administrativas estejam protegidas por verificação de perfil
- Implementar estados de loading e vazio em todas as listagens
- Usar badges de status conforme paleta definida
- Validar campos de formulário em tempo real quando possível
- Confirmar ações destrutivas antes de executar
- Manter consistência de ícones (biblioteca Lucide)
- Implementar navegação por teclado para acessibilidade
