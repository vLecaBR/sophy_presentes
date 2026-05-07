# Fase 4: Painel Administrativo e Server Actions

## Objetivo
Construir o painel administrativo conectando a UI gerada (`AdminView.tsx`) às muições no Supabase através do Next.js 15 Server Actions, permitindo upload de mídia.

## Estrutura de Rotas e Actions
- `src/app/admin/page.tsx`: Rota que renderiza o painel (em ambiente real exigiria verificação de sessão, por ora, focaremos na interface).
- `src/app/actions/product.ts`: Arquivo que usa a diretiva `"use server"` para todas as mutações.

## Mutações (Server Actions)
1. **`createProduct(formData: FormData)`**:
   - Capturar o arquivo de imagem do FormData.
   - Fazer upload via `supabase.storage.from('produtos-imagens').upload()`.
   - Gerar um "slug" amigável com base no nome.
   - Fazer `INSERT` na tabela `produtos` com a URL pública da imagem.
   - Executar `revalidatePath('/', 'layout')` para limpar o cache.
2. **`updateProduct(id: string, formData: FormData)`**:
   - Caso venha nova imagem, deletar a antiga do Storage e subir a nova.
   - Executar `UPDATE` no banco de dados.
3. **`deleteProduct(id: string, imageUrl: string)`**:
   - Remover imagem do Storage.
   - Remover registro (`DELETE`) do banco de dados.
   - Revalidar rotas.

## Modificações nos Componentes
- **`src/app/components/AdminView.tsx`**: 
  - Abandonar os callbacks falsos (`onCreate`, `onUpdate`, `onDelete`) usados no mock.
  - Implementar Forms utilizando os hooks nativos do React 19 (`useActionState` / `useFormStatus`) para os botões de carregamento e disparar as Server Actions.