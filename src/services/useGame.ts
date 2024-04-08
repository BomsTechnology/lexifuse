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
  const data = await supabase
    .from('games')
    .insert([
      {
        user_id: userId,
        language_id: languageId,
      },
    ])
    .select();
  const game = await getGame(data.data![0].id);
  return {
    game: game!,
    user,
  };
}

export async function getGame(gameId: string) {
  const game = await supabase
    .from('games')
    .select('id,level,nb_points, users(id,username,email,type), languages(id,name,image,iso_code)')
    .eq('id', gameId)
    .single()
    .throwOnError();
  return game.data;
}

export async function setGameUser({
  id_game,
  id_user,
  id_language,
  nb_po,
  nb_pi,
  level_points,
  next_level,
}: {
  id_game: string;
  id_user: string;
  id_language: string;
  nb_po: number;
  nb_pi: number;
  level_points: number;
  next_level: number;
}): Promise<boolean> {
  await supabase
    .rpc('set_game_user', {
      id_game,
      id_user,
      nb_po,
      nb_pi,
    })
    .throwOnError();
  if (nb_po > level_points) {
    const { data: goTonextLevel } = await supabase
      .rpc('go_to_next_level', {
        id_language,
        next_level,
      })
      .throwOnError();
    return goTonextLevel! || false;
  } else {
    return false;
  }
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
