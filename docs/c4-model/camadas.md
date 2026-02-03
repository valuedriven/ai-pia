# Camadas

```mermaid
flowchart LR
    Controller --> Service
    Service --> Domain
    Service --> Repository
    Repository --> Database[(PostgreSQL)]
```
