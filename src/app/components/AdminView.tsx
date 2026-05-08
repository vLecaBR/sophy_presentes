"use client";

import { useState } from "react";
import {
  Tag,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";
import { type Product } from "./sophy-data";
import { SophyLogo } from "./SophyLogo";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router";
import { DashboardView } from "./admin/DashboardView";
import { ProductsView } from "./admin/ProductsView";
import { BrandsView } from "./admin/BrandsView";
import { SettingsView } from "./admin/SettingsView";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface Props {
  products: Product[];
  onRefresh?: () => void;
}

export function AdminView({ products, onRefresh }: Props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Painel");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Painel" },
    { icon: ShoppingBag, label: "Produtos" },
    { icon: Tag, label: "Marcas" },
    { icon: Settings, label: "Ajustes" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Painel":
        return <DashboardView products={products} />;
      case "Produtos":
        return <ProductsView products={products} onRefresh={onRefresh} />;
      case "Marcas":
        return <BrandsView />;
      case "Ajustes":
        return <SettingsView />;
      default:
        return <DashboardView products={products} />;
    }
  };

  const handleNavClick = (label: string) => {
    setActiveTab(label);
    setIsMobileMenuOpen(false);
  };

  const NavContent = () => (
    <>
      <div className="px-6 py-6 border-b border-white/15">
        <SophyLogo tone="light" />
        <p className="mt-2 text-xs tracking-[0.25em] uppercase text-white/70">
          Painel Admin
        </p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((n) => (
          <button
            key={n.label}
            onClick={() => handleNavClick(n.label)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              activeTab === n.label
                ? "bg-white text-[#cf4e71] shadow"
                : "text-white/85 hover:bg-white/10"
            }`}
          >
            <n.icon className="h-4 w-4" />
            {n.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/15 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/90 hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Sair do painel
        </button>
      </div>
    </>
  );

  return (
    <div className="bg-[#fbe9ed]/50 min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#dc8494] text-white sticky top-0 h-screen">
        <NavContent />
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden bg-[#dc8494] text-white px-4 h-16 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/15">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-[#dc8494] border-r-0 flex flex-col text-white">
                <NavContent />
              </SheetContent>
            </Sheet>
            <span className="font-medium text-lg">{activeTab}</span>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={handleLogout}
            className="text-white hover:bg-white/15"
          >
            <LogOut className="h-4 w-4 mr-1 hidden sm:block" />
            Sair
          </Button>
        </div>

        <div className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#dc8494]">
                Bem-vinda
              </p>
              <h1 className="font-logo text-4xl text-[#1f1115] mt-1">
                Painel Sophy
              </h1>
              <p className="text-sm text-[#3a2129]/70 mt-1">
                {activeTab === "Painel" && "Visão geral da sua loja"}
                {activeTab === "Produtos" && "Gerencie seus produtos, adicione ou edite."}
                {activeTab === "Marcas" && "Gerencie as marcas"}
                {activeTab === "Ajustes" && "Configurações do sistema"}
              </p>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
