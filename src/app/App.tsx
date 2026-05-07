import { useState } from "react";
import { SophyHeader } from "./components/SophyHeader";
import { HomeView } from "./components/HomeView";
import { ProductDetailView } from "./components/ProductDetailView";
import { AdminView } from "./components/AdminView";
import { INITIAL_PRODUCTS, type Product } from "./components/sophy-data";

type View =
  | { name: "home" }
  | { name: "detail"; product: Product }
  | { name: "admin" };

export default function App() {
  const [view, setView] = useState<View>({ name: "home" });
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const handleCreate = (p: Omit<Product, "id">) =>
    setProducts((list) => [
      { ...p, id: Math.random().toString(36).slice(2) },
      ...list,
    ]);

  const handleUpdate = (p: Product) =>
    setProducts((list) => list.map((x) => (x.id === p.id ? p : x)));

  const handleDelete = (id: string) =>
    setProducts((list) => list.filter((x) => x.id !== id));

  if (view.name === "admin") {
    return (
      <AdminView
        products={products}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onExit={() => setView({ name: "home" })}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fbe9ed]">
      <SophyHeader
        onAdminClick={() => setView({ name: "admin" })}
        onHomeClick={() => setView({ name: "home" })}
      />
      {view.name === "home" && (
        <HomeView
          products={products}
          onSelectProduct={(p) => setView({ name: "detail", product: p })}
        />
      )}
      {view.name === "detail" && (
        <ProductDetailView
          product={view.product}
          onBack={() => setView({ name: "home" })}
        />
      )}
    </div>
  );
}
