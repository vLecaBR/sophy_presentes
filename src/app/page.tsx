import { HomeView } from './components/HomeView';
import { createServerClient } from '../lib/supabase/server';

export default async function Page() {
  const supabase = createServerClient();

  const { data: produtos } = await supabase
    .from('produtos')
    .select('id, name, price, brand, image_url, slug')
    .order('created_at', { ascending: false });

  return <HomeView products={produtos || []} />;
}