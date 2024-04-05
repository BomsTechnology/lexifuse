import { Database } from '../types/database.types';
import { supabase } from '../utils/supabase';

export async function getLanguages(): Promise<Database['public']['Tables']['languages']['Row'][]> {
  const languages = await supabase.from('languages').select('*').throwOnError();
  return languages.data || [];
}


