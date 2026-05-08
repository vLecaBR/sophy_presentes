import { supabase } from "../../lib/supabase";

export type StoreSettings = {
  id: number;
  whatsapp_number: string;
  whatsapp_message: string;
  instagram_handle: string;
  store_address: string;
  business_hours: string;
};

const DEFAULT_SETTINGS: StoreSettings = {
  id: 1,
  whatsapp_number: '5516988523009',
  whatsapp_message: 'Olá Sophy Presentes!',
  instagram_handle: 'sophy_presentesrp',
  store_address: 'Endereço da Loja',
  business_hours: 'Seg-Sáb, 09h às 18h'
};

export async function fetchSettings(): Promise<StoreSettings> {
  try {
    const { data, error } = await supabase.from('store_settings').select('*').eq('id', 1).single();
    
    if (error) {
      if (error.code === '42P01') { // relation does not exist
        console.error("A tabela 'store_settings' não existe no Supabase. Retornando padrão.");
        return DEFAULT_SETTINGS;
      }
      if (error.code === 'PGRST116') { // no rows returned
        return DEFAULT_SETTINGS;
      }
      throw new Error(error.message);
    }

    return data || DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(_prevState: any, formData: FormData) {
  try {
    const dataToUpdate = {
      whatsapp_number: formData.get("whatsapp_number") as string,
      whatsapp_message: formData.get("whatsapp_message") as string,
      instagram_handle: formData.get("instagram_handle") as string,
      store_address: formData.get("store_address") as string,
      business_hours: formData.get("business_hours") as string,
    };

    const { error: upsertError } = await supabase
      .from('store_settings')
      .upsert({ id: 1, ...dataToUpdate }, { onConflict: 'id' });

    if (upsertError) throw new Error(upsertError.message);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
