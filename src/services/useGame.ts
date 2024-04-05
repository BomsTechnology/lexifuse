import { loginAnonymously } from './useAuth';
import { Database } from '../types/database.types';
import { supabase } from '../utils/supabase';

export async function createGame(userId: string, languageId: string) {
  let user = null;
  if (userId === '') {
    const data = await loginAnonymously();
    if (data) {
      user = data;
      userId = data.id;
    }
  }
  const game = await supabase
    .from('games')
    .insert([
      {
        user_id: userId,
        language_id: languageId,
      },
    ])
    .select();

  return {
    game: game.data?.[0],
    user,
  };
}

export async function getGame(gameId: string) {
  const game = await supabase.from('games').select('*').eq('id', gameId).single().throwOnError();
  return game.data;
}

export async function getUserGames(userId: string) {
  const games = await supabase
    .from('games')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .throwOnError();
  return games.data;
}
