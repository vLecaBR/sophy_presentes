"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { fetchSettings, updateSettings, type StoreSettings } from "../../actions/settings";

export function SettingsView() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateSettings(null, formData);
    
    setPending(false);
    if (result.success) {
      setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
      // Update local state to reflect changes without needing to refresh
      setSettings((prev) => prev ? {
        ...prev,
        whatsapp_number: formData.get('whatsapp_number') as string,
        whatsapp_message: formData.get('whatsapp_message') as string,
        instagram_handle: formData.get('instagram_handle') as string,
        store_address: formData.get('store_address') as string,
        business_hours: formData.get('business_hours') as string,
      } : null);
    } else {
      setMessage({ type: 'error', text: result.error || 'Erro ao salvar configurações.' });
    }
  };

  if (loading) {
    return (
      <Card className="bg-white border-[#ecb4bc]/40 rounded-2xl p-8 shadow-sm flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-[#cf4e71] animate-spin" />
      </Card>
    );
  }

  return (
    <Card className="bg-white border-[#ecb4bc]/40 rounded-2xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
      <div className="mb-6 border-b border-[#ecb4bc]/40 pb-4">
        <h2 className="text-xl font-medium text-[#1f1115]">Configurações da Loja</h2>
        <p className="text-sm text-[#dc8494] mt-1">
          Gerencie as informações de contato e exibição pública da loja.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div>
            <Label htmlFor="whatsapp_number" className="text-[#3a2129] text-sm">
              WhatsApp (Apenas números, com DDI e DDD)
            </Label>
            <Input
              id="whatsapp_number"
              name="whatsapp_number"
              defaultValue={settings?.whatsapp_number}
              placeholder="Ex: 5516988523009"
              className="mt-1.5 border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>

          <div>
            <Label htmlFor="whatsapp_message" className="text-[#3a2129] text-sm">
              Mensagem Padrão do WhatsApp
            </Label>
            <Input
              id="whatsapp_message"
              name="whatsapp_message"
              defaultValue={settings?.whatsapp_message}
              placeholder="Ex: Olá Sophy Presentes!"
              className="mt-1.5 border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>

          <div>
            <Label htmlFor="instagram_handle" className="text-[#3a2129] text-sm">
              Instagram Handle (sem o @)
            </Label>
            <Input
              id="instagram_handle"
              name="instagram_handle"
              defaultValue={settings?.instagram_handle}
              placeholder="Ex: sophy_presentesrp"
              className="mt-1.5 border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>

          <div>
            <Label htmlFor="store_address" className="text-[#3a2129] text-sm">
              Endereço da Loja
            </Label>
            <Input
              id="store_address"
              name="store_address"
              defaultValue={settings?.store_address}
              placeholder="Ex: Rua das Flores, 123"
              className="mt-1.5 border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>

          <div>
            <Label htmlFor="business_hours" className="text-[#3a2129] text-sm">
              Horário de Funcionamento
            </Label>
            <Input
              id="business_hours"
              name="business_hours"
              defaultValue={settings?.business_hours}
              placeholder="Ex: Seg-Sáb, 09h às 18h"
              className="mt-1.5 border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="w-full sm:w-auto bg-[#cf4e71] hover:bg-[#b8425f] text-white rounded-full h-11 px-8 shadow-md shadow-[#cf4e71]/25 disabled:opacity-70 mt-6"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {pending ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </form>
    </Card>
  );
}
