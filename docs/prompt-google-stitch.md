# Prompt

Contexto do Projeto: Crie um protótipo funcional de alta fidelidade para uma aplicação web de "E-micro-commerce" (plataforma de gestão de pedidos para microempreendedores).

Stack Tecnológica:

Framework: Next.js (App Router).

Estilização: Tailwind CSS.

Ícones: Lucide React ou Heroicons.

Fonte: Inter (Google Fonts).

Sistema de Design (Strict Compliance):

Cores:

Primária (Botões/Destaques): #1F3A5F (Azul Acadêmico).

Fundo da Página: #F9FAFB (Cinza Claro).

Texto Principal: #111827.

Texto Secundário: #6B7280.

Bordas: #D1D5DB ou #E5E7EB.

Estilo Visual:

Flat Design: Não use sombras (box-shadow) nos cards. Use bordas finas (border border-gray-200).

Botões: Primários com bg-[#1F3A5F] e texto branco. Secundários com fundo branco e borda cinza. Border-radius rounded-md.

Badges de Status: Use cores suaves (ex: Pago = Fundo Verde Claro / Texto Verde Escuro).

Gere as seguintes telas e fluxos:

1. Vitrine de Produtos (Visão do Cliente)

Layout: Grid responsivo (1 coluna mobile, 3 ou 4 desktop).

Header: Logo à esquerda, Barra de Busca ao centro, Ícone de Carrinho à direita.

Card de Produto: Deve conter uma área de imagem (aspect ratio 16:9, object-cover), Título do Produto (negrito), Categoria (texto pequeno cinza) e Preço em destaque (ex: R$ 50,00). Botão "Adicionar".

Estados: Se o estoque for 0, desabilitar o botão.

2. Login / Autenticação

Centralizado na tela.

Campos: E-mail e Senha.

Botão "Entrar" (largura total). Link para "Criar nova conta".

3. Dashboard Administrativo

KPIs (Topo): 4 Cards exibindo métricas: "Total Recebido (R$)", "Total Pendente (R$)", "Pedidos em Atraso" e "Satisfação".

Tabela Recente: Lista simples dos últimos 5 pedidos com colunas: ID, Cliente, Status (Badge) e Valor.

4. Gestão de Produtos (CRUD)

Lista: Tabela exibindo miniatura da imagem, Nome, Categoria, Preço, Estoque e Status (Ativo/Inativo). Ações de Editar/Excluir.

Formulário de Cadastro: Campos para "Nome", "Categoria" (Select), "URL da Imagem" (Input texto), "Preço" (Input numérico), "Estoque" (Input numérico) e "Descrição" (Textarea). Toggle para "Ativo".

5. Detalhe do Pedido (Visão Admin)

Cabeçalho: ID do Pedido (#1234) e Badge de Status atual (ex: NOVO, PAGO, ENTREGUE).

Lista de Itens: Tabela com Produto, Quantidade, Preço Unitário e Subtotal.

Ações: Botão para "Registrar Pagamento" e Select para "Alterar Status".

Histórico de Pagamentos: Se houver pagamentos parciais, listar data, valor e forma (PIX, DINHEIRO, CARTAO).
