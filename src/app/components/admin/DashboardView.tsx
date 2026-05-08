"use client";

import { Package, TrendingUp, Tag } from "lucide-react";
import { Card } from "../ui/card";
import { formatBRL, type Product } from "../sophy-data";

interface Props {
  products: Product[];
}

export function DashboardView({ products }: Props) {
  const totalValue = products.reduce((s, p) => s + p.price, 0);
  const brandsCount = new Set(products.map((p) => p.brand)).size;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            icon: Package,
            label: "Produtos",
            value: products.length,
            bg: "#fbe9ed",
          },
          {
            icon: Tag,
            label: "Marcas ativas",
            value: brandsCount,
            bg: "#ecb4bc66",
          },
          {
            icon: TrendingUp,
            label: "Valor em estoque",
            value: formatBRL(totalValue),
            bg: "#eb92ab4d",
          },
        ].map((s) => (
          <Card
            key={s.label}
            className="p-5 bg-white border-[#ecb4bc]/40 rounded-2xl flex items-center gap-4 shadow-sm min-w-0"
          >
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center text-[#cf4e71]"
              style={{ background: s.bg }}
            >
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-[#dc8494]">{s.label}</p>
              <p className="text-2xl text-[#cf4e71]">{s.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        <Card className="bg-white border-[#ecb4bc]/40 rounded-2xl p-6 shadow-sm min-w-0">
          <h2 className="text-lg text-[#1f1115] mb-2">Lista Rápida</h2>
          <p className="text-sm text-[#dc8494]">Últimos produtos adicionados</p>
          <div className="mt-4 space-y-4 w-full">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-[#ecb4bc]/30 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-[#fbe9ed]">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[#3a2129] truncate">{p.name}</p>
                    <p className="text-xs text-[#dc8494] truncate">{p.brand}</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-[#cf4e71] shrink-0 ml-4">
                  {formatBRL(p.price)}
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-sm text-[#dc8494]">Nenhum produto cadastrado ainda.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
