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
      blog_comments: {
        Row: {
          author_email: string
          author_name: string
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          post_id: string
        }
        Insert: {
          author_email: string
          author_name: string
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          post_id: string
        }
        Update: {
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string
          featured_image: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          read_time: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          excerpt: string
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string | null
          ended_at: string | null
          id: string
          session_id: string
          status: string | null
          visitor_email: string | null
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          session_id: string
          status?: string | null
          visitor_email?: string | null
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          session_id?: string
          status?: string | null
          visitor_email?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      client_testimonials: {
        Row: {
          approved_at: string | null
          client_company: string | null
          client_email: string
          client_name: string
          client_title: string | null
          created_at: string
          id: string
          project_name: string | null
          rating: number | null
          status: string | null
          testimonial_text: string
          would_recommend: boolean | null
        }
        Insert: {
          approved_at?: string | null
          client_company?: string | null
          client_email: string
          client_name: string
          client_title?: string | null
          created_at?: string
          id?: string
          project_name?: string | null
          rating?: number | null
          status?: string | null
          testimonial_text: string
          would_recommend?: boolean | null
        }
        Update: {
          approved_at?: string | null
          client_company?: string | null
          client_email?: string
          client_name?: string
          client_title?: string | null
          created_at?: string
          id?: string
          project_name?: string | null
          rating?: number | null
          status?: string | null
          testimonial_text?: string
          would_recommend?: boolean | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string
          name: string
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url: string
          name: string
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string
          name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          ai_category: string | null
          ai_insights: Json | null
          ai_priority: string | null
          ai_sentiment: string | null
          budget_range: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          project_type: string | null
          status: string | null
        }
        Insert: {
          ai_category?: string | null
          ai_insights?: Json | null
          ai_priority?: string | null
          ai_sentiment?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          project_type?: string | null
          status?: string | null
        }
        Update: {
          ai_category?: string | null
          ai_insights?: Json | null
          ai_priority?: string | null
          ai_sentiment?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          project_type?: string | null
          status?: string | null
        }
        Relationships: []
      }
      edge_function_rate_limits: {
        Row: {
          created_at: string | null
          function_name: string
          id: string
          ip_address: string
          request_count: number | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          function_name: string
          id?: string
          ip_address: string
          request_count?: number | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          function_name?: string
          id?: string
          ip_address?: string
          request_count?: number | null
          window_start?: string | null
        }
        Relationships: []
      }
      github_activity: {
        Row: {
          action: string | null
          created_at: string | null
          created_at_github: string
          event_id: string
          event_type: string
          id: string
          payload: Json | null
          repo_name: string | null
          repo_url: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_at_github: string
          event_id: string
          event_type: string
          id?: string
          payload?: Json | null
          repo_name?: string | null
          repo_url?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_at_github?: string
          event_id?: string
          event_type?: string
          id?: string
          payload?: Json | null
          repo_name?: string | null
          repo_url?: string | null
        }
        Relationships: []
      }
      github_repositories: {
        Row: {
          created_at: string | null
          created_at_github: string | null
          description: string | null
          forks_count: number | null
          full_name: string
          homepage: string | null
          html_url: string
          id: string
          is_fork: boolean | null
          is_private: boolean | null
          language: string | null
          name: string
          open_issues_count: number | null
          pushed_at: string | null
          repo_id: number
          size: number | null
          stargazers_count: number | null
          topics: string[] | null
          updated_at: string | null
          updated_at_github: string | null
          watchers_count: number | null
        }
        Insert: {
          created_at?: string | null
          created_at_github?: string | null
          description?: string | null
          forks_count?: number | null
          full_name: string
          homepage?: string | null
          html_url: string
          id?: string
          is_fork?: boolean | null
          is_private?: boolean | null
          language?: string | null
          name: string
          open_issues_count?: number | null
          pushed_at?: string | null
          repo_id: number
          size?: number | null
          stargazers_count?: number | null
          topics?: string[] | null
          updated_at?: string | null
          updated_at_github?: string | null
          watchers_count?: number | null
        }
        Update: {
          created_at?: string | null
          created_at_github?: string | null
          description?: string | null
          forks_count?: number | null
          full_name?: string
          homepage?: string | null
          html_url?: string
          id?: string
          is_fork?: boolean | null
          is_private?: boolean | null
          language?: string | null
          name?: string
          open_issues_count?: number | null
          pushed_at?: string | null
          repo_id?: number
          size?: number | null
          stargazers_count?: number | null
          topics?: string[] | null
          updated_at?: string | null
          updated_at_github?: string | null
          watchers_count?: number | null
        }
        Relationships: []
      }
      github_stats: {
        Row: {
          avatar_url: string | null
          bio: string | null
          blog: string | null
          company: string | null
          created_at: string | null
          followers: number | null
          following: number | null
          id: string
          location: string | null
          public_gists: number | null
          total_commits: number | null
          total_forks: number | null
          total_repos: number | null
          total_stars: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          blog?: string | null
          company?: string | null
          created_at?: string | null
          followers?: number | null
          following?: number | null
          id?: string
          location?: string | null
          public_gists?: number | null
          total_commits?: number | null
          total_forks?: number | null
          total_repos?: number | null
          total_stars?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          blog?: string | null
          company?: string | null
          created_at?: string | null
          followers?: number | null
          following?: number | null
          id?: string
          location?: string | null
          public_gists?: number | null
          total_commits?: number | null
          total_forks?: number | null
          total_repos?: number | null
          total_stars?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          name: string | null
          status: string | null
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          name?: string | null
          status?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          status?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string | null
          id: string
          ip_address: string | null
          page_path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          page_path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          page_path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      payment_receipts: {
        Row: {
          authorized_signature: string | null
          created_at: string
          customer_address: string | null
          customer_email: string
          customer_name: string
          discount_amount: number | null
          id: string
          invoice_reference: string | null
          line_items: Json | null
          notes: string | null
          payment_amount: number
          payment_date: string
          payment_method: string | null
          payment_terms: string | null
          project_description: string
          receipt_number: string
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          tax_id: string | null
          verification_hash: string | null
        }
        Insert: {
          authorized_signature?: string | null
          created_at?: string
          customer_address?: string | null
          customer_email: string
          customer_name: string
          discount_amount?: number | null
          id?: string
          invoice_reference?: string | null
          line_items?: Json | null
          notes?: string | null
          payment_amount: number
          payment_date?: string
          payment_method?: string | null
          payment_terms?: string | null
          project_description: string
          receipt_number: string
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_id?: string | null
          verification_hash?: string | null
        }
        Update: {
          authorized_signature?: string | null
          created_at?: string
          customer_address?: string | null
          customer_email?: string
          customer_name?: string
          discount_amount?: number | null
          id?: string
          invoice_reference?: string | null
          line_items?: Json | null
          notes?: string | null
          payment_amount?: number
          payment_date?: string
          payment_method?: string | null
          payment_terms?: string | null
          project_description?: string
          receipt_number?: string
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_id?: string | null
          verification_hash?: string | null
        }
        Relationships: []
      }
      project_images: {
        Row: {
          caption: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string
          project_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          project_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          case_study_content: string | null
          category: string
          client_name: string | null
          created_at: string | null
          description: string
          display_order: number | null
          featured_image: string | null
          github_url: string | null
          id: string
          is_featured: boolean | null
          live_url: string | null
          metrics: Json | null
          project_duration: string | null
          slug: string
          status: string | null
          tags: string[] | null
          tech_stack: string[] | null
          title: string
          updated_at: string | null
          year: number | null
        }
        Insert: {
          case_study_content?: string | null
          category: string
          client_name?: string | null
          created_at?: string | null
          description: string
          display_order?: number | null
          featured_image?: string | null
          github_url?: string | null
          id?: string
          is_featured?: boolean | null
          live_url?: string | null
          metrics?: Json | null
          project_duration?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          tech_stack?: string[] | null
          title: string
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          case_study_content?: string | null
          category?: string
          client_name?: string | null
          created_at?: string | null
          description?: string
          display_order?: number | null
          featured_image?: string | null
          github_url?: string | null
          id?: string
          is_featured?: boolean | null
          live_url?: string | null
          metrics?: Json | null
          project_duration?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          tech_stack?: string[] | null
          title?: string
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      resume_downloads: {
        Row: {
          created_at: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_testimonials: {
        Row: {
          client_company: string | null
          client_name: string
          client_title: string | null
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          quote: string | null
          rating: number | null
          thumbnail_url: string | null
          video_url: string
        }
        Insert: {
          client_company?: string | null
          client_name: string
          client_title?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          quote?: string | null
          rating?: number | null
          thumbnail_url?: string | null
          video_url: string
        }
        Update: {
          client_company?: string | null
          client_name?: string
          client_title?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          quote?: string | null
          rating?: number | null
          thumbnail_url?: string | null
          video_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_rate_limits: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
