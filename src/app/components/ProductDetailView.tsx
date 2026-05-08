"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Truck, Shield, Gift, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { formatBRL, type Product } from "./sophy-data";
import { SophyHeader, WhatsAppIcon } from "./SophyHeader";
import { useSettings } from "../contexts/SettingsContext";

interface Props {
  product: Product;
  onBack?: () => void;
}

export function ProductDetailView({ product, onBack }: Props) {
  const [currentUrl, setCurrentUrl] = useState("");
  const settings = useSettings();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const whatsappText = `Olá, tenho interesse no produto: ${product.name}. Veja o link: ${currentUrl}`;
  const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="bg-[#fbe9ed] min-h-screen">
      <SophyHeader onAdminClick={() => navigate('/admin')} onHomeClick={() => navigate('/')} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-28 sm:pb-8">
        {onBack ? (
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-[#cf4e71] hover:bg-[#ecb4bc]/30 hover:text-[#cf4e71] mb-4 sm:mb-6 -ml-2 rounded-full px-4 py-3 min-h-[48px] inline-flex items-center"
          >
            <ArrowLeft className="h-5 w-5 sm:h-4 sm:w-4 mr-2 sm:mr-1" />
            <span className="font-medium">Voltar à vitrine</span>
          </Button>
        ) : (
          <Link to="/" className="inline-flex items-center text-[#cf4e71] hover:bg-[#ecb4bc]/30 hover:text-[#cf4e71] mb-4 sm:mb-6 -ml-2 rounded-full px-4 py-3 min-h-[48px] font-medium transition-colors">
            <ArrowLeft className="h-5 w-5 sm:h-4 sm:w-4 mr-2 sm:mr-1" />
            <span>Voltar à vitrine</span>
          </Link>
        )}

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Image side */}
          <div className="lg:col-span-7">
            <div className="relative -mx-4 sm:mx-0">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ecb4bc]/60 to-[#eb92ab]/40 rounded-none sm:rounded-[2.5rem] blur-2xl hidden sm:block" />
              <Card className="relative overflow-hidden bg-white border-0 sm:border-[#ecb4bc]/40 p-0 rounded-none sm:rounded-[2rem] shadow-none sm:shadow-xl sm:shadow-[#cf4e71]/15">
                <div className="aspect-square bg-[#fbe9ed]">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Card>
              {/* Thumbnails decor */}
              <div className="hidden sm:flex mt-4 gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-20 w-20 rounded-2xl overflow-hidden border-2 ${
                      i === 0
                        ? "border-[#cf4e71]"
                        : "border-transparent opacity-70"
                    }`}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info side */}
          <div className="lg:col-span-5 flex flex-col">
            <Badge className="self-start bg-[#ecb4bc]/50 text-[#cf4e71] border-0 hover:bg-[#ecb4bc]/50 mb-4 rounded-full px-3 py-1">
              {product.brand}
            </Badge>
            <h1 className="font-logo text-3xl sm:text-4xl md:text-5xl text-[#1f1115] mb-3 sm:mb-4 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-4xl sm:text-5xl text-[#cf4e71] tracking-tight font-medium">
                {formatBRL(product.price)}
              </span>
            </div>
            <p className="text-[#dc8494] text-sm mb-6">
              ou em até 3x sem juros no cartão
            </p>

            <div className="space-y-2 mb-6">
              <h3 className="text-[#3a2129] tracking-wide uppercase text-xs">
                Descrição
              </h3>
              <p className="text-[#3a2129]/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            <Card className="bg-white border-[#ecb4bc]/40 p-4 sm:p-5 mb-6 rounded-2xl">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                {[
                  { icon: Truck, label: "Entrega hoje" },
                  { icon: Gift, label: "Embalagem grátis" },
                  { icon: Shield, label: "Produto original" },
                ].map((it, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 sm:gap-1.5"
                  >
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#fbe9ed] flex items-center justify-center text-[#cf4e71]">
                      <it.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-[10px] sm:text-xs text-[#3a2129] leading-tight">{it.label}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4 bg-[#ecb4bc]/40" />
              <ul className="space-y-2 text-sm text-[#3a2129]/80">
                {[
                  "Embalagem para presente inclusa",
                  "Disponível para retirada em Ribeirão Preto",
                  "Atendimento personalizado via WhatsApp",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#cf4e71] mt-0.5 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </Card>

            {/* MEGA CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-[#ecb4bc]/30 z-50 sm:relative sm:p-0 sm:bg-transparent sm:backdrop-blur-none sm:border-0 sm:z-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full relative inline-flex items-center justify-center gap-3 h-14 sm:h-16 rounded-xl sm:rounded-2xl text-white text-base sm:text-lg shadow-xl shadow-[#cf4e71]/30 sm:shadow-2xl sm:shadow-[#cf4e71]/40 hover:shadow-[#cf4e71]/60 hover:-translate-y-0.5 transition-all font-medium"
                style={{
                  background:
                    "linear-gradient(135deg, #eb92ab 0%, #cf4e71 50%, #b8425f 100%)",
                }}
              >
                <span className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-white/20" />
                <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>Tenho interesse</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
              <p className="hidden sm:block text-center text-xs text-[#dc8494] mt-3">
                Resposta rápida pelo WhatsApp · +{settings.whatsapp_number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
