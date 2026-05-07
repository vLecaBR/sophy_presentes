# Fase 1: Setup do Banco de Dados (Supabase)

## Objetivo
Criar a estrutura de dados necessária no Supabase para armazenar os produtos e suas imagens, além de configurar as políticas de acesso (RLS).

## Queries SQL (Supabase SQL Editor)
```sql
-- Criação da tabela de produtos
CREATE TABLE public.produtos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    brand TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Configuração do Bucket para Imagens
INSERT INTO storage.buckets (id, name, public) 
VALUES ('produtos-imagens', 'produtos-imagens', true);

-- Políticas de Segurança (RLS - Row Level Security)
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- Policy: Leitura pública para produtos
CREATE POLICY "Permitir leitura pública" ON public.produtos
    FOR SELECT USING (true);

-- Policy: Acesso total para admin (autenticado) na tabela
-- Nota: Inicialmente para testes em dev podemos liberar INSERT/UPDATE, 
-- mas a política final deve ser atrelada à autenticação.
CREATE POLICY "Permitir acesso admin" ON public.produtos
    USING (auth.role() = 'authenticated');

-- Políticas do Storage (Imagens)
CREATE POLICY "Leitura pública de imagens" ON storage.objects
    FOR SELECT USING (bucket_id = 'produtos-imagens');

CREATE POLICY "Admin pode gerenciar imagens" ON storage.objects
    FOR ALL USING (auth.role() = 'authenticated' AND bucket_id = 'produtos-imagens');
```

## Próximos Passos
- Inicializar a integração do cliente Supabase (`@supabase/supabase-js`).
- Criar funções utilitárias `createClient` no diretório Next.js para Client e Server components.
