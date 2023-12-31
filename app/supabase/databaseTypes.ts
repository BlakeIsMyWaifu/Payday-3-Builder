export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      build: {
        Row: {
          author: string
          created_at: string
          id: number
          skills: string | null
        }
        Insert: {
          author: string
          created_at?: string
          id?: number
          skills?: string | null
        }
        Update: {
          author?: string
          created_at?: string
          id?: number
          skills?: string | null
        }
        Relationships: []
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
