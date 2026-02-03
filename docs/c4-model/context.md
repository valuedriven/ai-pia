# C4 – Diagrama de Contexto

```mermaid
C4Context
title Diagrama de Contexto – Plataforma de Gestão de Pedidos e Pagamentos

Person(admin, "Microempreendedor", "Administra produtos, pedidos e pagamentos")
Person(client, "Cliente", "Navega produtos e cria pedidos")

System(system, "Plataforma de Gestão", "Gerencia produtos, pedidos e pagamentos")

Rel(admin, system, "Gerencia produtos, pedidos e pagamentos")
Rel(client, system, "Visualiza produtos e cria pedidos")
```
