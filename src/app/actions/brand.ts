import { createServerClient } from "../../lib/supabase/server";

export async function fetchBrands() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('brands').select('*').order('name');
    
    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export async function createBrand(prevState: any, formData: FormData) {
  try {
    const supabase = createServerClient();
    const name = formData.get("name") as string;

    if (!name || name.trim() === "") {
      return { success: false, error: "O nome da marca é obrigatório." };
    }

    // Verifica duplicata
    const { data: existing } = await supabase
      .from('brands')
      .select('id')
      .ilike('name', name.trim())
      .single();

    if (existing) {
      return { success: false, error: "Esta marca já existe." };
    }

    const { error: insertError } = await supabase.from('brands').insert({
      name: name.trim(),
    });

    if (insertError) throw new Error(insertError.message);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateBrand(prevState: any, formData: FormData) {
  try {
    const supabase = createServerClient();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const oldName = formData.get("oldName") as string; // Necessário para cascata

    if (!id || !name || name.trim() === "") {
      return { success: false, error: "O ID e nome da marca são obrigatórios." };
    }

    // Verifica duplicata (excluindo o atual)
    const { data: existing } = await supabase
      .from('brands')
      .select('id')
      .ilike('name', name.trim())
      .neq('id', id)
      .single();

    if (existing) {
      return { success: false, error: "Já existe outra marca com este nome." };
    }

    const { error: updateError } = await supabase
      .from('brands')
      .update({ name: name.trim() })
      .eq('id', id);

    if (updateError) throw new Error(updateError.message);

    // Cascata: atualizar produtos que usam a string da marca antiga
    if (oldName && oldName !== name.trim()) {
      await supabase
        .from('produtos')
        .update({ brand: name.trim() })
        .eq('brand', oldName);
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBrand(prevState: any, formData: FormData) {
  try {
    const supabase = createServerClient();
    const id = formData.get("id") as string;

    if (!id) return { success: false, error: "ID é obrigatório." };

    const { error: deleteError } = await supabase.from('brands').delete().eq('id', id);

    if (deleteError) throw new Error(deleteError.message);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
