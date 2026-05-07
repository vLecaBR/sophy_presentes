# Fase 2: Vitrine (Home) e Estrutura Next.js

## Objetivo
Adequar a estrutura base para Next.js 15 (App Router) e modificar a interface da Home (`HomeView.tsx`) para consumir a tabela de `produtos` do Supabase via Server Components, ignorando o uso de states mockados.

## Estrutura de Rotas
- `src/app/page.tsx`: Server Component principal da Vitrine.

## Fluxo de Dados (Server-side)
1. Instanciar a conexão com o banco via `supabase/server`.
2. Fazer query: `SELECT id, name, price, brand, image_url, slug FROM produtos ORDER BY created_at DESC`.
3. Renderizar o grid de produtos (atualmente mapeado em `HomeView`).

## Modificações nos Componentes
- **`src/app/page.tsx`**: Tornar-se-á o orquestrador dos dados, removendo o roteamento via state de `App.tsx`.
- **`src/app/components/HomeView.tsx`**: Será refatorado para ser "stateless" em relação aos dados, recebendo a lista de produtos como prop. Os cards de produto devem envolver links Next (`<Link>`) apontando para `/produto/[slug]`.