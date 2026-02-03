export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      casinos: {
        Row: {
          affiliate_url: string | null
          bonus_amount: string
          bonus_title: string
          bonus_type: string
          cons: string[] | null
          created_at: string
          description: string | null
          features: string[] | null
          free_spins: string | null
          game_providers: Json | null
          id: string
          is_active: boolean
          is_hot: boolean
          is_recommended: boolean
          logo_url: string | null
          min_deposit: string
          name: string
          payout_time: string
          position: number
          pros: string[] | null
          rating: number
          slug: string
          updated_at: string
          validity: string
          wagering_requirements: string
        }
        Insert: {
          affiliate_url?: string | null
          bonus_amount: string
          bonus_title: string
          bonus_type?: string
          cons?: string[] | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          free_spins?: string | null
          game_providers?: Json | null
          id?: string
          is_active?: boolean
          is_hot?: boolean
          is_recommended?: boolean
          logo_url?: string | null
          min_deposit?: string
          name: string
          payout_time?: string
          position?: number
          pros?: string[] | null
          rating?: number
          slug: string
          updated_at?: string
          validity?: string
          wagering_requirements?: string
        }
        Update: {
          affiliate_url?: string | null
          bonus_amount?: string
          bonus_title?: string
          bonus_type?: string
          cons?: string[] | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          free_spins?: string | null
          game_providers?: Json | null
          id?: string
          is_active?: boolean
          is_hot?: boolean
          is_recommended?: boolean
          logo_url?: string | null
          min_deposit?: string
          name?: string
          payout_time?: string
          position?: number
          pros?: string[] | null
          rating?: number
          slug?: string
          updated_at?: string
          validity?: string
          wagering_requirements?: string
        }
        Relationships: []
      }
      click_events: {
        Row: {
          casino_id: string | null
          casino_name: string
          casino_slug: string
          created_at: string
          event_type: string
          id: string
          referrer: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          casino_id?: string | null
          casino_name: string
          casino_slug: string
          created_at?: string
          event_type?: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          casino_id?: string | null
          casino_name?: string
          casino_slug?: string
          created_at?: string
          event_type?: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "click_events_casino_id_fkey"
            columns: ["casino_id"]
            isOneToOne: false
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "click_events_casino_id_fkey"
            columns: ["casino_id"]
            isOneToOne: false
            referencedRelation: "casinos_public"
            referencedColumns: ["id"]
          },
        ]
      }
      highlight_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          position: number
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          position?: number
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          position?: number
          slug?: string
        }
        Relationships: []
      }
      highlight_category_assignments: {
        Row: {
          category_id: string
          created_at: string
          highlight_id: string
          id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          highlight_id: string
          id?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          highlight_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlight_category_assignments_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "highlight_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "highlight_category_assignments_highlight_id_fkey"
            columns: ["highlight_id"]
            isOneToOne: false
            referencedRelation: "highlights"
            referencedColumns: ["id"]
          },
        ]
      }
      highlights: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          platform: string
          position: number
          thumbnail_url: string | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          platform?: string
          position?: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          platform?: string
          position?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlights_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "highlight_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          path: string
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          twitch_id: string | null
          twitch_username: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          twitch_id?: string | null
          twitch_username?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          twitch_id?: string | null
          twitch_username?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      shop_items: {
        Row: {
          created_at: string
          description: string | null
          external_url: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          position: number
          price: string
          slug: string
          stock: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          position?: number
          price?: string
          slug: string
          stock?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          position?: number
          price?: string
          slug?: string
          stock?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      slot_game_results: {
        Row: {
          bet_amount: number
          bonus_win_amount: number
          created_at: string
          id: string
          is_bonus_triggered: boolean
          user_id: string
          win_amount: number
        }
        Insert: {
          bet_amount?: number
          bonus_win_amount?: number
          created_at?: string
          id?: string
          is_bonus_triggered?: boolean
          user_id: string
          win_amount?: number
        }
        Update: {
          bet_amount?: number
          bonus_win_amount?: number
          created_at?: string
          id?: string
          is_bonus_triggered?: boolean
          user_id?: string
          win_amount?: number
        }
        Relationships: []
      }
      slot_spins: {
        Row: {
          created_at: string
          date: string
          id: string
          spins_remaining: number
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          spins_remaining?: number
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          spins_remaining?: number
          user_id?: string
        }
        Relationships: []
      }
      slot_symbols: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          is_scatter: boolean
          is_wild: boolean
          multiplier_2: number | null
          multiplier_3: number
          multiplier_4: number
          multiplier_5: number
          name: string
          position: number
          rarity: string
          weight: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_scatter?: boolean
          is_wild?: boolean
          multiplier_2?: number | null
          multiplier_3?: number
          multiplier_4?: number
          multiplier_5?: number
          name: string
          position?: number
          rarity?: string
          weight?: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_scatter?: boolean
          is_wild?: boolean
          multiplier_2?: number | null
          multiplier_3?: number
          multiplier_4?: number
          multiplier_5?: number
          name?: string
          position?: number
          rarity?: string
          weight?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      casinos_public: {
        Row: {
          bonus_amount: string | null
          bonus_title: string | null
          bonus_type: string | null
          cons: string[] | null
          created_at: string | null
          description: string | null
          features: string[] | null
          free_spins: string | null
          game_providers: Json | null
          id: string | null
          is_active: boolean | null
          is_hot: boolean | null
          is_recommended: boolean | null
          logo_url: string | null
          min_deposit: string | null
          name: string | null
          payout_time: string | null
          position: number | null
          pros: string[] | null
          rating: number | null
          slug: string | null
          updated_at: string | null
          validity: string | null
          wagering_requirements: string | null
        }
        Insert: {
          bonus_amount?: string | null
          bonus_title?: string | null
          bonus_type?: string | null
          cons?: string[] | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          free_spins?: string | null
          game_providers?: Json | null
          id?: string | null
          is_active?: boolean | null
          is_hot?: boolean | null
          is_recommended?: boolean | null
          logo_url?: string | null
          min_deposit?: string | null
          name?: string | null
          payout_time?: string | null
          position?: number | null
          pros?: string[] | null
          rating?: number | null
          slug?: string | null
          updated_at?: string | null
          validity?: string | null
          wagering_requirements?: string | null
        }
        Update: {
          bonus_amount?: string | null
          bonus_title?: string | null
          bonus_type?: string | null
          cons?: string[] | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          free_spins?: string | null
          game_providers?: Json | null
          id?: string | null
          is_active?: boolean | null
          is_hot?: boolean | null
          is_recommended?: boolean | null
          logo_url?: string | null
          min_deposit?: string | null
          name?: string | null
          payout_time?: string | null
          position?: number | null
          pros?: string[] | null
          rating?: number | null
          slug?: string | null
          updated_at?: string | null
          validity?: string | null
          wagering_requirements?: string | null
        }
        Relationships: []
      }
      shop_items_public: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          image_url: string | null
          is_active: boolean | null
          name: string | null
          position: number | null
          price: string | null
          slug: string | null
          stock: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          name?: string | null
          position?: number | null
          price?: string | null
          slug?: string | null
          stock?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          image_url?: string | null
          is_active?: boolean | null
          name?: string | null
          position?: number | null
          price?: string | null
          slug?: string | null
          stock?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      slot_leaderboard: {
        Row: {
          biggest_win: number | null
          daily_winnings: number | null
          total_spins: number | null
          total_winnings: number | null
          user_id: string | null
          weekly_winnings: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "casino_owner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "casino_owner"],
    },
  },
} as const
