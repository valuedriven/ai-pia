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

- Página contendo Barra superior, Vitrine e Rodapé.
- Barra superior: Logo, Barra de busca, Sessão (Login/Logout).
- Campos: -
- Botões: -
- Links: -

### TEL-02 Login

- Formulário para acesso e/ou cadastro.
- Campos: E-mail, Senha.
- Botões: Entrar.
- Links: Criar conta (define perfil Cliente no cadastro).

### TEL-03 Vitrine de Produtos

- Grid de cards (cada um contendo imagem, nome e preço formatado de produto).
- Campos: -
- Botões: Adicionar ao carrinho (em cada card)
- Links: —

### TEL-04 Carrinho de Compras

- Lista de produtos selecionados incluindo imagem, nome, quantidade, subtotal.
- Campos: Quantidade por item
- Botões: Confirmar Pedido
- Links: Excluir
- Exibição do valor total calculado automaticamente

### TEL-05 Acompanhamento de Pedidos

- Lista histórica de pedidos: Número, Data, Total, Status (com badge visual)
- Campos: —
- Botões: —
- Links: Acessar Detalhe do Pedido

### TEL-06 Detalhe do Pedido

- Formulario com número do pedido, Status do pedido, lista de produtos comprados.
- Cliente apenas visualiza.
- Campos: —
- Botões: Alterar Status (Admin).
- Links: —

### TEL-07 Gestão de Produtos

- Lista com imagem (miniatura), nome, preço, estoque e ações.
- Formulário único para criação e edição.
- Campos: Nome do Produto, Imagem, Descrição, Preço, Estoque, Categoria, Ativo (s/n).
- Botões: Cadastrar, Salvar, Editar, Excluir.
- Links: —

### TEL-08 Gestão de Clientes

- Lista com dados de cada cliente.
- Formulário único para criação e edição.
- Campos: Nome do cliente, Endereço, e-mail, Telefone.
- Botões: Cadastrar, Salvar, Editar, Excluir.
- Links: —

### TEL-09 Gestão de Pedidos

- Lista com dados de cada pedido: ID, Data, Total, Status (com badge visual)
- Campos: —
- Botões: —
- Links: Acessar Detalhe do Pedido

### TEL-10 Dashboard

- Grid com cards de métricas (KPIs): Total de Vendas, Valor Recebido (R$), Valor Pendente (R$).
- Exclusivo do administrador.
- Lista resumida dos últimos 5 pedidos.
- Links: Produtos, Clientes, Pedidos, Pagamentos.

---

## 3. Fluxo de Navegação

### Home (Página Inicial)

- Barra Principal
- Vitrine
- Rodape

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
- Implementar navegação por teclado para acessibilidade
