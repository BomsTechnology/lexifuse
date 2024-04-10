import { Database } from '../types/database.types';
import { supabase } from '../utils/supabase';

export async function loginAnonymously() {
  const auth = await supabase.auth.signInAnonymously();
  if (auth.error) {
    console.log(auth.error);
    return null;
  }
  const user = await supabase
    .from('users')
    .insert([
      {
        auth_id: auth.data.user!.id,
      },
    ])
    .select();
  return user.data?.[0];
}

export async function createUser({
  email,
  password,
  username,
  auth_id,
}: {
  email: string;
  password: string;
  username: string;
  auth_id: string;
}) {
  if (auth_id !== '') {
    await supabase.auth.updateUser({ email, password });
  }
  const user = await supabase
    .from('users')
    .insert([
      {
        email,
        username,
        auth_id,
      },
    ])
    .select();
  return user.data?.[0];
}
