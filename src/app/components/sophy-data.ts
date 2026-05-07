export type Brand = "Natura" | "Boticário" | "Eudora" | "Prata" | "Cacau Show";

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: Brand;
  description: string;
  image: string;
}

export const BRANDS: Brand[] = [
  "Natura",
  "Boticário",
  "Eudora",
  "Prata",
  "Cacau Show",
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Kit Presente Floratta Blue",
    price: 189.9,
    brand: "Boticário",
    description:
      "Kit completo com perfume 75ml, hidratante corporal e sabonete líquido. Embalagem para presente inclusa.",
    image:
      "https://images.unsplash.com/photo-1713999495859-27397adbf481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "2",
    name: "Essencial Exclusivo Feminino",
    price: 245.0,
    brand: "Natura",
    description:
      "Deo Parfum 100ml, fragrância marcante com notas amadeiradas. Acompanha caixa decorada.",
    image:
      "https://images.unsplash.com/photo-1713999327513-1f45210c47ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "3",
    name: "Caixa Bombom Sortido 250g",
    price: 89.9,
    brand: "Cacau Show",
    description:
      "Seleção especial de bombons recheados em embalagem premium. Perfeito para datas especiais.",
    image:
      "https://images.unsplash.com/photo-1586359204685-1d007c9cf2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "4",
    name: "Pulseira Prata 925 Coração",
    price: 159.0,
    brand: "Prata",
    description:
      "Pulseira em prata 925 com pingente coração. Acompanha estojo de presente e certificado.",
    image:
      "https://images.unsplash.com/photo-1745542409293-f3319e40cda9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "5",
    name: "Eudora Siàge Cica Repair",
    price: 119.9,
    brand: "Eudora",
    description:
      "Tratamento capilar reparador para cabelos danificados. Embalagem de 250ml.",
    image:
      "https://images.unsplash.com/photo-1615396899839-c99c121888b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "6",
    name: "Kit Tododia Algodão",
    price: 99.5,
    brand: "Natura",
    description:
      "Hidratante corporal e sabonete em barra com fragrância suave de algodão.",
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "7",
    name: "Anel Solitário Prata",
    price: 129.0,
    brand: "Prata",
    description:
      "Anel solitário em prata 925 com zircônia central. Disponível em diversos tamanhos.",
    image:
      "https://images.unsplash.com/photo-1745542409120-a858a971516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "8",
    name: "Trufa Especial Caixa 12un",
    price: 69.9,
    brand: "Cacau Show",
    description:
      "Caixa com 12 trufas artesanais sabores variados. Ideal para presentear.",
    image:
      "https://images.unsplash.com/photo-1725127723309-7481abfff761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
