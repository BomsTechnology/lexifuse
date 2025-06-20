import { LevelProps } from '../types/LevelProps';
import { supabase } from '../utils/supabase';

export async function getLevels() {
  const levels = await supabase
    .from('levels')
    .select('id,name,level,nb_points, languages(id,name,image)')
    .order('name', { ascending: true })
    .throwOnError();
  return levels.data;
}

export async function getLevelById(levelId: string) {
  const level = await supabase
    .from('levels')
    .select('id,name,level,nb_points, languages(id,name,image,iso_code)')
    .eq('id', levelId)
    .single()
    .throwOnError();
  return level.data;
}

export async function getLevelsByLanguage(languageId: string) {
  const levels = await supabase
    .from('levels')
    .select('id,name,level,nb_points, languages(id,name,image,iso_code)')
    .eq('language_id', languageId)
    .order('name', { ascending: true })
    .throwOnError();
  return levels.data;
}

export async function goToNextLevel({
  id_language,
  next_level,
}: {
  id_language: string;
  next_level: number;
}): Promise<boolean> {
  const { data: goTonextLevel } = await supabase
    .rpc('go_to_next_level', {
      id_language,
      next_level,
    })
    .throwOnError();
  return goTonextLevel! || false;
}

export async function getLevelByLevelAndLanguage(props: {
  level: number;
  language: string;
}): Promise<LevelProps> {
  const level = await supabase
    .from('levels')
    .select('id,name,level,nb_points, languages(id,name,image,iso_code)')
    .eq('level', props.level)
    .eq('language_id', props.language)
    .single()
    .throwOnError();
  return level.data!;
}
