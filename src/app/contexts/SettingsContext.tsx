import { createContext, useContext, useEffect, useState } from "react";
import { fetchSettings, type StoreSettings } from "../actions/settings";

const SettingsContext = createContext<StoreSettings | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings | null>(null);

  useEffect(() => {
    fetchSettings().then(setSettings);
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    return {
      id: 1,
      whatsapp_number: '5516988523009',
      whatsapp_message: 'Olá Sophy Presentes!',
      instagram_handle: 'sophy_presentesrp',
      store_address: 'Ribeirão Preto · SP',
      business_hours: 'Segunda a sábado, 09h às 19h'
    } as StoreSettings;
  }
  return context;
}
