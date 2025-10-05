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
      accidents: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          latitude: number | null
          location: string
          longitude: number | null
          photo_url: string | null
          severity: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          location: string
          longitude?: number | null
          photo_url?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          photo_url?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      ambulances: {
        Row: {
          created_at: string | null
          driver_name: string
          driver_phone: string
          equipment: string[] | null
          id: string
          latitude: number | null
          longitude: number | null
          status: string | null
          updated_at: string | null
          vehicle_number: string
        }
        Insert: {
          created_at?: string | null
          driver_name: string
          driver_phone: string
          equipment?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          status?: string | null
          updated_at?: string | null
          vehicle_number: string
        }
        Update: {
          created_at?: string | null
          driver_name?: string
          driver_phone?: string
          equipment?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          status?: string | null
          updated_at?: string | null
          vehicle_number?: string
        }
        Relationships: []
      }
      hospitals: {
        Row: {
          address: string
          ambulances_available: number | null
          created_at: string | null
          emergency_beds: number | null
          icu_beds: number | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          phone: string
          specialties: string[] | null
          updated_at: string | null
        }
        Insert: {
          address: string
          ambulances_available?: number | null
          created_at?: string | null
          emergency_beds?: number | null
          icu_beds?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          phone: string
          specialties?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          ambulances_available?: number | null
          created_at?: string | null
          emergency_beds?: number | null
          icu_beds?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string
          specialties?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          accident_id: string | null
          created_at: string | null
          id: string
          message: string
          recipient_contact: string | null
          recipient_name: string | null
          recipient_type: string
          sent_at: string | null
        }
        Insert: {
          accident_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          recipient_contact?: string | null
          recipient_name?: string | null
          recipient_type: string
          sent_at?: string | null
        }
        Update: {
          accident_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          recipient_contact?: string | null
          recipient_name?: string | null
          recipient_type?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_accident_id_fkey"
            columns: ["accident_id"]
            isOneToOne: false
            referencedRelation: "accidents"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          allergies: string[] | null
          blood_group: string | null
          created_at: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relation: string | null
          id: string
          medical_conditions: string[] | null
          name: string
          phone: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          allergies?: string[] | null
          blood_group?: string | null
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          id?: string
          medical_conditions?: string[] | null
          name: string
          phone: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          allergies?: string[] | null
          blood_group?: string | null
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          id?: string
          medical_conditions?: string[] | null
          name?: string
          phone?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      rescue_timeline: {
        Row: {
          accident_id: string | null
          created_at: string | null
          description: string | null
          id: string
          stage: string
          status: string | null
          timestamp: string | null
        }
        Insert: {
          accident_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          stage: string
          status?: string | null
          timestamp?: string | null
        }
        Update: {
          accident_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          stage?: string
          status?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rescue_timeline_accident_id_fkey"
            columns: ["accident_id"]
            isOneToOne: false
            referencedRelation: "accidents"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
