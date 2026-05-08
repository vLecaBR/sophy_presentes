import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { HomeView } from "./components/HomeView";
import { AdminView } from "./components/AdminView";
import { ProductDetailView } from "./components/ProductDetailView";
import { LoginView } from "./components/LoginView";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#cf4e71]">Carregando...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

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
        <Route path="/login" element={<LoginView />} />
        <Route path="/admin" element={
          <RequireAuth>
            <AdminView products={products} onRefresh={fetchProducts} />
          </RequireAuth>
        } />
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
