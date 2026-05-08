export type Brand = "Natura" | "Boticário" | "Eudora" | "Prata" | "Cacau Show";

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: Brand;
  description: string;
  image: string;
}

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
