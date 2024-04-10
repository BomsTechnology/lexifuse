import { Database } from '../types/database.types';
import { supabase } from '../utils/supabase';

export async function getLanguages(): Promise<Database['public']['Tables']['languages']['Row'][]> {
  const languages = await supabase.from('languages').select('*').throwOnError();
  return languages.data || [];
}

export async function getLanguageByIso(
  iso: string
): Promise<Database['public']['Tables']['languages']['Row']> {
  const language = await supabase
    .from('languages')
    .select('*')
    .eq('iso_code', iso)
    .throwOnError()
    .single();
  return language.data!;
}
