import { notFound } from 'next/navigation';
import { createServerClient } from '../../../lib/supabase/server';
import { ProductDetailView } from '../../components/ProductDetailView';

export default async function ProdutoPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient();
  const { slug } = params;

  const { data: produto } = await supabase
    .from('produtos')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!produto) {
    notFound();
  }

  const productData = {
    id: produto.id,
    name: produto.name,
    price: produto.price,
    brand: produto.brand,
    description: produto.description,
    image: produto.image_url || produto.image,
  };

  return <ProductDetailView product={productData} />;
}
