# Fase 3: Página de Produto e Fluxo WhatsApp

## Objetivo
Criar uma rota dinâmica (Server Component) para exibir os detalhes do produto e implementar a regra de negócios exclusiva de redirecionamento para o WhatsApp ao invés de carrinho.

## Estrutura de Rotas
- `src/app/produto/[slug]/page.tsx`: Rota Server-Side para capturar o parâmetro e exibir o detalhe.

## Fluxo de Dados
1. Obter o `slug` pela prop `params` no Page Component.
2. Query ao Supabase: `SELECT * FROM produtos WHERE slug = $1 LIMIT 1`.
3. Se não encontrar, retornar `notFound()`.

## Modificações nos Componentes
- **`src/app/components/ProductDetailView.tsx`**: 
  - Refatorar para receber os dados do banco como `prop`.
  - Modificar o botão principal (que hoje aciona um state ou carrinho) para montar uma URL direta: 
    `https://wa.me/5516988523009?text=Olá, tenho interesse no produto: [Nome]. Veja o link: [URL_DA_PAGINA_ATUAL]`.
  - Utilizar tag `<a target="_blank">` para este direcionamento.