-- Tabela store_settings
CREATE TABLE store_settings (
  id integer PRIMARY KEY DEFAULT 1,
  whatsapp_number text,
  whatsapp_message text,
  instagram_handle text,
  store_address text,
  business_hours text
);

-- Garantir que o ID seja sempre 1 (Restrição de loja única)
ALTER TABLE store_settings ADD CONSTRAINT check_id CHECK (id = 1);

-- Inserir valores padrão (opcional)
INSERT INTO store_settings (id, whatsapp_number, whatsapp_message, instagram_handle, store_address, business_hours)
VALUES (
  1, 
  '5516988523009', 
  'Olá Sophy Presentes!', 
  'sophy_presentesrp', 
  'Endereço da Loja', 
  'Seg-Sáb, 09h às 18h'
)
ON CONFLICT (id) DO NOTHING;
