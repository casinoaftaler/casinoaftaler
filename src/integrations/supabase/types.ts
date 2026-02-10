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
      community_bonus_spins: {
        Row: {
          created_at: string
          id: string
          rewarded_clips_count: number
          total_activated: number
          total_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          rewarded_clips_count?: number
          total_activated?: number
          total_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          rewarded_clips_count?: number
          total_activated?: number
          total_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      community_bonus_spins_log: {
        Row: {
          amount: number
          clip_id: string | null
          created_at: string
          event_type: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          clip_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          clip_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      community_clip_comments: {
        Row: {
          clip_id: string
          content: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          clip_id: string
          content: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          clip_id?: string
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_clip_comments_clip_id_fkey"
            columns: ["clip_id"]
            isOneToOne: false
            referencedRelation: "community_clips"
            referencedColumns: ["id"]
          },
        ]
      }
      community_clip_likes: {
        Row: {
          clip_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          clip_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          clip_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_clip_likes_clip_id_fkey"
            columns: ["clip_id"]
            isOneToOne: false
            referencedRelation: "community_clips"
            referencedColumns: ["id"]
          },
        ]
      }
      community_clips: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          categories: string[] | null
          created_at: string
          description: string | null
          duration_seconds: number | null
          id: string
          original_url: string | null
          platform: string
          playback_type: string | null
          rejection_reason: string | null
          requires_manual_review: boolean | null
          status: Database["public"]["Enums"]["clip_status"]
          thumbnail_url: string | null
          title: string | null
          updated_at: string
          url: string
          user_id: string
          validation_notes: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          categories?: string[] | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          original_url?: string | null
          platform?: string
          playback_type?: string | null
          rejection_reason?: string | null
          requires_manual_review?: boolean | null
          status?: Database["public"]["Enums"]["clip_status"]
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          url: string
          user_id: string
          validation_notes?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          categories?: string[] | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          original_url?: string | null
          platform?: string
          playback_type?: string | null
          rejection_reason?: string | null
          requires_manual_review?: boolean | null
          status?: Database["public"]["Enums"]["clip_status"]
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          url?: string
          user_id?: string
          validation_notes?: string | null
        }
        Relationships: []
      }
      credit_allocation_log: {
        Row: {
          admin_user_id: string | null
          amount: number
          created_at: string
          id: string
          note: string | null
          source: string
          user_id: string
        }
        Insert: {
          admin_user_id?: string | null
          amount: number
          created_at?: string
          id?: string
          note?: string | null
          source: string
          user_id: string
        }
        Update: {
          admin_user_id?: string | null
          amount?: number
          created_at?: string
          id?: string
          note?: string | null
          source?: string
          user_id?: string
        }
        Relationships: []
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
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          title?: string | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          path: string
          referrer: string | null
          user_agent: string | null
          user_id: string | null
          visitor_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
          visitor_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          biggest_spin_win: number | null
          biggest_x_win: number | null
          bio: string | null
          bonus_spins_permanent: number | null
          created_at: string
          display_name: string | null
          favorite_casino: string | null
          favorite_provider: string | null
          favorite_slot: string | null
          favorites_section_completed: boolean | null
          hide_amounts: boolean | null
          highest_win_amount: number | null
          highest_win_casino: string | null
          highest_win_game: string | null
          id: string
          play_styles: string[] | null
          playstyle_section_completed: boolean | null
          preferred_game_type: string | null
          profile_prompt_dismissed: boolean
          profile_section_completed: boolean | null
          stats_public: boolean | null
          stats_section_completed: boolean | null
          twitch_badges: Json | null
          twitch_badges_updated_at: string | null
          twitch_follow_date: string | null
          twitch_id: string | null
          twitch_username: string | null
          typical_bet_size: string | null
          updated_at: string
          user_id: string
          volatility_preference: string | null
        }
        Insert: {
          avatar_url?: string | null
          biggest_spin_win?: number | null
          biggest_x_win?: number | null
          bio?: string | null
          bonus_spins_permanent?: number | null
          created_at?: string
          display_name?: string | null
          favorite_casino?: string | null
          favorite_provider?: string | null
          favorite_slot?: string | null
          favorites_section_completed?: boolean | null
          hide_amounts?: boolean | null
          highest_win_amount?: number | null
          highest_win_casino?: string | null
          highest_win_game?: string | null
          id?: string
          play_styles?: string[] | null
          playstyle_section_completed?: boolean | null
          preferred_game_type?: string | null
          profile_prompt_dismissed?: boolean
          profile_section_completed?: boolean | null
          stats_public?: boolean | null
          stats_section_completed?: boolean | null
          twitch_badges?: Json | null
          twitch_badges_updated_at?: string | null
          twitch_follow_date?: string | null
          twitch_id?: string | null
          twitch_username?: string | null
          typical_bet_size?: string | null
          updated_at?: string
          user_id: string
          volatility_preference?: string | null
        }
        Update: {
          avatar_url?: string | null
          biggest_spin_win?: number | null
          biggest_x_win?: number | null
          bio?: string | null
          bonus_spins_permanent?: number | null
          created_at?: string
          display_name?: string | null
          favorite_casino?: string | null
          favorite_provider?: string | null
          favorite_slot?: string | null
          favorites_section_completed?: boolean | null
          hide_amounts?: boolean | null
          highest_win_amount?: number | null
          highest_win_casino?: string | null
          highest_win_game?: string | null
          id?: string
          play_styles?: string[] | null
          playstyle_section_completed?: boolean | null
          preferred_game_type?: string | null
          profile_prompt_dismissed?: boolean
          profile_section_completed?: boolean | null
          stats_public?: boolean | null
          stats_section_completed?: boolean | null
          twitch_badges?: Json | null
          twitch_badges_updated_at?: string | null
          twitch_follow_date?: string | null
          twitch_id?: string | null
          twitch_username?: string | null
          typical_bet_size?: string | null
          updated_at?: string
          user_id?: string
          volatility_preference?: string | null
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
      slot_active_sessions: {
        Row: {
          created_at: string
          device_info: string | null
          game_id: string | null
          id: string
          last_heartbeat: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_info?: string | null
          game_id?: string | null
          id?: string
          last_heartbeat?: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_info?: string | null
          game_id?: string | null
          id?: string
          last_heartbeat?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      slot_bonus_state: {
        Row: {
          bonus_winnings: number
          created_at: string
          expanding_symbol_id: string | null
          expanding_symbol_ids: string[] | null
          expanding_symbol_name: string | null
          expanding_symbol_names: string[] | null
          free_spins_remaining: number
          game_id: string
          id: string
          is_active: boolean
          total_free_spins: number
          updated_at: string
          user_id: string
        }
        Insert: {
          bonus_winnings?: number
          created_at?: string
          expanding_symbol_id?: string | null
          expanding_symbol_ids?: string[] | null
          expanding_symbol_name?: string | null
          expanding_symbol_names?: string[] | null
          free_spins_remaining?: number
          game_id?: string
          id?: string
          is_active?: boolean
          total_free_spins?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          bonus_winnings?: number
          created_at?: string
          expanding_symbol_id?: string | null
          expanding_symbol_ids?: string[] | null
          expanding_symbol_name?: string | null
          expanding_symbol_names?: string[] | null
          free_spins_remaining?: number
          game_id?: string
          id?: string
          is_active?: boolean
          total_free_spins?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      slot_game_results: {
        Row: {
          bet_amount: number
          bonus_win_amount: number
          created_at: string
          game_id: string
          id: string
          is_bonus_triggered: boolean
          user_id: string
          win_amount: number
        }
        Insert: {
          bet_amount?: number
          bonus_win_amount?: number
          created_at?: string
          game_id?: string
          id?: string
          is_bonus_triggered?: boolean
          user_id: string
          win_amount?: number
        }
        Update: {
          bet_amount?: number
          bonus_win_amount?: number
          created_at?: string
          game_id?: string
          id?: string
          is_bonus_triggered?: boolean
          user_id?: string
          win_amount?: number
        }
        Relationships: []
      }
      slot_points_audit_log: {
        Row: {
          action_type: string
          admin_user_id: string
          created_at: string
          id: string
          new_points: number
          previous_points: number
          reason: string | null
          target_user_id: string
        }
        Insert: {
          action_type: string
          admin_user_id: string
          created_at?: string
          id?: string
          new_points?: number
          previous_points?: number
          reason?: string | null
          target_user_id: string
        }
        Update: {
          action_type?: string
          admin_user_id?: string
          created_at?: string
          id?: string
          new_points?: number
          previous_points?: number
          reason?: string | null
          target_user_id?: string
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
      slot_statistics_archive: {
        Row: {
          biggest_win: number
          created_at: string
          id: string
          last_reset_at: string | null
          reset_count: number
          total_bets: number
          total_bonuses: number
          total_spins: number
          total_winnings: number
          unique_players: number
          updated_at: string
        }
        Insert: {
          biggest_win?: number
          created_at?: string
          id?: string
          last_reset_at?: string | null
          reset_count?: number
          total_bets?: number
          total_bonuses?: number
          total_spins?: number
          total_winnings?: number
          unique_players?: number
          updated_at?: string
        }
        Update: {
          biggest_win?: number
          created_at?: string
          id?: string
          last_reset_at?: string | null
          reset_count?: number
          total_bets?: number
          total_bonuses?: number
          total_spins?: number
          total_winnings?: number
          unique_players?: number
          updated_at?: string
        }
        Relationships: []
      }
      slot_symbols: {
        Row: {
          bonus_weight: number
          created_at: string
          game_id: string
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
          bonus_weight?: number
          created_at?: string
          game_id?: string
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
          bonus_weight?: number
          created_at?: string
          game_id?: string
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
      user_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          notification_id: string
          read_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          notification_id: string
          read_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          notification_id?: string
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_notifications_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
        ]
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
      profiles_leaderboard: {
        Row: {
          avatar_url: string | null
          display_name: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          display_name?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          display_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles_public: {
        Row: {
          avatar_url: string | null
          biggest_spin_win: number | null
          biggest_x_win: number | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          favorite_casino: string | null
          favorite_provider: string | null
          favorite_slot: string | null
          hide_amounts: boolean | null
          highest_win_amount: number | null
          highest_win_casino: string | null
          highest_win_game: string | null
          play_styles: string[] | null
          preferred_game_type: string | null
          typical_bet_size: string | null
          user_id: string | null
          volatility_preference: string | null
        }
        Insert: {
          avatar_url?: string | null
          biggest_spin_win?: never
          biggest_x_win?: never
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          favorite_casino?: string | null
          favorite_provider?: string | null
          favorite_slot?: string | null
          hide_amounts?: boolean | null
          highest_win_amount?: never
          highest_win_casino?: string | null
          highest_win_game?: string | null
          play_styles?: string[] | null
          preferred_game_type?: string | null
          typical_bet_size?: string | null
          user_id?: string | null
          volatility_preference?: string | null
        }
        Update: {
          avatar_url?: string | null
          biggest_spin_win?: never
          biggest_x_win?: never
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          favorite_casino?: string | null
          favorite_provider?: string | null
          favorite_slot?: string | null
          hide_amounts?: boolean | null
          highest_win_amount?: never
          highest_win_casino?: string | null
          highest_win_game?: string | null
          play_styles?: string[] | null
          preferred_game_type?: string | null
          typical_bet_size?: string | null
          user_id?: string | null
          volatility_preference?: string | null
        }
        Relationships: []
      }
      slot_leaderboard: {
        Row: {
          biggest_multiplier: number | null
          biggest_win: number | null
          daily_winnings: number | null
          total_bonuses: number | null
          total_spins: number | null
          total_winnings: number | null
          user_id: string | null
          weekly_winnings: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_admin_users_with_email: {
        Args: never
        Returns: {
          created_at: string
          email: string
          id: string
          role: string
          user_id: string
        }[]
      }
      get_user_id_by_email: { Args: { lookup_email: string }; Returns: string }
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
      clip_status: "pending" | "approved" | "rejected"
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
      clip_status: ["pending", "approved", "rejected"],
    },
  },
} as const
