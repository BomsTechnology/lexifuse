import WordProps from '../types/WordProps';
import { supabase } from '../utils/supabase';

export async function getWords(props: { languageId: string; level: number }): Promise<WordProps[]> {
  const words = await supabase
    .rpc('get_game_words', {
      lang_id: props.languageId,
      l: props.level,
    })
    .throwOnError();
  return words.data || [];
}
