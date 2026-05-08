"use client";

import { useState, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  UploadCloud,
  Search,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { BRANDS, formatBRL, type Brand, type Product } from "../sophy-data";
import { createProduct, updateProduct, deleteProduct } from "../../actions/product";

interface Props {
  products: Product[];
  onRefresh?: () => void;
}

const empty = {
  name: "",
  description: "",
  price: "",
  brand: "" as Brand | "",
  image: "",
};

function SubmitButton({ isEditing, pending }: { isEditing: boolean; pending: boolean }) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-[#cf4e71] hover:bg-[#b8425f] text-white rounded-full h-11 mt-2 shadow-md shadow-[#cf4e71]/25 disabled:opacity-70"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Plus className="h-4 w-4 mr-1" />
      )}
      {pending
        ? "Salvando..."
        : isEditing
        ? "Salvar alterações"
        : "Adicionar produto"}
    </Button>
  );
}

function DeleteButton({ id, imageUrl, onRefresh }: { id: string, imageUrl: string, onRefresh?: () => void }) {
  const [pending, setPending] = useState(false);
  
  const handleDelete = async () => {
    setPending(true);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("imageUrl", imageUrl);
    await deleteProduct(null, formData);
    setPending(false);
    onRefresh?.();
  };
  
  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="h-9 w-9 rounded-lg flex items-center justify-center text-[#cf4e71] bg-[#fbe9ed]/50 hover:bg-[#cf4e71] hover:text-white transition-colors disabled:opacity-50"
      aria-label="Excluir"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}

export function ProductsView({ products, onRefresh }: Props) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setEditing(null);
    setForm(empty);
    setErrorMsg("");
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    const result = editing ? await updateProduct(null, formData) : await createProduct(null, formData);
    setPending(false);
    if (result.success) {
      reset();
      onRefresh?.();
    } else {
      setErrorMsg(result.error || "Ocorreu um erro ao salvar.");
    }
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description || "",
      price: String(p.price),
      brand: p.brand as Brand,
      image: p.image,
    });
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () =>
      setForm((s) => ({ ...s, image: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) readFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(f);
        fileInputRef.current.files = dataTransfer.files;
      }
      readFile(f);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="grid xl:grid-cols-3 gap-6">
      {/* Table */}
      <Card className="xl:col-span-2 bg-white border-[#ecb4bc]/40 p-0 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#ecb4bc]/40 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <h2 className="text-[#1f1115]">Produtos cadastrados</h2>
          <div className="relative sm:w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#dc8494]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto..."
              className="pl-9 border-[#ecb4bc]/70 focus-visible:ring-[#cf4e71] bg-[#fbe9ed]/40"
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-[560px]">
          <table className="w-full">
            <thead className="bg-[#fbe9ed]/60 sticky top-0">
              <tr className="text-left text-xs tracking-wider uppercase text-[#cf4e71]">
                <th className="p-4">Imagem</th>
                <th className="p-4">Nome</th>
                <th className="p-4">Preço</th>
                <th className="p-4 hidden md:table-cell">Categoria</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-[#ecb4bc]/30 hover:bg-[#fbe9ed]/40 transition-colors"
                >
                  <td className="p-3">
                    <div className="h-12 w-12 rounded-xl overflow-hidden bg-[#fbe9ed] ring-1 ring-[#ecb4bc]/40">
                      <ImageWithFallback
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-3 max-w-xs">
                    <div className="truncate text-[#3a2129]">
                      {p.name}
                    </div>
                    <div className="text-xs text-[#dc8494] md:hidden">
                      {p.brand}
                    </div>
                  </td>
                  <td className="p-3 text-[#cf4e71] whitespace-nowrap">
                    {formatBRL(p.price)}
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <Badge className="bg-[#ecb4bc]/50 text-[#cf4e71] border-0 hover:bg-[#ecb4bc]/50 rounded-full">
                      {p.brand}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => openEdit(p)}
                        className="h-9 w-9 rounded-lg flex items-center justify-center text-[#cf4e71] bg-[#fbe9ed]/50 hover:bg-[#cf4e71] hover:text-white transition-colors"
                        aria-label="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <DeleteButton id={p.id} imageUrl={p.image} onRefresh={onRefresh} />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center text-[#dc8494]"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Form */}
      <Card className="bg-white border-[#ecb4bc]/40 rounded-2xl p-5 shadow-sm h-fit xl:sticky xl:top-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[#1f1115]">
              {editing ? "Editar produto" : "Adicionar produto"}
            </h2>
            <p className="text-xs text-[#dc8494] mt-1">
              Preencha os dados abaixo
            </p>
          </div>
          {editing && (
            <Button
              size="icon"
              variant="ghost"
              onClick={reset}
              className="text-[#cf4e71] hover:bg-[#fbe9ed]"
              aria-label="Cancelar edição"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {editing && <input type="hidden" name="id" value={editing.id} />}
          {editing && <input type="hidden" name="existingImage" value={editing.image} />}
          
          {/* Drag and drop */}
          <div>
            <Label className="text-[#3a2129] text-sm">
              Foto do produto
            </Label>
            <input
              name="image"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`mt-1.5 cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
                dragOver
                  ? "border-[#cf4e71] bg-[#fbe9ed]"
                  : "border-[#ecb4bc] bg-[#fbe9ed]/40 hover:bg-[#fbe9ed]"
              }`}
            >
              {form.image ? (
                <div className="flex items-center gap-3 text-left">
                  <ImageWithFallback
                    src={form.image}
                    alt="preview"
                    className="h-16 w-16 rounded-xl object-cover ring-2 ring-white"
                  />
                  <div className="text-sm">
                    <div className="text-[#cf4e71]">
                      Imagem carregada
                    </div>
                    <div className="text-xs text-[#dc8494]">
                      Clique ou arraste outra para trocar
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-[#cf4e71] shadow">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <div className="text-sm text-[#cf4e71]">
                    Fazer upload da foto
                  </div>
                  <div className="text-xs text-[#dc8494]">
                    Arraste e solte aqui ou clique para selecionar
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="text-[#3a2129] text-sm">
              Nome *
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Ex: Kit Floratta Blue"
              className="mt-1.5 border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>

          <div>
            <Label htmlFor="desc" className="text-[#3a2129] text-sm">
              Descrição
            </Label>
            <Textarea
              id="desc"
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Detalhes do produto..."
              rows={3}
              className="mt-1.5 border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label
                htmlFor="price"
                className="text-[#3a2129] text-sm"
              >
                Preço (R$) *
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                placeholder="0,00"
                className="mt-1.5 border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
              />
            </div>
            <div>
              <Label className="text-[#3a2129] text-sm">Marca *</Label>
              <input type="hidden" name="brand" value={form.brand} />
              <Select
                value={form.brand}
                onValueChange={(v) =>
                  setForm({ ...form, brand: v as Brand })
                }
              >
                <SelectTrigger className="mt-1.5 border-[#ecb4bc] focus:ring-[#cf4e71]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {BRANDS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm mt-2">
              {errorMsg}
            </p>
          )}

          <SubmitButton isEditing={!!editing} pending={pending} />
        </form>
      </Card>
    </div>
  );
}
