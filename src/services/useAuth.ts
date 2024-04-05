import { Database } from '../types/database.types';
import { supabase } from '../utils/supabase';

export async function loginAnonymously() {
  const user = await supabase.from('users').insert([{}]).select();
  return user.data?.[0];
}
