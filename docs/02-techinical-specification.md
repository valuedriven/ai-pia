# Arquitetura de Referência

## 1. Visão Geral da Arquitetura

A plataforma adota uma arquitetura **client-server baseada em APIs REST**, com separação clara entre frontend, backend e persistência de dados.  
O desenho arquitetural prioriza simplicidade, baixo acoplamento, clareza conceitual e capacidade de evolução progressiva.

O sistema suporta **dois fluxos de navegação distintos**, compartilhando a mesma base técnica, mas com isolamento lógico de dados (Multi-tenancy Lógico):
- **Microempreendedor (Administrador)**: gestão de produtos, pedidos e pagamentos (acessa apenas seus próprios dados).
- **Cliente**: navegação pela vitrine e criação de pedidos vinculados a um microempreendedor específico.

---

## 2. Stack Tecnológica (Decisões Técnicas)

* **Frontend:** Next.js (App Router) + Tailwind CSS.
* **Backend:** NestJS (Arquitetura Modular); API RESTful.
* **Banco de Dados:** PostgreSQL.
* **ORM:** Prisma.
* **Autenticação e Autorização:** Auth0.

## 3. Visão em Camadas

### 3.1 Camada de Apresentação (Frontend)

- Renderização das interfaces (SSR e Client Components)
- Navegação e roteamento
- Validação básica de formulários
- Experiência adaptada ao perfil do usuário (Vitrine vs Dashboard)

---

### 3.2 Camada de Aplicação (Backend / API)

- Casos de uso e orquestração de serviços
- Regras de negócio (ex: cálculo de total, transição de status)
- Autenticação e Autorização (Guards e Strategies)

---

### 3.3 Camada de Domínio

- **Usuário:** Com flag de Role (ADMIN ou CLIENT).
- **Produto:** Vinculado estritamente a um Owner (Admin).
- **Pedido:** Vinculado a um Cliente (criador) e a um Owner (vendedor).
- **Item de Pedido:** Contém cópia do preço no momento da venda (Snapshot).
- **Pagamento:** Registro financeiro associado ao pedido.

---

### 3.4 Camada de Persistência

- Mapeamento Objeto-Relacional
- Migrations
- Queries tipadas

---

## 4. Módulos Principais (NestJS)

- **AuthModule:** Gestão de login, registro e tokens.
- **UserModule:** Gestão de perfis.
- **ProductModule:** CRUD de produtos (escrita restrita a Admin).
- **OrderModule:** Lógica de carrinho, checkout e atualização de status.
- **PaymentModule:** Registro de pagamentos manuais.
- **DashboardModule:** Agregação de métricas para o Admin.

---

## 5. Fluxos Principais

### Cliente
1. Navega na vitrine (produtos com imagem e preço).
2. Cria pedido (checkout simplificado).
3. Acompanha status (aguardando pagamento, pago, etc.).

### Administrador
1. Gerencia produtos (incluindo upload/URL de imagem).
2. Acompanha lista de pedidos recebidos.
3. Registra pagamentos manualmente.

---

## 6. Segurança e Tenancy

- **Isolamento de Dados**: Todo Service de Admin deve injetar o request.user.id nas cláusulas where do Prisma para garantir que um microempreendedor não acesse dados de outro.
- **Proteção de Rotas**: Endpoints /admin/* exigem Role ADMIN.

---

## 7. Evolução Futura

- Upload de imagens via Storage (S3/R2) - *Atualmente apenas URL*.
- Integração real com gateway de pagamentos.
- Notificações por e-mail/WhatsApp.
