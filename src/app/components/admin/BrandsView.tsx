"use client";

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus, Pencil, Trash2, X, Loader2, Search } from "lucide-react";
import { fetchBrands, createBrand, updateBrand, deleteBrand } from "../../actions/brand";

interface Brand {
  id: string;
  name: string;
  created_at: string;
}

export function BrandsView() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [formName, setFormName] = useState("");
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");

  const loadBrands = async () => {
    setLoading(true);
    const data = await fetchBrands();
    setBrands(data);
    setLoading(false);
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const reset = () => {
    setEditing(null);
    setFormName("");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("name", formName);

    let result;
    if (editing) {
      formData.append("id", editing.id);
      formData.append("oldName", editing.name);
      result = await updateBrand(null, formData);
    } else {
      result = await createBrand(null, formData);
    }

    setPending(false);

    if (result.success) {
      reset();
      loadBrands();
    } else {
      setErrorMsg(result.error || "Ocorreu um erro ao salvar.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta marca?")) return;
    
    setPending(true);
    const formData = new FormData();
    formData.append("id", id);
    await deleteBrand(null, formData);
    setPending(false);
    loadBrands();
  };

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid xl:grid-cols-3 gap-6 w-full">
      {/* List */}
      <Card className="xl:col-span-2 bg-white border-[#ecb4bc]/40 p-0 rounded-2xl overflow-hidden shadow-sm min-w-0">
        <div className="p-5 border-b border-[#ecb4bc]/40 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <h2 className="text-[#1f1115]">Marcas cadastradas</h2>
          <div className="relative w-full sm:w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#dc8494]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar marca..."
              className="pl-9 border-[#ecb4bc]/70 focus-visible:ring-[#cf4e71] bg-[#fbe9ed]/40"
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-[560px] w-full">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-[#fbe9ed]/60 sticky top-0">
              <tr className="text-left text-xs tracking-wider uppercase text-[#cf4e71]">
                <th className="p-2 sm:p-4">Nome da Marca</th>
                <th className="p-2 sm:p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className="p-10 text-center text-[#dc8494]">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-10 text-center text-[#dc8494]">
                    Nenhuma marca encontrada.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t border-[#ecb4bc]/30 hover:bg-[#fbe9ed]/40 transition-colors"
                  >
                    <td className="p-2 sm:p-4 text-[#3a2129] font-medium text-sm sm:text-base">
                      <div className="truncate max-w-[120px] sm:max-w-xs">
                        {b.name}
                      </div>
                    </td>
                    <td className="p-2 sm:p-4">
                      <div className="flex justify-end gap-1 sm:gap-1.5">
                        <button
                          onClick={() => {
                            setEditing(b);
                            setFormName(b.name);
                            setErrorMsg("");
                          }}
                          className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center text-[#cf4e71] bg-[#fbe9ed]/50 hover:bg-[#cf4e71] hover:text-white transition-colors shrink-0"
                          aria-label="Editar"
                        >
                          <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          disabled={pending}
                          className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center text-[#cf4e71] bg-[#fbe9ed]/50 hover:bg-[#cf4e71] hover:text-white transition-colors disabled:opacity-50 shrink-0"
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Form */}
      <Card className="bg-white border-[#ecb4bc]/40 rounded-2xl p-5 shadow-sm h-fit xl:sticky xl:top-6 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[#1f1115]">
              {editing ? "Editar marca" : "Adicionar marca"}
            </h2>
            <p className="text-xs text-[#dc8494] mt-1">
              Preencha o nome
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
          <div>
            <Label htmlFor="name" className="text-[#3a2129] text-sm">
              Nome da Marca *
            </Label>
            <Input
              id="name"
              name="name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Ex: Natura"
              className="mt-1.5 border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm mt-2">
              {errorMsg}
            </p>
          )}

          <div className="pt-4 mt-4 border-t border-[#ecb4bc]/20">
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
                : editing
                ? "Salvar alterações"
                : "Adicionar marca"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
