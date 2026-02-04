# Especificação Técnica

## 1. Visão Geral Técnica

Este documento descreve como os requisitos não funcionais do produto e-micro-commerce serão implementados, fornecendo diretrizes de arquitetura e stack tecnológica para desenvolvimento assistido por IA e implementação humana.

---

## 2. Arquitetura de Referência

- Estilo arquitetural: aplicação web com backend desacoplado via APIs RESTful.
- Componentes principais: Frontend Web, Backend de Aplicação e Banco de Dados.
- Serviço de observabilidade: aderente ao padrão OpenTelemetry.
- Segurança: aderente aos padrões OpenID Connect e OAuth 2.0.
- Comunicação: HTTP/HTTPS com payloads JSON.
- Infraestrutura: utilização de contêineres no padrão OCI.

---

## 3. Stack Tecnológica Recomendada

### 3.1 - Versão inicial

- **Frontend:** Next.js (App Router) + Tailwind CSS.
- **Backend:** NestJS (Arquitetura Modular); API RESTful.
- **Persistência:** PostgreSQL via Supabase.
- **ORM:** Prisma.
- **Segurança (autenticação e Autorização):** Auth0 (integração com frontend via JWT).
- **Observabilidade:** Datadog (backend e frontend).
- **Infraestrutura:** Vercel.

### 3.2 - Versão futura (Ajustes)

- **Persistência:** AWS RDS.
- **Segurança (autenticação e Autorização):** AWS Cognito.
- **Observabilidade:** AWS Cloudwatch.
- **Infraestrutura:** AWS EKS.

---

## 4. APIs

- Versionamento: URI path versioning (ex: /v1/products).
- Padrão de nomenclatura: /v1/{resource}/{id}.
- Endpoint principal: (<https://api.dominio.com/v1/>).

---

### 5. JWT Authentication

- Algoritmo: RS256 ou ES256 para assinatura.
- Access Token: Válido por 15 minutos.
- Refresh Token: Válido por 7 dias. Usado como mecanismo de rotação no endpoint /api/auth/refresh.
- Armazenamento: HttpOnly, Secure Cookies.
- Validação: Cada requisito deve validar a assinatura, exp (expiration), iss (issuer) e aud (audience).

---

## 6. Tenancy

- Multi-tenant: com banco de dados compartilhado e esquema por tenant ou administrador.

---

## 7. Domínio

### Principais Entidades

- Produto: Nome do Produto, Categoria, Imagem, Descrição, Estoque, Ativo.
- Cliente: Nome do cliente, Endereço, e-mail, Telefone.
- Usuario: Identificação do usuário, perfil.
- Pedido: Número do pedido, Identificação do Cliente, Status.
- Item Pedido: Identificação do pedido, Identificação do produto, Preço Unitário, Quantidade.
- Pagamento: Identificação do pedido, Data de pagamento, Valor pago, Forma de pagamento.

### Esquema

Disponível no arquivo prisma.schema.

### Detalhes

- Status do pedido: Novo → Pagamento Aprovado → Em Preparação → Faturado → Despachado → Em trânsito → Entregue (final).
- Pedido pode ser cancelado a partir dos estados.
- Métodos de pagamento: Cartão de Crédito, Cartão de Débito, Pix, Dinheiro.

--

## 8. Diretrizes para Desenvolvimento Assistido por IA

- Respeitar padrões definidos neste documento.
- Gerar código compatível com a arquitetura descrita.

--

## 9. Evolução Futura

- Upload de imagens via Storage (S3/R2) - *Atualmente apenas URL*.
- Integração real com gateway de pagamentos.
- Notificações por e-mail/WhatsApp.
