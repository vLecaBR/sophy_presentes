import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Sparkles, Instagram, Truck, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BRANDS, formatBRL, type Brand, type Product } from "./sophy-data";
import { SophyLogo } from "./SophyLogo";
import { WhatsAppIcon } from "./SophyHeader";

const INSTAGRAM_URL = "https://instagram.com/sophy_presentesrp";
const WHATSAPP_URL =
  "https://wa.me/5516988523009?text=Olá%20Sophy%20Presentes!";

interface ProductFromDB {
  id: string;
  name: string;
  price: number;
  brand: string;
  image_url: string;
  slug: string;
}

interface Props {
  products: ProductFromDB[];
}

export function HomeView({ products }: Props) {
  const [activeBrand, setActiveBrand] = useState<string | "Todos">("Todos");

  const filtered = useMemo(
    () =>
      activeBrand === "Todos"
        ? products
        : products.filter((p) => p.brand === activeBrand),
    [products, activeBrand],
  );

  return (
    <div className="bg-[#fbe9ed]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background tone */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fbe9ed] via-[#ecb4bc]/40 to-[#fbe9ed]" />
        <div className="absolute -top-32 -right-32 h-[26rem] w-[26rem] rounded-full bg-[#ecb4bc]/60 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#eb92ab]/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur rounded-full px-4 py-1.5 border border-white/80 mb-6">
              <MapPin className="h-3.5 w-3.5 text-[#cf4e71]" />
              <span className="text-xs tracking-wide text-[#cf4e71]">
                Ribeirão Preto · SP
              </span>
            </div>
            <h1 className="font-logo text-[#1f1115] tracking-tight leading-[0.95] text-5xl sm:text-6xl lg:text-7xl">
              Pronta entrega
              <br />
              <span className="italic text-[#cf4e71]">em Ribeirão Preto</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#3a2129]/80 max-w-lg leading-relaxed">
              Presentes selecionados das marcas que você ama, embalados com
              carinho e entregues no mesmo dia. Perfumes, cosméticos, prata e
              chocolates finos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#produtos"
                className="group inline-flex items-center gap-2 bg-[#cf4e71] hover:bg-[#b8425f] text-white rounded-full px-8 h-14 shadow-xl shadow-[#cf4e71]/30 hover:shadow-2xl hover:shadow-[#cf4e71]/40 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="h-5 w-5" />
                <span>Ver Produtos</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
              <div className="flex items-center gap-2 text-sm text-[#3a2129]/70">
                <Truck className="h-4 w-4 text-[#cf4e71]" />
                Entrega no mesmo dia
              </div>
            </div>
          </div>

          {/* Image collage */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[520px]">
            <div className="absolute inset-0">
              {/* Big image */}
              <div className="absolute right-0 top-6 w-[68%] h-[78%] rounded-3xl overflow-hidden shadow-2xl shadow-[#cf4e71]/20 ring-4 ring-white">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1625552186152-668cd2f0b707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80"
                  alt="Caixa de presente rosa"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Smaller front-left */}
              <div className="absolute left-0 bottom-4 w-[55%] h-[55%] rounded-3xl overflow-hidden shadow-2xl shadow-[#cf4e71]/25 ring-4 ring-white rotate-[-4deg]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1713999495859-27397adbf481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                  alt="Perfume rosa"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Top floating chip */}
              <div className="absolute left-4 top-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 rotate-[-3deg]">
                <div className="h-10 w-10 rounded-full bg-[#fbe9ed] flex items-center justify-center text-[#cf4e71]">
                  <Heart className="h-5 w-5 fill-[#cf4e71]" />
                </div>
                <div className="leading-tight">
                  <div className="text-xs text-[#dc8494]">+ de</div>
                  <div className="text-[#cf4e71]">300 presentes</div>
                </div>
              </div>
              {/* Bottom floating chip */}
              <div className="absolute right-2 bottom-0 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 rotate-[3deg]">
                <div className="h-10 w-10 rounded-full bg-[#cf4e71] flex items-center justify-center text-white">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-xs text-[#dc8494]">Hoje mesmo</div>
                  <div className="text-[#cf4e71]">na sua porta</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section
        id="produtos"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
      >
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#dc8494]">
              Catálogo
            </p>
            <h2 className="font-logo text-3xl sm:text-4xl text-[#1f1115] mt-1">
              Filtre pela sua marca favorita
            </h2>
          </div>
          <span className="text-sm text-[#dc8494]">
            {filtered.length}{" "}
            {filtered.length === 1 ? "produto" : "produtos"}
          </span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-3 -mx-1 px-1">
          {(["Todos", ...BRANDS] as const).map((brand) => {
            const active = activeBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand as string | "Todos")}
                className={`shrink-0 rounded-full px-5 py-2.5 border transition-all ${
                  active
                    ? "bg-[#cf4e71] text-white border-[#cf4e71] shadow-md shadow-[#cf4e71]/30"
                    : "bg-white text-[#3a2129] border-[#ecb4bc]/70 hover:border-[#cf4e71] hover:text-[#cf4e71]"
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        {filtered.length === 0 ? (
          <Card className="p-10 text-center bg-white border-[#ecb4bc]/40">
            <p className="text-[#dc8494]">
              Nenhum produto encontrado para essa marca.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filtered.map((p) => (
              <Card
                key={p.id}
                className="overflow-hidden bg-white border border-[#ecb4bc]/40 p-0 group rounded-3xl shadow-md shadow-[#cf4e71]/10 hover:shadow-2xl hover:shadow-[#cf4e71]/20 hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-[#fbe9ed]">
                  <ImageWithFallback
                    src={p.image_url}
                    alt={p.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    aria-label="Favoritar"
                    className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-[#cf4e71] hover:bg-[#cf4e71] hover:text-white transition-colors shadow"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <Badge className="absolute top-3 left-3 bg-white text-[#cf4e71] border-0 hover:bg-white shadow">
                    {p.brand}
                  </Badge>
                </div>
                <div className="p-4 sm:p-5 flex flex-col gap-2.5 flex-1">
                  <h3 className="line-clamp-2 min-h-[2.75rem] text-[15px] text-[#3a2129]">
                    {p.name}
                  </h3>
                  <div className="text-[#cf4e71] text-xl tracking-tight">
                    {formatBRL(p.price)}
                  </div>
                  <Button
                    asChild
                    className="bg-[#cf4e71] hover:bg-[#b8425f] text-white mt-auto rounded-full h-11 shadow-md shadow-[#cf4e71]/25"
                  >
                    <Link href={`/produto/${p.slug}`}>Ver Detalhes</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#dc8494] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <SophyLogo tone="light" size="lg" />
            <p className="mt-4 text-white/85 max-w-xs leading-relaxed">
              Presentes especiais com pronta entrega em Ribeirão Preto.
              Embalagem para presente em todos os pedidos.
            </p>
          </div>

          <div>
            <h4 className="text-white/90 tracking-[0.2em] uppercase text-xs mb-4">
              Conecte-se
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                  @sophy_presentesrp
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  +55 16 98852-3009
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4" />
                Ribeirão Preto · SP
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/90 tracking-[0.2em] uppercase text-xs mb-4">
              Atendimento
            </h4>
            <p className="text-white/85 leading-relaxed">
              Segunda a sábado
              <br />
              09h às 19h
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-white text-[#cf4e71] rounded-full px-5 h-11 hover:bg-white/90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Falar agora
            </a>
          </div>
        </div>
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center text-sm text-white/80">
            © 2026 Sophy Presentes · Todos os direitos reservados
          </div>
        </div>
      </footer>
    </div>
  );
}
