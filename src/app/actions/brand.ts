import { supabase } from "../../lib/supabase";

const DEFAULT_BRANDS = ["Natura", "Boticário", "Eudora", "Prata", "Cacau Show"];

export async function fetchBrands() {
  try {
    const { data, error } = await supabase.from('brands').select('*').order('name');
    
    if (error) {
      if (error.code === '42P01') { // relation does not exist
        console.error("A tabela 'brands' não existe no Supabase. Por favor, execute o SQL para criá-la.");
        // Retorna as marcas padrão como fallback visual temporário
        return DEFAULT_BRANDS.map(name => ({ id: name, name, created_at: new Date().toISOString() }));
      }
      throw new Error(error.message);
    }

    // Se a tabela estiver vazia, insere as marcas padrão
    if (!data || data.length === 0) {
      console.log("Inserindo marcas padrão...");
      const brandsToInsert = DEFAULT_BRANDS.map(name => ({ name }));
      const { error: insertError } = await supabase.from('brands').insert(brandsToInsert);
      
      if (!insertError) {
        // Busca novamente após inserir
        const { data: newData } = await supabase.from('brands').select('*').order('name');
        return newData || [];
      }
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    // Em caso de erro catastrófico, retorna as padrão para não quebrar a UI
    return DEFAULT_BRANDS.map(name => ({ id: name, name, created_at: new Date().toISOString() }));
  }
}

export async function createBrand(prevState: any, formData: FormData) {
  try {
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
    const id = formData.get("id") as string;

    if (!id) return { success: false, error: "ID é obrigatório." };

    const { error: deleteError } = await supabase.from('brands').delete().eq('id', id);

    if (deleteError) throw new Error(deleteError.message);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
