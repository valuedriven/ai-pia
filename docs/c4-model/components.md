# C4 – Diagrama de Componentes (Backend)

```mermaid
C4Component
title Diagrama de Componentes – Backend (NestJS)

Container(api, "API Backend", "NestJS")

Component(auth, "AuthModule", "Autenticação e autorização")
Component(user, "UserModule", "Gestão de usuários")
Component(product, "ProductModule", "Gestão de produtos")
Component(order, "OrderModule", "Gestão de pedidos")
Component(dashboard, "DashboardModule", "Métricas e visão gerencial")

Rel(auth, user, "Valida usuário")
Rel(order, product, "Consulta produtos")
Rel(payment, order, "Atualiza status do pedido")
Rel(dashboard, order, "Consulta pedidos")

Rel(api, auth, "Usa")
Rel(api, user, "Usa")
Rel(api, product, "Usa")
Rel(api, order, "Usa")
Rel(api, dashboard, "Usa")
```
