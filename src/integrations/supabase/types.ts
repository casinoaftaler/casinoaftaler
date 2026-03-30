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
      bonus_hunt_archives: {
        Row: {
          api_data: Json
          average_x: number | null
          casino_name: string | null
          created_at: string
          end_balance: number | null
          hunt_name: string | null
          hunt_number: number
          hunt_status: string | null
          id: string
          opened_slots: number | null
          start_balance: number | null
          total_slots: number | null
          twitch_vod_id: string | null
          updated_at: string
          vod_date: string | null
        }
        Insert: {
          api_data: Json
          average_x?: number | null
          casino_name?: string | null
          created_at?: string
          end_balance?: number | null
          hunt_name?: string | null
          hunt_number: number
          hunt_status?: string | null
          id?: string
          opened_slots?: number | null
          start_balance?: number | null
          total_slots?: number | null
          twitch_vod_id?: string | null
          updated_at?: string
          vod_date?: string | null
        }
        Update: {
          api_data?: Json
          average_x?: number | null
          casino_name?: string | null
          created_at?: string
          end_balance?: number | null
          hunt_name?: string | null
          hunt_number?: number
          hunt_status?: string | null
          id?: string
          opened_slots?: number | null
          start_balance?: number | null
          total_slots?: number | null
          twitch_vod_id?: string | null
          updated_at?: string
          vod_date?: string | null
        }
        Relationships: []
      }
      bonus_hunt_avgx_bets: {
        Row: {
          bet_amount: number
          created_at: string
          group_letter: string
          id: string
          session_id: string
          user_id: string
          winnings: number | null
        }
        Insert: {
          bet_amount: number
          created_at?: string
          group_letter: string
          id?: string
          session_id: string
          user_id: string
          winnings?: number | null
        }
        Update: {
          bet_amount?: number
          created_at?: string
          group_letter?: string
          id?: string
          session_id?: string
          user_id?: string
          winnings?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bonus_hunt_avgx_bets_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "bonus_hunt_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      bonus_hunt_gtw_bets: {
        Row: {
          bet_amount: number
          created_at: string
          difference: number | null
          guess_amount: number
          id: string
          prize_points: number | null
          rank: number | null
          session_id: string
          user_id: string
        }
        Insert: {
          bet_amount: number
          created_at?: string
          difference?: number | null
          guess_amount: number
          id?: string
          prize_points?: number | null
          rank?: number | null
          session_id: string
          user_id: string
        }
        Update: {
          bet_amount?: number
          created_at?: string
          difference?: number | null
          guess_amount?: number
          id?: string
          prize_points?: number | null
          rank?: number | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bonus_hunt_gtw_bets_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "bonus_hunt_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      bonus_hunt_provider_overrides: {
        Row: {
          created_at: string
          id: string
          provider_override: string
          slot_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          provider_override: string
          slot_name: string
        }
        Update: {
          created_at?: string
          id?: string
          provider_override?: string
          slot_name?: string
        }
        Relationships: []
      }
      bonus_hunt_sessions: {
        Row: {
          average_x: number | null
          avgx_betting_open: boolean
          avgx_max_bet: number
          avgx_min_bet: number
          casino_slug: string | null
          coupon_betting_open: boolean
          coupon_markets: Json
          coupon_results: Json | null
          created_at: string
          created_by: string | null
          end_balance: number | null
          gtw_betting_open: boolean
          gtw_max_bet: number
          gtw_min_bet: number
          gtw_prizes: Json
          host: string
          hunt_number: number
          id: string
          status: string
          streamsystem_hunt_id: string
          updated_at: string
          winning_group: string | null
        }
        Insert: {
          average_x?: number | null
          avgx_betting_open?: boolean
          avgx_max_bet?: number
          avgx_min_bet?: number
          casino_slug?: string | null
          coupon_betting_open?: boolean
          coupon_markets?: Json
          coupon_results?: Json | null
          created_at?: string
          created_by?: string | null
          end_balance?: number | null
          gtw_betting_open?: boolean
          gtw_max_bet?: number
          gtw_min_bet?: number
          gtw_prizes?: Json
          host?: string
          hunt_number: number
          id?: string
          status?: string
          streamsystem_hunt_id: string
          updated_at?: string
          winning_group?: string | null
        }
        Update: {
          average_x?: number | null
          avgx_betting_open?: boolean
          avgx_max_bet?: number
          avgx_min_bet?: number
          casino_slug?: string | null
          coupon_betting_open?: boolean
          coupon_markets?: Json
          coupon_results?: Json | null
          created_at?: string
          created_by?: string | null
          end_balance?: number | null
          gtw_betting_open?: boolean
          gtw_max_bet?: number
          gtw_min_bet?: number
          gtw_prizes?: Json
          host?: string
          hunt_number?: number
          id?: string
          status?: string
          streamsystem_hunt_id?: string
          updated_at?: string
          winning_group?: string | null
        }
        Relationships: []
      }
      bonus_hunt_slot_coupons: {
        Row: {
          answers: Json
          created_at: string
          hunt_number: number
          id: string
          session_id: string | null
          user_id: string
        }
        Insert: {
          answers?: Json
          created_at?: string
          hunt_number: number
          id?: string
          session_id?: string | null
          user_id: string
        }
        Update: {
          answers?: Json
          created_at?: string
          hunt_number?: number
          id?: string
          session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bonus_hunt_slot_coupons_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "bonus_hunt_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      casino_compliance: {
        Row: {
          bonus_compliant: boolean
          bonus_max_amount: number
          bonus_source_url: string
          bonus_verified_at: string | null
          bonus_wager_requirement: number
          casino_name: string
          casino_slug: string
          compliance_score: number
          created_at: string
          id: string
          last_checked: string
          license_holder_name: string | null
          license_last_scraped_at: string | null
          license_number: string
          license_source_url: string
          license_status: Database["public"]["Enums"]["license_status"]
          license_verified_at: string | null
          notes: string | null
          scrape_status: string
          source_url: string
          updated_at: string
        }
        Insert: {
          bonus_compliant?: boolean
          bonus_max_amount?: number
          bonus_source_url?: string
          bonus_verified_at?: string | null
          bonus_wager_requirement?: number
          casino_name: string
          casino_slug: string
          compliance_score?: number
          created_at?: string
          id?: string
          last_checked?: string
          license_holder_name?: string | null
          license_last_scraped_at?: string | null
          license_number?: string
          license_source_url?: string
          license_status?: Database["public"]["Enums"]["license_status"]
          license_verified_at?: string | null
          notes?: string | null
          scrape_status?: string
          source_url?: string
          updated_at?: string
        }
        Update: {
          bonus_compliant?: boolean
          bonus_max_amount?: number
          bonus_source_url?: string
          bonus_verified_at?: string | null
          bonus_wager_requirement?: number
          casino_name?: string
          casino_slug?: string
          compliance_score?: number
          created_at?: string
          id?: string
          last_checked?: string
          license_holder_name?: string | null
          license_last_scraped_at?: string | null
          license_number?: string
          license_source_url?: string
          license_status?: Database["public"]["Enums"]["license_status"]
          license_verified_at?: string | null
          notes?: string | null
          scrape_status?: string
          source_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      casino_compliance_history: {
        Row: {
          casino_slug: string
          change_type: string
          changed_at: string
          created_at: string
          field_changed: string
          id: string
          new_value: string
          old_value: string
          source_url: string
        }
        Insert: {
          casino_slug: string
          change_type: string
          changed_at?: string
          created_at?: string
          field_changed: string
          id?: string
          new_value: string
          old_value: string
          source_url?: string
        }
        Update: {
          casino_slug?: string
          change_type?: string
          changed_at?: string
          created_at?: string
          field_changed?: string
          id?: string
          new_value?: string
          old_value?: string
          source_url?: string
        }
        Relationships: []
      }
      casino_news: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          is_cornerstone: boolean
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string
          category?: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_cornerstone?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_cornerstone?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      casino_review_aggregates: {
        Row: {
          avg_rating: number
          casino_slug: string
          review_count: number
          updated_at: string
        }
        Insert: {
          avg_rating?: number
          casino_slug: string
          review_count?: number
          updated_at?: string
        }
        Update: {
          avg_rating?: number
          casino_slug?: string
          review_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      casino_review_helpful_votes: {
        Row: {
          created_at: string
          id: string
          review_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          review_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "casino_review_helpful_votes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "casino_user_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      casino_user_reviews: {
        Row: {
          casino_slug: string
          created_at: string
          guest_email: string | null
          guest_name: string | null
          helpful_count: number
          id: string
          is_verified_player: boolean
          rating: number
          rejection_reason: string | null
          review_text: string
          status: Database["public"]["Enums"]["review_status"]
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          casino_slug: string
          created_at?: string
          guest_email?: string | null
          guest_name?: string | null
          helpful_count?: number
          id?: string
          is_verified_player?: boolean
          rating: number
          rejection_reason?: string | null
          review_text: string
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          casino_slug?: string
          created_at?: string
          guest_email?: string | null
          guest_name?: string | null
          helpful_count?: number
          id?: string
          is_verified_player?: boolean
          rating?: number
          rejection_reason?: string | null
          review_text?: string
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      casinos: {
        Row: {
          affiliate_url: string | null
          bonus_amount: string
          bonus_page_url: string | null
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
          website_url: string | null
        }
        Insert: {
          affiliate_url?: string | null
          bonus_amount: string
          bonus_page_url?: string | null
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
          website_url?: string | null
        }
        Update: {
          affiliate_url?: string | null
          bonus_amount?: string
          bonus_page_url?: string | null
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
          website_url?: string | null
        }
        Relationships: []
      }
      chat_bans: {
        Row: {
          banned_by: string
          created_at: string
          id: string
          reason: string | null
          user_id: string
        }
        Insert: {
          banned_by: string
          created_at?: string
          id?: string
          reason?: string | null
          user_id: string
        }
        Update: {
          banned_by?: string
          created_at?: string
          id?: string
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chat_timeouts: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          timed_out_by: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          timed_out_by: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          timed_out_by?: string
          user_id?: string
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
      compliance_scrape_logs: {
        Row: {
          casino_name: string
          casino_slug: string
          created_at: string
          duration_ms: number | null
          error_message: string | null
          id: string
          license_type_found: string | null
          matched_name: string | null
          raw_snippet: string | null
          response_code: number | null
          scrape_url: string
          severity: string
          similarity_score: number | null
          status: string
        }
        Insert: {
          casino_name: string
          casino_slug: string
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          license_type_found?: string | null
          matched_name?: string | null
          raw_snippet?: string | null
          response_code?: number | null
          scrape_url: string
          severity?: string
          similarity_score?: number | null
          status?: string
        }
        Update: {
          casino_name?: string
          casino_slug?: string
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          license_type_found?: string | null
          matched_name?: string | null
          raw_snippet?: string | null
          response_code?: number | null
          scrape_url?: string
          severity?: string
          similarity_score?: number | null
          status?: string
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
      daily_dwell_rewards: {
        Row: {
          completed_at: string
          credits_awarded: number
          id: string
          page_path: string
          reward_date: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          credits_awarded?: number
          id?: string
          page_path: string
          reward_date?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          credits_awarded?: number
          id?: string
          page_path?: string
          reward_date?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_free_spins_offers: {
        Row: {
          casino_id: string | null
          casino_name: string
          casino_slug: string
          created_at: string
          free_spins_count: number | null
          id: string
          is_active: boolean
          is_manually_added: boolean
          min_deposit: string | null
          offer_description: string | null
          offer_title: string
          offer_type: string
          scrape_source_url: string | null
          scraped_at: string
          updated_at: string
          valid_until: string | null
          wagering_requirement: string | null
        }
        Insert: {
          casino_id?: string | null
          casino_name: string
          casino_slug: string
          created_at?: string
          free_spins_count?: number | null
          id?: string
          is_active?: boolean
          is_manually_added?: boolean
          min_deposit?: string | null
          offer_description?: string | null
          offer_title: string
          offer_type?: string
          scrape_source_url?: string | null
          scraped_at?: string
          updated_at?: string
          valid_until?: string | null
          wagering_requirement?: string | null
        }
        Update: {
          casino_id?: string | null
          casino_name?: string
          casino_slug?: string
          created_at?: string
          free_spins_count?: number | null
          id?: string
          is_active?: boolean
          is_manually_added?: boolean
          min_deposit?: string | null
          offer_description?: string | null
          offer_title?: string
          offer_type?: string
          scrape_source_url?: string | null
          scraped_at?: string
          updated_at?: string
          valid_until?: string | null
          wagering_requirement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_free_spins_offers_casino_id_fkey"
            columns: ["casino_id"]
            isOneToOne: false
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_free_spins_offers_casino_id_fkey"
            columns: ["casino_id"]
            isOneToOne: false
            referencedRelation: "casinos_public"
            referencedColumns: ["id"]
          },
        ]
      }
      error_logs: {
        Row: {
          component_name: string | null
          created_at: string
          error_message: string
          error_stack: string | null
          id: string
          url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          component_name?: string | null
          created_at?: string
          error_message: string
          error_stack?: string | null
          id?: string
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          component_name?: string | null
          created_at?: string
          error_message?: string
          error_stack?: string | null
          id?: string
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      free_spin_campaigns: {
        Row: {
          affiliate_url: string | null
          campaign_period_end: string | null
          campaign_period_start: string | null
          campaign_type: string | null
          casino_id: string | null
          casino_logo_url: string | null
          casino_name: string
          casino_slug: string
          confidence_score: number | null
          created_at: string
          dedup_key: string | null
          deposit_amount: number | null
          description: string | null
          eligible_players: string | null
          expiry_date: string | null
          for_existing_players: boolean
          for_new_players: boolean
          full_terms_clean: string | null
          game_name: string | null
          id: string
          is_active: boolean
          last_checked: string
          last_verified_at: string | null
          min_deposit: string | null
          offer_type: string
          required_action: string | null
          requires_deposit: boolean
          score: number
          short_terms_summary: string | null
          source_type: string
          source_url: string | null
          spin_count: number
          spin_value: string | null
          summary: string | null
          title: string
          updated_at: string
          wagering_requirement: string | null
        }
        Insert: {
          affiliate_url?: string | null
          campaign_period_end?: string | null
          campaign_period_start?: string | null
          campaign_type?: string | null
          casino_id?: string | null
          casino_logo_url?: string | null
          casino_name: string
          casino_slug: string
          confidence_score?: number | null
          created_at?: string
          dedup_key?: string | null
          deposit_amount?: number | null
          description?: string | null
          eligible_players?: string | null
          expiry_date?: string | null
          for_existing_players?: boolean
          for_new_players?: boolean
          full_terms_clean?: string | null
          game_name?: string | null
          id?: string
          is_active?: boolean
          last_checked?: string
          last_verified_at?: string | null
          min_deposit?: string | null
          offer_type?: string
          required_action?: string | null
          requires_deposit?: boolean
          score?: number
          short_terms_summary?: string | null
          source_type?: string
          source_url?: string | null
          spin_count?: number
          spin_value?: string | null
          summary?: string | null
          title: string
          updated_at?: string
          wagering_requirement?: string | null
        }
        Update: {
          affiliate_url?: string | null
          campaign_period_end?: string | null
          campaign_period_start?: string | null
          campaign_type?: string | null
          casino_id?: string | null
          casino_logo_url?: string | null
          casino_name?: string
          casino_slug?: string
          confidence_score?: number | null
          created_at?: string
          dedup_key?: string | null
          deposit_amount?: number | null
          description?: string | null
          eligible_players?: string | null
          expiry_date?: string | null
          for_existing_players?: boolean
          for_new_players?: boolean
          full_terms_clean?: string | null
          game_name?: string | null
          id?: string
          is_active?: boolean
          last_checked?: string
          last_verified_at?: string | null
          min_deposit?: string | null
          offer_type?: string
          required_action?: string | null
          requires_deposit?: boolean
          score?: number
          short_terms_summary?: string | null
          source_type?: string
          source_url?: string | null
          spin_count?: number
          spin_value?: string | null
          summary?: string | null
          title?: string
          updated_at?: string
          wagering_requirement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "free_spin_campaigns_casino_id_fkey"
            columns: ["casino_id"]
            isOneToOne: false
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "free_spin_campaigns_casino_id_fkey"
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
      market_intelligence_events: {
        Row: {
          casino_slug: string | null
          category: string
          created_at: string
          effective_date: string | null
          event_type: string
          headline: string
          id: string
          impact_level: string
          is_featured: boolean
          is_public: boolean
          published_at: string
          source_label: string | null
          source_url: string | null
          summary: string
          updated_at: string
        }
        Insert: {
          casino_slug?: string | null
          category: string
          created_at?: string
          effective_date?: string | null
          event_type: string
          headline: string
          id?: string
          impact_level?: string
          is_featured?: boolean
          is_public?: boolean
          published_at?: string
          source_label?: string | null
          source_url?: string | null
          summary: string
          updated_at?: string
        }
        Update: {
          casino_slug?: string | null
          category?: string
          created_at?: string
          effective_date?: string | null
          event_type?: string
          headline?: string
          id?: string
          impact_level?: string
          is_featured?: boolean
          is_public?: boolean
          published_at?: string
          source_label?: string | null
          source_url?: string | null
          summary?: string
          updated_at?: string
        }
        Relationships: []
      }
      monthly_tournament_archives: {
        Row: {
          category: string
          created_at: string
          id: string
          month: string
          top_entries: Json
          winner_avatar_url: string | null
          winner_display_name: string
          winner_user_id: string
          winning_value: number
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          month: string
          top_entries?: Json
          winner_avatar_url?: string | null
          winner_display_name: string
          winner_user_id: string
          winning_value?: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          month?: string
          top_entries?: Json
          winner_avatar_url?: string | null
          winner_display_name?: string
          winner_user_id?: string
          winning_value?: number
        }
        Relationships: []
      }
      monthly_tournament_config: {
        Row: {
          category: string
          created_at: string
          game_id: string
          game_name: string
          id: string
          is_active: boolean
          prize_1: number
          prize_2: number
          prize_3: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          game_id: string
          game_name: string
          id?: string
          is_active?: boolean
          prize_1?: number
          prize_2?: number
          prize_3?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          game_id?: string
          game_name?: string
          id?: string
          is_active?: boolean
          prize_1?: number
          prize_2?: number
          prize_3?: number
          updated_at?: string
        }
        Relationships: []
      }
      news_generation_logs: {
        Row: {
          ai_model: string | null
          article_id: string | null
          citation_urls: string[] | null
          created_at: string
          domain_validation_result: Json | null
          duplicate_check_result: Json | null
          generation_timestamp: string
          guardrail_pass: boolean
          id: string
          model_used: string
          perplexity_citations_count: number | null
          perplexity_model: string | null
          recency_check_result: Json | null
          rejection_reason: string | null
          response_time_ms: number | null
          search_query: string | null
          sources_provided: number | null
          sources_validated: number | null
          tokens_used: number | null
          topic_index: number | null
          validation_warnings: string[] | null
        }
        Insert: {
          ai_model?: string | null
          article_id?: string | null
          citation_urls?: string[] | null
          created_at?: string
          domain_validation_result?: Json | null
          duplicate_check_result?: Json | null
          generation_timestamp?: string
          guardrail_pass?: boolean
          id?: string
          model_used?: string
          perplexity_citations_count?: number | null
          perplexity_model?: string | null
          recency_check_result?: Json | null
          rejection_reason?: string | null
          response_time_ms?: number | null
          search_query?: string | null
          sources_provided?: number | null
          sources_validated?: number | null
          tokens_used?: number | null
          topic_index?: number | null
          validation_warnings?: string[] | null
        }
        Update: {
          ai_model?: string | null
          article_id?: string | null
          citation_urls?: string[] | null
          created_at?: string
          domain_validation_result?: Json | null
          duplicate_check_result?: Json | null
          generation_timestamp?: string
          guardrail_pass?: boolean
          id?: string
          model_used?: string
          perplexity_citations_count?: number | null
          perplexity_model?: string | null
          recency_check_result?: Json | null
          rejection_reason?: string | null
          response_time_ms?: number | null
          search_query?: string | null
          sources_provided?: number | null
          sources_validated?: number | null
          tokens_used?: number | null
          topic_index?: number | null
          validation_warnings?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "news_generation_logs_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "casino_news"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          target_user_id: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          target_user_id?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          target_user_id?: string | null
          title?: string | null
        }
        Relationships: []
      }
      page_metadata: {
        Row: {
          changefreq: string
          created_at: string
          path: string
          priority: number
          show_updated_date: boolean
          updated_at: string
        }
        Insert: {
          changefreq?: string
          created_at?: string
          path: string
          priority?: number
          show_updated_date?: boolean
          updated_at?: string
        }
        Update: {
          changefreq?: string
          created_at?: string
          path?: string
          priority?: number
          show_updated_date?: boolean
          updated_at?: string
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
          age_verified: boolean
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
          last_spin_at: string | null
          play_styles: string[] | null
          playstyle_section_completed: boolean | null
          preferred_game_type: string | null
          profile_prompt_dismissed: boolean
          profile_section_completed: boolean | null
          spin_reel_extra_spins: number
          stats_public: boolean | null
          stats_section_completed: boolean | null
          twitch_access_token: string | null
          twitch_badges: Json | null
          twitch_badges_updated_at: string | null
          twitch_follow_date: string | null
          twitch_id: string | null
          twitch_refresh_token: string | null
          twitch_username: string | null
          typical_bet_size: string | null
          updated_at: string
          user_id: string
          volatility_preference: string | null
        }
        Insert: {
          age_verified?: boolean
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
          last_spin_at?: string | null
          play_styles?: string[] | null
          playstyle_section_completed?: boolean | null
          preferred_game_type?: string | null
          profile_prompt_dismissed?: boolean
          profile_section_completed?: boolean | null
          spin_reel_extra_spins?: number
          stats_public?: boolean | null
          stats_section_completed?: boolean | null
          twitch_access_token?: string | null
          twitch_badges?: Json | null
          twitch_badges_updated_at?: string | null
          twitch_follow_date?: string | null
          twitch_id?: string | null
          twitch_refresh_token?: string | null
          twitch_username?: string | null
          typical_bet_size?: string | null
          updated_at?: string
          user_id: string
          volatility_preference?: string | null
        }
        Update: {
          age_verified?: boolean
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
          last_spin_at?: string | null
          play_styles?: string[] | null
          playstyle_section_completed?: boolean | null
          preferred_game_type?: string | null
          profile_prompt_dismissed?: boolean
          profile_section_completed?: boolean | null
          spin_reel_extra_spins?: number
          stats_public?: boolean | null
          stats_section_completed?: boolean | null
          twitch_access_token?: string | null
          twitch_badges?: Json | null
          twitch_badges_updated_at?: string | null
          twitch_follow_date?: string | null
          twitch_id?: string | null
          twitch_refresh_token?: string | null
          twitch_username?: string | null
          typical_bet_size?: string | null
          updated_at?: string
          user_id?: string
          volatility_preference?: string | null
        }
        Relationships: []
      }
      redeem_code_uses: {
        Row: {
          code_id: string
          credits_awarded: number
          id: string
          redeemed_at: string
          user_id: string
        }
        Insert: {
          code_id: string
          credits_awarded: number
          id?: string
          redeemed_at?: string
          user_id: string
        }
        Update: {
          code_id?: string
          credits_awarded?: number
          id?: string
          redeemed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "redeem_code_uses_code_id_fkey"
            columns: ["code_id"]
            isOneToOne: false
            referencedRelation: "redeem_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      redeem_codes: {
        Row: {
          code: string
          created_at: string
          created_by: string
          credits_amount: number
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          times_used: number
          usage_type: string
        }
        Insert: {
          code: string
          created_at?: string
          created_by: string
          credits_amount: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          times_used?: number
          usage_type?: string
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string
          credits_amount?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          times_used?: number
          usage_type?: string
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
      slot_bomb_symbols: {
        Row: {
          created_at: string
          game_id: string
          id: string
          image_url: string | null
          label: string
          position: number
          value: number
        }
        Insert: {
          created_at?: string
          game_id?: string
          id: string
          image_url?: string | null
          label: string
          position?: number
          value: number
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          image_url?: string | null
          label?: string
          position?: number
          value?: number
        }
        Relationships: []
      }
      slot_bonus_state: {
        Row: {
          bet_amount: number
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
          bet_amount?: number
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
          bet_amount?: number
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
      slot_catalog: {
        Row: {
          bonus_count: number
          content_archetype: string | null
          content_enriched_at: string | null
          created_at: string
          deep_content: string | null
          description: string | null
          enriched_analysis: string | null
          game_description: string | null
          game_format: string | null
          game_id: string | null
          has_buy_feature: boolean | null
          highest_win: number | null
          highest_x: number | null
          id: string
          max_multiplier: number | null
          max_potential: string | null
          meta_description: string | null
          provider: string
          rtp: number | null
          slot_name: string
          slug: string | null
          updated_at: string
          volatility: string | null
        }
        Insert: {
          bonus_count?: number
          content_archetype?: string | null
          content_enriched_at?: string | null
          created_at?: string
          deep_content?: string | null
          description?: string | null
          enriched_analysis?: string | null
          game_description?: string | null
          game_format?: string | null
          game_id?: string | null
          has_buy_feature?: boolean | null
          highest_win?: number | null
          highest_x?: number | null
          id?: string
          max_multiplier?: number | null
          max_potential?: string | null
          meta_description?: string | null
          provider?: string
          rtp?: number | null
          slot_name: string
          slug?: string | null
          updated_at?: string
          volatility?: string | null
        }
        Update: {
          bonus_count?: number
          content_archetype?: string | null
          content_enriched_at?: string | null
          created_at?: string
          deep_content?: string | null
          description?: string | null
          enriched_analysis?: string | null
          game_description?: string | null
          game_format?: string | null
          game_id?: string | null
          has_buy_feature?: boolean | null
          highest_win?: number | null
          highest_x?: number | null
          id?: string
          max_multiplier?: number | null
          max_potential?: string | null
          meta_description?: string | null
          provider?: string
          rtp?: number | null
          slot_name?: string
          slug?: string | null
          updated_at?: string
          volatility?: string | null
        }
        Relationships: []
      }
      slot_chat_messages: {
        Row: {
          created_at: string
          game_id: string
          id: string
          message: string
          message_type: string
          reactions: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          game_id?: string
          id?: string
          message: string
          message_type?: string
          reactions?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          message?: string
          message_type?: string
          reactions?: Json | null
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
      slot_multiplier_symbols: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          label: string
          position: number
          value: number
        }
        Insert: {
          created_at?: string
          id: string
          image_url?: string | null
          label: string
          position?: number
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          label?: string
          position?: number
          value?: number
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
      slot_requests: {
        Row: {
          admin_note: string | null
          created_at: string
          credits_awarded: number
          hunt_number: number | null
          id: string
          is_custom: boolean
          provider: string
          slot_name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_note?: string | null
          created_at?: string
          credits_awarded?: number
          hunt_number?: number | null
          id?: string
          is_custom?: boolean
          provider: string
          slot_name: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_note?: string | null
          created_at?: string
          credits_awarded?: number
          hunt_number?: number | null
          id?: string
          is_custom?: boolean
          provider?: string
          slot_name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      slot_spins: {
        Row: {
          created_at: string
          date: string
          game_id: string
          id: string
          spins_remaining: number
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          game_id?: string
          id?: string
          spins_remaining?: number
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          game_id?: string
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
      spin_history: {
        Row: {
          created_at: string
          id: string
          reward_type: string
          reward_value: number
          twitch_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reward_type: string
          reward_value?: number
          twitch_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reward_type?: string
          reward_value?: number
          twitch_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stale_content_alerts: {
        Row: {
          alert_type: string
          casino_name: string
          casino_slug: string
          created_at: string
          days_stale: number
          id: string
          resolved_at: string | null
        }
        Insert: {
          alert_type?: string
          casino_name: string
          casino_slug: string
          created_at?: string
          days_stale?: number
          id?: string
          resolved_at?: string | null
        }
        Update: {
          alert_type?: string
          casino_name?: string
          casino_slug?: string
          created_at?: string
          days_stale?: number
          id?: string
          resolved_at?: string | null
        }
        Relationships: []
      }
      tournament_credit_tracking: {
        Row: {
          created_at: string
          credits_awarded: number
          credits_clawed_back: number
          id: string
          tournament_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_awarded?: number
          credits_clawed_back?: number
          id?: string
          tournament_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits_awarded?: number
          credits_clawed_back?: number
          id?: string
          tournament_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_credit_tracking_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_entries: {
        Row: {
          biggest_multiplier: number
          biggest_win: number
          game_id: string
          id: string
          total_credits_used: number
          total_points: number
          total_spins: number
          tournament_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          biggest_multiplier?: number
          biggest_win?: number
          game_id: string
          id?: string
          total_credits_used?: number
          total_points?: number
          total_spins?: number
          tournament_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          biggest_multiplier?: number
          biggest_win?: number
          game_id?: string
          id?: string
          total_credits_used?: number
          total_points?: number
          total_spins?: number
          tournament_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_entries_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_participants: {
        Row: {
          id: string
          joined_at: string
          tournament_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          tournament_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          tournament_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_participants_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          ends_at: string
          exclude_from_global_leaderboard: boolean
          game_ids: string[]
          id: string
          is_monthly: boolean
          max_bet: number | null
          max_credits: number | null
          prize_text: string | null
          separate_leaderboards: boolean
          starts_at: string
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          ends_at: string
          exclude_from_global_leaderboard?: boolean
          game_ids?: string[]
          id?: string
          is_monthly?: boolean
          max_bet?: number | null
          max_credits?: number | null
          prize_text?: string | null
          separate_leaderboards?: boolean
          starts_at: string
          status?: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          ends_at?: string
          exclude_from_global_leaderboard?: boolean
          game_ids?: string[]
          id?: string
          is_monthly?: boolean
          max_bet?: number | null
          max_credits?: number | null
          prize_text?: string | null
          separate_leaderboards?: boolean
          starts_at?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      user_bans: {
        Row: {
          banned_by: string
          created_at: string
          id: string
          reason: string | null
          user_id: string
        }
        Insert: {
          banned_by: string
          created_at?: string
          id?: string
          reason?: string | null
          user_id: string
        }
        Update: {
          banned_by?: string
          created_at?: string
          id?: string
          reason?: string | null
          user_id?: string
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
          has_affiliate: boolean | null
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
          has_affiliate?: never
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
          has_affiliate?: never
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
          twitch_badges: Json | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          display_name?: string | null
          twitch_badges?: Json | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          display_name?: string | null
          twitch_badges?: Json | null
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
          monthly_biggest_multiplier: number | null
          monthly_biggest_win: number | null
          monthly_winnings: number | null
          total_bonuses: number | null
          total_spins: number | null
          total_winnings: number | null
          user_id: string | null
          weekly_winnings: number | null
        }
        Relationships: []
      }
      slot_leaderboard_by_game: {
        Row: {
          game_id: string | null
          monthly_biggest_multiplier: number | null
          monthly_biggest_win: number | null
          monthly_bonuses: number | null
          monthly_spins: number | null
          monthly_winnings: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      activate_community_spins_safe: {
        Args: { p_amount: number; p_today: string; p_user_id: string }
        Returns: Json
      }
      claim_dwell_reward: {
        Args: { p_page_path: string; p_today: string; p_user_id: string }
        Returns: Json
      }
      claim_profile_section_reward: {
        Args: { p_section: string; p_today: string; p_user_id: string }
        Returns: Json
      }
      classify_slot_archetypes: { Args: never; Returns: undefined }
      deduct_spin:
        | {
            Args: {
              p_bet: number
              p_date: string
              p_max_spins: number
              p_user_id: string
            }
            Returns: number
          }
        | {
            Args: {
              p_bet: number
              p_date: string
              p_game_id?: string
              p_max_spins: number
              p_user_id: string
            }
            Returns: number
          }
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
      get_community_stats: { Args: never; Returns: Json }
      get_slot_by_slug: {
        Args: { p_slug: string }
        Returns: {
          bonus_count: number
          content_archetype: string | null
          content_enriched_at: string | null
          created_at: string
          deep_content: string | null
          description: string | null
          enriched_analysis: string | null
          game_description: string | null
          game_format: string | null
          game_id: string | null
          has_buy_feature: boolean | null
          highest_win: number | null
          highest_x: number | null
          id: string
          max_multiplier: number | null
          max_potential: string | null
          meta_description: string | null
          provider: string
          rtp: number | null
          slot_name: string
          slug: string | null
          updated_at: string
          volatility: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "slot_catalog"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_user_id_by_email: { Args: { lookup_email: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_redeem_code_uses: {
        Args: { code_id_input: string }
        Returns: undefined
      }
      increment_slot_bonus_counts: {
        Args: { p_slot_names: string[] }
        Returns: undefined
      }
      refresh_slot_leaderboard: { Args: never; Returns: undefined }
      upsert_slot_catalog: {
        Args: {
          p_multiplier: number
          p_provider: string
          p_rtp: number
          p_slot_name: string
          p_win: number
        }
        Returns: undefined
      }
      upsert_tournament_entry: {
        Args: {
          p_bet: number
          p_game_id: string
          p_is_bonus: boolean
          p_points: number
          p_tournament_id: string
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user" | "casino_owner" | "moderator"
      clip_status: "pending" | "approved" | "rejected"
      license_status: "valid" | "suspended" | "revoked"
      review_status: "pending" | "approved" | "rejected"
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
      app_role: ["admin", "user", "casino_owner", "moderator"],
      clip_status: ["pending", "approved", "rejected"],
      license_status: ["valid", "suspended", "revoked"],
      review_status: ["pending", "approved", "rejected"],
    },
  },
} as const
