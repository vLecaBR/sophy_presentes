import { supabase } from "../../lib/supabase";

export async function createProduct(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const brand = formData.get("brand") as string;
    const file = formData.get("image") as File;

    if (!name || !price || !brand) {
        return { success: false, error: "Nome, preço e marca são obrigatórios." };
    }

    const productSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    let imageUrl = "";

    if (file && file.size > 0) {
      const ext = file.name.split('.').pop();
      const fileName = `${productSlug}-${Date.now()}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from('produtos-imagens')
        .upload(fileName, file);

      if (uploadError) throw new Error(uploadError.message);
      
      const { data: publicUrlData } = supabase.storage
        .from('produtos-imagens')
        .getPublicUrl(fileName);
        
      imageUrl = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase.from('produtos').insert({
      name,
      description,
      price,
      brand,
      image_url: imageUrl,
      slug: productSlug,
    });

    if (insertError) throw new Error(insertError.message);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const brand = formData.get("brand") as string;
    const file = formData.get("image") as File;
    const existingImage = formData.get("existingImage") as string;

    if (!id || !name || !price || !brand) {
        return { success: false, error: "Nome, preço e marca são obrigatórios." };
    }

    const productSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    let imageUrl = existingImage;

    if (file && file.size > 0) {
      const ext = file.name.split('.').pop();
      const fileName = `${productSlug}-${Date.now()}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from('produtos-imagens')
        .upload(fileName, file);

      if (uploadError) throw new Error(uploadError.message);
      
      const { data: publicUrlData } = supabase.storage
        .from('produtos-imagens')
        .getPublicUrl(fileName);
        
      imageUrl = publicUrlData.publicUrl;

      if (existingImage) {
          const oldPath = existingImage.split('/produtos-imagens/').pop();
          if (oldPath) {
             await supabase.storage.from('produtos-imagens').remove([oldPath]);
          }
      }
    }

    const { error: updateError } = await supabase.from('produtos').update({
      name,
      description,
      price,
      brand,
      image_url: imageUrl,
      slug: productSlug,
    }).eq('id', id);

    if (updateError) throw new Error(updateError.message);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const imageUrl = formData.get("imageUrl") as string;

    if (!id) return { success: false, error: "ID é obrigatório." };

    if (imageUrl) {
        const oldPath = imageUrl.split('/produtos-imagens/').pop();
        if (oldPath) {
           await supabase.storage.from('produtos-imagens').remove([oldPath]);
        }
    }

    const { error: deleteError } = await supabase.from('produtos').delete().eq('id', id);

    if (deleteError) throw new Error(deleteError.message);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
