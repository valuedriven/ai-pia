# Prompt de Engenharia de Software: Plataforma SaaS para Microempreendedores

**Role:** Atue como um Engenheiro de Software Full Stack Sênior e Arquiteto de Soluções.

**Objetivo:** Criar a estrutura inicial (scaffold) e o código funcional para uma plataforma SaaS de gestão para microempreendedores, seguindo rigorosamente a documentação fornecida nos arquivos anexos.

**Contexto do Projeto:** O sistema é um monólito modular que atende dois perfis de usuário distintos:
1. **Admin (Vendedor):** Gerencia produtos, pedidos e pagamentos.
2. **Cliente (Comprador):** Acessa uma vitrine pública, cria pedidos e acompanha status.
A integridade financeira e o isolamento de dados entre vendedores (Multi-tenancy Lógico) são prioridades absolutas.

---

## 1. Fontes da Verdade (Documentação Base)

Utilize as seguintes definições extraídas dos arquivos de especificação para guiar seu código:

### A. Regras de Negócio (Baseado em `01-PRD.md`)
* **Snapshot de Preço:** Ao criar um pedido, o preço do item **deve** ser gravado na tabela `OrderItem`. O sistema jamais deve recalcular o valor de pedidos passados com base no preço atual do produto.
* **Status do Pedido:** O fluxo de status é linear: `CREATED` -> `PENDING_PAYMENT` -> `PAID` -> `DELIVERED` -> `CANCELED`.
* **Isolamento de Dados:** Produtos e Pedidos pertencem estritamente a um `ownerId` (Admin). Um Admin não pode visualizar dados de outro.

### B. Stack Tecnológica (Baseado em `02-techinical-specification.md`)
* **Backend:** NestJS (Arquitetura Modular: Controller, Service, Repository).
* **Frontend:** Next.js (App Router).
* **Banco de Dados:** PostgreSQL com Prisma ORM.
* **Autenticação:** Implementar estratégia JWT local baseada no campo `passwordHash` do schema (ignorando referências a Auth0 externo para este MVP).

### C. Design System (Baseado em `03-design-system.md`)
* **Cores:**
    * Primária: `#1F3A5F` (Azul acadêmico).
    * Secundária: `#6B7280` (Cinza neutro).
    * Background: `#F9FAFB` (Cinza claro).
* **Tipografia:** Fonte 'Inter'.
* **Estilo de Componentes:** Cards com borda fina (`border-gray-200`), sem sombra (flat style), botões com `rounded-md`.

### D. Rotas e UX (Baseado em `04-interfaces.md`)
* **Admin (Privado):** `/admin/dashboard`, `/admin/produtos`, `/admin/pedidos`.
* **Cliente (Público):** `/` (Login), `/vitrine/[adminId]` (Lista de produtos), `/pedido/checkout`.

### E. Dados (Baseado em `prisma.schema`)
* Utilize **estritamente** o modelo fornecido no arquivo `prisma.schema`, respeitando os tipos `Decimal` para valores monetários e os Enums `Role` e `OrderStatus`.

---

## 2. Instruções de Execução

Gere os artefatos de código abaixo. Para cada passo, forneça o código completo, limpo e profissional.

#### Passo 1: Configuração do Banco de Dados
Gere o arquivo `schema.prisma` completo. Ele deve conter a configuração do `datasource db` e os models `User`, `Product`, `Order`, `OrderItem` e `Payment` exatamente conforme definido na documentação, garantindo os relacionamentos de `ownerId`.

#### Passo 2: Configuração Visual (Frontend)
Gere o arquivo `tailwind.config.ts` configurando o `theme.extend`:
* Adicione as cores do Design System (`primary`, `surface`, `status-success`, etc.).
* Configure a fonte `Inter`.

Crie também um componente React reutilizável `ProductCard.tsx` que siga a especificação visual:
* Borda fina (`border`), sem sombra.
* Imagem com `object-cover`.
* Botão de ação primário.
* Exibição de preço formatado (BRL).

#### Passo 3: Backend (NestJS - OrdersModule)
Implemente a lógica crítica de criação de pedidos no Backend:
1.  Crie o `OrdersController` e o `OrdersService`.
2.  No método `createOrder`:
    * Receba a lista de produtos e quantidades.
    * **Regra Crítica:** Busque o preço atual de cada produto no banco de dados.
    * Grave este valor no campo `unitPrice` do `OrderItem` (Snapshot). **Não aceite o preço vindo do frontend.**
    * Calcule o `totalValue` no backend somando os itens.
3.  Implemente um `JwtAuthGuard` básico que protege as rotas e injeta o usuário no request.

#### Passo 4: Frontend (Next.js - Vitrine)
Crie a estrutura da página de vitrine pública (`app/vitrine/[adminId]/page.tsx`):
* Esta página deve ser Server Component.
* Deve buscar produtos filtrando pelo `ownerId` passado na URL.
* Deve renderizar o grid responsivo utilizando o componente `ProductCard`.

---

## 3. Restrições de Qualidade

1.  **Tipagem:** Use TypeScript estrito (strict mode). Não utilize `any`.
2.  **Tratamento Monetário:**
    * No Frontend: Use `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
    * No Backend: Mantenha operações matemáticas usando o tipo `Decimal` do Prisma/JavaScript para evitar erros de ponto flutuante.
3.  **Segurança de Dados:** Em qualquer endpoint administrativo (ex: listar pedidos), adicione obrigatoriamente a cláusula `where: { ownerId: user.id }` para garantir o isolamento entre microempreendedores.