import { Database } from '../types/database.types';
import { supabase } from '../utils/supabase';

export async function loginAnonymously() {
  const user = await supabase.from('users').insert([{}]).select();
  return user.data?.[0];
}

export async function createUser({
  email,
  password,
  username,
  user_id,
}: {
  email: string;
  password: string;
  username: string;
  user_id: string;
}) {
  const auth = await supabase.auth.signUp({
    email,
    password,
  });

  if (user_id === '') {
    const user = await supabase
      .from('users')
      .insert([
        {
          auth_id: auth.data.user!.id,
          email,
          username,
        },
      ])
      .select();
    return user.data?.[0];
  } else {
    const user = await supabase
      .from('users')
      .update({ email, username, auth_id: auth.data.user!.id })
      .eq('id', user_id)
      .select();
    return user.data?.[0];
  }
}

export async function updateUser(password: string, username: string, user_id: string) {
  if (password) {
    await supabase.auth.updateUser({
      password,
    });
  }
  const user = await supabase.from('users').update({ username }).eq('id', user_id).select();
  return user.data?.[0];
}

export async function login(email: string, password: string) {
  const auth = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (auth.error) throw auth.error;
  const user = await supabase
    .from('users')
    .select()
    .eq('auth_id', auth.data.user!.id)
    .single()
    .throwOnError();
  const games = await supabase
    .from('games')
    .select('id,level,nb_points, users(id,username,email,type), languages(id,name,image,iso_code)')
    .eq('user_id', user.data?.id!)
    .order('created_at', { ascending: false })
    .throwOnError();
  return {
    user: user.data,
    games: games.data,
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
