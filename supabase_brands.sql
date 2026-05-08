-- Criar tabela brands
CREATE TABLE IF NOT EXISTS public.brands (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Configurar RLS (Row Level Security)
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
-- Leitura pública
CREATE POLICY "Leitura pública para brands" ON public.brands
  FOR SELECT USING (true);

-- Escrita restrita a usuários autenticados (ou remova a restrição de acordo com a configuração do projeto)
CREATE POLICY "Escrita para usuários autenticados" ON public.brands
  FOR ALL USING (auth.role() = 'authenticated');
