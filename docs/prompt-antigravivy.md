# Prompt

Atue como um Arquiteto de Software Sênior e Desenvolvedor Full Stack Especialista. Sua tarefa é estruturar e gerar o código inicial para uma plataforma de gestão para microempreendedores, seguindo estritamente as especificações abaixo.

## 1. Contexto do Projeto
O sistema é uma plataforma web para microempreendedores organizarem vendas. Possui dois perfis distintos:
1.  **Microempreendedor (Admin):** Gerencia produtos, pedidos e pagamentos.
2.  **Cliente (Consumidor Final):** Acessa uma vitrine pública, cria pedidos e acompanha status.

## 2. Stack Tecnológica (Obrigatória)
* **Banco de Dados:** PostgreSQL.
* **ORM:** Prisma (preferencialmente) ou TypeORM.
* **Backend (API):** NestJS (Arquitetura em Camadas: Controller, Service, Repository).
* **Frontend:** Next.js (App Router).
* **Estilização:** Tailwind CSS.
* **Autenticação:** JWT com RBAC (Roles: 'ADMIN', 'CLIENT').

## 3. Especificações de Design (Design System)
Configure o `tailwind.config.js` e as variáveis globais com:
* **Cores:**
    * Primária: #1F3A5F (Azul acadêmico)
    * Secundária: #6B7280 (Cinza neutro)
    * Fundo: #F9FAFB
    * Sucesso: #2E7D32 | Erro: #C62828 | Alerta: #F9A825
* **Tipografia:** Fonte 'Inter'. Estilo sóbrio, sem elementos decorativos excessivos.
* **Componentes:** Botões com cantos levemente arredondados; Cards com borda fina e sem sombra (flat).

## 4. Modelagem de Dados (Entidades Principais)
Crie o schema do banco de dados contemplando:
* **User:** id, email, password_hash, role (ADMIN/CLIENT).
* **Product:** id, name, description, price, stock, active (boolean), owner_id (relation to User).
* **Order:** id, total_value, status (CREATED, PENDING_PAYMENT, PAID, DELIVERED, CANCELED), customer_id, owner_id.
* **OrderItem:** relation Order <-> Product, quantity, unit_price.
* **Payment:** id, amount, date, method, order_id.

## 5. Requisitos Funcionais por Módulo

### A. Backend (NestJS)
Implemente os seguintes módulos:
1.  **AuthModule:** Login, Registro e Guards de proteção (JWT).
2.  **ProductModule:** CRUD completo (apenas Admin cria/edita; Cliente apenas lê ativos).
3.  **OrderModule:**
    * Cliente: Cria pedido (seleciona itens).
    * Admin: Visualiza lista, atualiza status.
4.  **DashboardModule:** Endpoint que retorna métricas simples (Total Vendido, Total Pendente).

### B. Frontend (Next.js)
Estruture as rotas para dois fluxos:
1.  **Fluxo Público/Cliente:**
    * `/` (Login)
    * `/vitrine` (Lista de produtos em cards)
    * `/pedido/novo` (Carrinho/Checkout simplificado)
    * `/meus-pedidos` (Lista e status)
2.  **Fluxo Admin (Protegido):**
    * `/admin/dashboard` (Resumo financeiro)
    * `/admin/produtos` (Tabela de gestão)
    * `/admin/pedidos` (Kanban ou Lista de pedidos com status)
    * `/admin/pagamentos` (Registro manual de pagamento em um pedido).

## 6. Tarefa de Execução
Com base nessas especificações:
1.  Gere o **Schema do Prisma (`schema.prisma`)**.
2.  Gere a estrutura de pastas do **NestJS** (Backend) com um exemplo de implementação do `OrdersController` e `OrdersService`.
3.  Gere a configuração do **Tailwind CSS** (`tailwind.config.js`) com a paleta de cores especificada.
4.  Crie um componente React (Frontend) para o **Card de Produto** da Vitrine, seguindo o estilo visual descrito (Borda fina, sem sombra, botão primário #1F3A5F).

Por favor, priorize a clareza do código e a separação de responsabilidades.