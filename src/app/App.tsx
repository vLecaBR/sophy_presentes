import { BrowserRouter, Routes, Route, useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { HomeView } from "./components/HomeView";
import { AdminView } from "./components/AdminView";
import { ProductDetailView } from "./components/ProductDetailView";

export default function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .order("created_at", { ascending: false });
    
    // Normalize image/image_url for components
    const normalizedData = (data || []).map(p => ({
      ...p,
      image: p.image_url || p.image,
    }));
    
    setProducts(normalizedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#cf4e71]">Carregando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView products={products} />} />
        <Route path="/admin" element={<AdminView products={products} onRefresh={fetchProducts} />} />
        <Route path="/produto/:slug" element={<ProductRoute products={products} />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProductRoute({ products }: { products: any[] }) {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug) || products.find(p => p.id === slug);
  
  if (!product) return <div className="p-10 text-center text-[#dc8494]">Produto não encontrado</div>;
  
  return <ProductDetailView product={product} />;
}
