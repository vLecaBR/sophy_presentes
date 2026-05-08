import { AdminView } from "../components/AdminView";
import { createServerClient } from "../../lib/supabase/server";

export default async function AdminPage() {
  const supabase = createServerClient();
  const { data: products } = await supabase.from("produtos").select("*").order("created_at", { ascending: false });

  return (
    <AdminView products={products || []} />
  );
}
