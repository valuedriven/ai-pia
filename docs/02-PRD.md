# Product Requirements Definition (PRD)

## 1. Visão Geral do Produto (Sumário Executivo)

O produto é uma plataforma digital destinada a microempreendedores que desejam organizar e controlar a venda de produtos por meio de um fluxo simples e estruturado de pedidos e pagamentos.

A solução permite que o microempreendedor cadastre produtos, disponibilize-os em uma vitrine digital para seus clientes e acompanhe todo o ciclo de venda — da criação do pedido ao recebimento do pagamento. O sistema oferece dois fluxos de navegação distintos: um administrativo, voltado à gestão do negócio, e outro voltado ao cliente final, focado na navegação e realização de pedidos.

O foco inicial do produto é a simplicidade, a rápida adoção e a redução de perdas financeiras causadas por desorganização no controle de pedidos e pagamentos.

---

## 2. Perfis de Usuário

### 2.1 Administrador (Microempreendedor)

- Problemas: perdas de vendas e sobrecarga por processo manual.
- Objetivos: realizar a gestão de vendas, por meio do fluxo de pedidos e pagamentos, além da manutenção de dados sobre produtos e clientes.
- Dados demográficos: faixa etária típica entre 18 e 60.
- Motivações: possibilitar ao cliente uma experiência única.
- Frustrações: falta de tempo para dedicar aos produtos.

### 2.2 Cliente

- Problemas: dificuldade em pesquisar produtos.
- Objetivos: realizar pedidos de maneira simples e transparente.
- Dados demográficos: faixa etária típica entre 18 e 60.
- Motivações: ter informações para tomar boas decisões de compra.
- Frustrações: excesso de informalidade no atendimento.

---

## 3. Principais Funcionalidades

### RFN.01 Vitrine de Produtos

- Permite ao cliente visualizar os produtos disponíveis em uma vitrine digital organizada em formato de catálogo.
- Exibe informações básicas dos produtos, como nome, descrição, preço e imagem, possibilitando a seleção de itens para compra.

Critérios de Aceitação:
✓ Produtos inativos não devem aparecer na vitrine
✓ Produtos sem estoque devem aparecer mas desabilitados

### RFN.02 Criação e Acompanhamento de Pedidos

- Permite ao cliente criar pedidos a partir da seleção de produtos.
- Possibilita definir quantidades, calcular automaticamente o valor total, informar dados básicos do cliente e acompanhar o status do pedido até o pagamento.

Critérios de Aceitação:
✓ O sistema deve recalcular automaticamente o valor total do pedido sempre que a quantidade de um item for alterada
✓ Um pedido só pode ser confirmado se possuir pelo menos um produto selecionado
✓ Pedidos podem ser cancelados a partir de qualquer estado antes de "Entregue"

### RFN.03 - Gestão de Pagamentos

- Permite ao administrador registrar e controlar os pagamentos associados aos pedidos.
- Oferece suporte a pagamentos parciais, controle de valores pagos e identificação de valores pendentes ou quitados.
- Suporta múltiplos métodos de pagamento: Cartão de Crédito, Cartão de Débito, Pix e Dinheiro.

Critérios de Aceitação:
✓ O sistema deve permitir registrar mais de um pagamento para o mesmo pedido
✓ O valor total pago não deve ultrapassar o valor total do pedido
✓ O status do pedido deve ser atualizado automaticamente para "Pagamento Aprovado" quando o valor total for quitado

### RFN.04 - Gestão de Produtos

- Permite ao administrador cadastrar, editar, remover e organizar produtos.
- Controla a visibilidade dos produtos na vitrine digital.
- Permite categorização de produtos para facilitar a organização e busca.

Critérios de Aceitação:
✓ Apenas usuários administradores podem criar, editar ou remover produtos
✓ Produtos marcados como inativos não devem ser exibidos na vitrine
✓ Produtos devem permitir associação a uma categoria

### RFN.05 - Gestão de Clientes

- Permite ao administrador manter o cadastro de clientes.
- Possibilita criar, consultar, atualizar e excluir registros de clientes associados aos pedidos.

Critérios de Aceitação:
✓ O sistema deve permitir associar um cliente existente a um novo pedido
✓ Clientes com pedidos associados não devem ser excluídos, apenas desativados
✓ Alterações nos dados do cliente devem ser refletidas nos pedidos futuros

### RFN.06 - Gestão do Fluxo de Pedidos

- Permite ao administrador visualizar e acompanhar os pedidos por status.
- Possibilita identificar pedidos pendentes ou atrasados e movimentá-los entre os estados do fluxo.

Critérios de Aceitação:
✓ O administrador deve conseguir filtrar pedidos por status
✓ O sistema deve destacar visualmente pedidos em atraso
✓ A mudança de status de um pedido deve ser registrada e refletida imediatamente
✓ O sistema deve permitir avançar o pedido para o próximo estado ou cancelar

### RFN.07 - Gestão de Vendas

- Permite ao administrador acompanhar o desempenho das vendas por meio de um dashboard.
- Apresenta vendas totais, valores recebidos e pendentes, pedidos em atraso e filtros por período.

Critérios de Aceitação:
✓ O dashboard deve exibir corretamente os valores totais recebidos e pendentes para o período selecionado
✓ A aplicação de filtros por período deve atualizar os indicadores exibidos
✓ Os dados apresentados no dashboard devem refletir apenas pedidos registrados no sistema

---

## 4 Requisitos Não Funcionais (RNFs)

### RNF.01 - Acessibilidade e Portabilidade

A solução deve ser acessível exclusivamente por navegadores web modernos compatíveis com HTML5, CSS3 e ECMAScript 2020 ou superior, e deve apresentar layout responsivo, garantindo uso adequado em diferentes tamanhos de tela.

### RNF.02 – Segurança

A solução deve garantir autenticação e autorização baseadas em padrões de mercado, assegurando controle de acesso por perfis de usuário, bem como confidencialidade e proteção de dados sensíveis em trânsito e em repouso.

### RNF.03 – Interoperabilidade

A solução deve expor suas funcionalidades exclusivamente por meio de APIs RESTful, utilizando os protocolos HTTP/HTTPS.

### RNF.04 – Observabilidade e Rastreabilidade

A solução deve implementar mecanismos de observabilidade conforme padrões abertos, permitindo o registro, a correlação e a consulta de eventos relevantes de execução, de forma a viabilizar monitoramento, auditoria e diagnóstico de falhas.

### RNF.05 – Manutenibilidade e Testabilidade

A solução deve possuir testes automatizados de unidade, integração e aceite, implementados com frameworks adotados no mercado, de modo a facilitar manutenção, evolução do código e detecção precoce de falhas.

### RNF.06 – Portabilidade e Implantação

A solução deve permitir implantação em diferentes ambientes computacionais, suportando escalabilidade e alta disponibilidade. Deve ser empacotada em contêineres compatíveis com o padrão OCI e possuir implantação automatizada por meio de Infraestrutura como Código, utilizando ferramentas de automação e permitindo a recriação completa dos ambientes.

### RNF.07 – Persistência

A solução deverá utilizar mecanismos de persistência baseados em banco de dados relacional e/ou NoSQL.

### RNF.08 – Governança de Código e Configuração

A solução deverá utilizar mecanismos formais para declaração, versionamento e isolamento de dependências. As configurações da aplicação deverão ser externalizadas por meio de variáveis de ambiente ou serviços especializados de configuração. O código-fonte e demais artefatos da solução deverão ser mantido em sistema de controle de versões distribuído e acessível via internet.

---

## 5. Métricas de Sucesso

- Aumentar em 20% o Total recebido (R$) em 12 meses.
- Reduzir em 10% o Total pendente (R$) em 12 meses.
- Aumentar em 10% o nível de satisfação do cliente em 12 meses, medido por meio de pesquisa.

---

## 6. Premissas e restrições

- Haverá tempo hábil para validação com clientes reais em cada estágio do processo.
- O prazo de conclusão é de seis meses.

## 7. Fora de Escopo (Versão 1.0)

- Conversas ou chat com clientes
- CRM avançado de clientes
- Integração automática com gateways de pagamento
- Controle de estoque
