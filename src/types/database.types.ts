export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      games: {
        Row: {
          created_at: string
          id: string
          language_id: string | null
          level: number
          nb_points: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          language_id?: string | null
          level?: number
          nb_points?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          language_id?: string | null
          level?: number
          nb_points?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_games_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_games_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          created_at: string
          id: string
          image: string
          iso_code: string | null
          name: string
          path: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image: string
          iso_code?: string | null
          name: string
          path?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image?: string
          iso_code?: string | null
          name?: string
          path?: string | null
        }
        Relationships: []
      }
      levels: {
        Row: {
          created_at: string
          id: string
          language_id: string | null
          level: number
          name: string
          nb_points: number
        }
        Insert: {
          created_at?: string
          id?: string
          language_id?: string | null
          level?: number
          name: string
          nb_points: number
        }
        Update: {
          created_at?: string
          id?: string
          language_id?: string | null
          level?: number
          name?: string
          nb_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_levels_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          created_at: string
          email: string | null
          id: string
          nb_pieces: number
          type: string
          username: string | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nb_pieces?: number
          type?: string
          username?: string | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nb_pieces?: number
          type?: string
          username?: string | null
        }
        Relationships: []
      }
      words: {
        Row: {
          answer: string
          created_at: string
          id: string
          level_id: string | null
          meaning: string
          word: string
          word1: string
          word2: string
          word3: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          level_id?: string | null
          meaning: string
          word: string
          word1: string
          word2: string
          word3: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          level_id?: string | null
          meaning?: string
          word?: string
          word1?: string
          word2?: string
          word3?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_words_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_game_words: {
        Args: {
          lang_id: string
          l: number
        }
        Returns: {
          answer: string
          created_at: string
          id: string
          level_id: string | null
          meaning: string
          word: string
          word1: string
          word2: string
          word3: string
        }[]
      }
      set_game_user: {
        Args: {
          id_game: string
          id_user: string
          id_language: string
          nb_po: number
          nb_pi: number
          level_points: number
          next_level: number
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
