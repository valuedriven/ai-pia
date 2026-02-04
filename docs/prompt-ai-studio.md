# Solicitação de Criação de Projeto de Software

Você é um desenvolvedor full-stack sênior especializado em Next.js, NestJS e PostgreSQL. Preciso que você crie um projeto completo de software baseado na documentação técnica fornecida abaixo.

## Contexto do Projeto

Trata-se de uma plataforma digital para microempreendedores gerenciarem vendas, produtos, pedidos e pagamentos. O sistema possui dois perfis distintos: Administrador (microempreendedor) e Cliente (consumidor).

## Documentação de Referência

### 1. Product Requirements Document (PRD)
- **Objetivo:** Plataforma de gestão de vendas para microempreendedores
- **Perfis:** Administrador e Cliente
- **Funcionalidades principais:**
  - Gestão de Produtos (CRUD)
  - Vitrine de Produtos para clientes
  - Criação e Gestão de Pedidos
  - Acompanhamento de Pagamentos (manual)
  - Relatórios e Dashboard gerencial
- **Status de Pedidos:** Criado, Aguardando pagamento, Pago, Entregue, Cancelado
- **Fora do escopo v1.0:** Chat, CRM avançado, gateway de pagamento automático, controle de estoque

### 2. Especificação Técnica
- **Arquitetura:** Client-Server REST API
- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend:** NestJS (Arquitetura Modular)
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** Auth0
- **Multi-tenancy:** Lógico (cada admin vê apenas seus dados)

**Módulos NestJS:**
- AuthModule, UserModule, ProductModule, OrderModule, PaymentModule, DashboardModule

**Entidades principais:**
- User (com Role: ADMIN/CLIENT)
- Product (vinculado a um Owner/Admin)
- Order (vinculado a Cliente e Owner)
- OrderItem (snapshot de preço)
- Payment (registro manual)

### 3. Design System
- **Princípios:** Clareza, hierarquia visual, consistência
- **Tipografia:** Inter (Google Fonts)
- **Cores:**
  - Primária: #1F3A5F (azul acadêmico)
  - Secundária: #6B7280 (cinza neutro)
  - Fundo: #F9FAFB
  - Texto: #111827
- **Componentes:** Botões flat, Cards sem sombra, Badges de status, Tabelas limpas
- **Layout:** Container max-w-7xl, Grid responsivo

### 4. Interfaces Principais
**Admin:**
- Dashboard (métricas: Total Recebido, Pendente, Pedidos Abertos)
- Gestão de Produtos (tabela + formulário com URL de imagem)
- Lista de Pedidos
- Detalhe de Pedido (com ação para registrar pagamento)

**Cliente:**
- Vitrine de Produtos (grid de cards com imagem)
- Carrinho/Checkout
- Meus Pedidos
- Detalhe do Pedido

## O que você deve entregar

1. **Estrutura do Projeto:**
   - Configuração completa do monorepo ou repositórios separados (frontend + backend)
   - Arquivos de configuração (package.json, tsconfig, next.config, nest-cli.json)

2. **Backend (NestJS):**
   - Estrutura modular completa
   - Schema Prisma com todas as entidades e relacionamentos
   - Controllers, Services e DTOs para cada módulo
   - Guards de autenticação e autorização (Role-based)
   - Implementação de isolamento de dados (multi-tenancy)

3. **Frontend (Next.js):**
   - Estrutura de pastas com App Router
   - Componentes reutilizáveis seguindo o Design System
   - Páginas para Admin: /admin/dashboard, /admin/products, /admin/orders
   - Páginas para Cliente: /, /products, /cart, /my-orders
   - Integração com API (fetch ou axios)
   - Formulários com validação

4. **Banco de Dados:**
   - Schema Prisma completo
   - Migrations iniciais
   - Seeds básicos (usuário admin de teste)

5. **Configuração de Autenticação:**
   - Integração básica com Auth0
   - Proteção de rotas por Role

6. **Documentação:**
   - README com instruções de setup
   - Variáveis de ambiente necessárias (.env.example)
   - Como rodar o projeto localmente

## Requisitos Específicos

- Utilize TypeScript em todo o projeto
- Implemente validação de dados (class-validator no backend)
- Siga as convenções de nomenclatura do NestJS e Next.js
- Garanta que produtos exibam imagem via URL (com fallback visual)
- Implemente cálculo automático de total do pedido
- Registre snapshot de preço no OrderItem (não referência ao Product)
- Permita pagamentos parciais com registro de múltiplos pagamentos por pedido
- Dashboard deve calcular: soma de pagamentos recebidos, valor pendente, contagem de pedidos

## Formato de Entrega

Por favor, organize o código em blocos bem estruturados, com comentários explicativos onde necessário. Indique claramente:
- Estrutura de pastas
- Comandos para instalação e execução
- Pontos de atenção ou decisões técnicas tomadas

Comece pela estrutura do projeto e schema do banco de dados, depois prossiga com backend e finalize com frontend.