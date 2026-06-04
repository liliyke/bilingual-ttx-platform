// Starter hand-written types for the TTX Platform schema.
//
// Regenerate the precise types from your live Supabase project once the
// migration in supabase/migrations/ is applied:
//
//   pnpm db:types   # supabase gen types typescript --linked > lib/types/database.types.ts
//
// This file exists so the skeleton typechecks before the project is linked.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Locale = 'fr-CA' | 'en-CA';
export type ReviewStatus = 'draft' | 'pending_review' | 'approved' | 'rejected';
export type ExerciseStatus =
  | 'draft'
  | 'ready'
  | 'in_progress'
  | 'paused'
  | 'completed';
export type AppRole =
  | 'facilitator'
  | 'participant'
  | 'evaluator'
  | 'compliance_reviewer'
  | 'observer'
  | 'admin';

/**
 * Per-framework arrays of control / article / requirement IDs.
 * Mirrors the `regulatory_mappings` jsonb column on `scenarios`.
 */
export interface RegulatoryMappings {
  osfi_b13: string[];
  law25: string[];
  nist_csf_v2: string[];
  pci_dss_v4: string[];
  pipeda: string[];
  bill96: string[];
  soc2_tsc: string[];
}

interface Timestamps {
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Timestamps & {
          id: string;
          full_name: string | null;
          default_role: AppRole | null;
          org_name: string | null;
          locale: Locale;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & {
          id: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      scenarios: {
        Row: Timestamps & {
          id: string;
          threat_type: string | null;
          difficulty: string | null;
          duration_minutes: number | null;
          industry_tags: string[];
          regulatory_mappings: RegulatoryMappings;
          title_fr: string | null;
          title_en: string | null;
          description_fr: string | null;
          description_en: string | null;
          pci_scope: boolean;
          card_brands: string[] | null;
          created_by: string | null;
          reviewed_by_fr: string | null;
          reviewed_by_en: string | null;
          reviewed_by_compliance: string | null;
          reviewed_at_fr: string | null;
          reviewed_at_en: string | null;
          reviewed_at_compliance: string | null;
          review_status: ReviewStatus;
        };
        Insert: Partial<Database['public']['Tables']['scenarios']['Row']>;
        Update: Partial<Database['public']['Tables']['scenarios']['Row']>;
      };
      injects: {
        Row: Timestamps & {
          id: string;
          scenario_id: string;
          sequence_order: number;
          planned_offset_minutes: number | null;
          channel: string | null;
          visible_to_roles: string[];
          attack_technique_ids: string[];
          expected_decisions: Json;
          decision_framework_mappings: Json;
        };
        Insert: Partial<Database['public']['Tables']['injects']['Row']> & {
          scenario_id: string;
        };
        Update: Partial<Database['public']['Tables']['injects']['Row']>;
      };
      inject_variants: {
        Row: Timestamps & {
          id: string;
          inject_id: string;
          locale: Locale;
          title: string | null;
          content: string | null;
        };
        Insert: Partial<
          Database['public']['Tables']['inject_variants']['Row']
        > & { inject_id: string; locale: Locale };
        Update: Partial<Database['public']['Tables']['inject_variants']['Row']>;
      };
      exercises: {
        Row: Timestamps & {
          id: string;
          name: string;
          scenario_id: string | null;
          status: ExerciseStatus;
          scheduled_start: string | null;
          actual_start: string | null;
          actual_end: string | null;
          facilitator_id: string | null;
          primary_locale: Locale;
        };
        Insert: Partial<Database['public']['Tables']['exercises']['Row']> & {
          name: string;
        };
        Update: Partial<Database['public']['Tables']['exercises']['Row']>;
      };
      exercise_participants: {
        Row: Timestamps & {
          id: string;
          exercise_id: string;
          user_id: string;
          role: AppRole;
          assigned_at: string | null;
          assigned_locale: Locale;
        };
        Insert: Partial<
          Database['public']['Tables']['exercise_participants']['Row']
        > & { exercise_id: string; user_id: string; role: AppRole };
        Update: Partial<
          Database['public']['Tables']['exercise_participants']['Row']
        >;
      };
      released_injects: {
        Row: Timestamps & {
          id: string;
          exercise_id: string;
          inject_id: string;
          released_at: string | null;
          released_by: string | null;
          is_curveball: boolean;
          curveball_content_fr: string | null;
          curveball_content_en: string | null;
          curveball_monolingual_locale: Locale | null;
          curveball_framework_mappings: Json | null;
          unreviewed_curveball: boolean;
          unreviewed_curveball_framework_implications: boolean;
        };
        Insert: Partial<
          Database['public']['Tables']['released_injects']['Row']
        > & { exercise_id: string; inject_id: string };
        Update: Partial<Database['public']['Tables']['released_injects']['Row']>;
      };
      decisions: {
        Row: Timestamps & {
          id: string;
          exercise_id: string;
          released_inject_id: string | null;
          participant_id: string | null;
          decision_text: string | null;
          rationale: string | null;
          decided_at: string | null;
          authored_locale: Locale;
        };
        Insert: Partial<Database['public']['Tables']['decisions']['Row']> & {
          exercise_id: string;
        };
        Update: Partial<Database['public']['Tables']['decisions']['Row']>;
      };
      observations: {
        Row: Timestamps & {
          id: string;
          exercise_id: string;
          observer_id: string | null;
          observed_at: string | null;
          severity: string | null;
          category: string | null;
          finding_text: string | null;
          recommendation: string | null;
          linked_control_ids: Json;
          linked_decision_id: string | null;
          authored_locale: Locale;
        };
        Insert: Partial<Database['public']['Tables']['observations']['Row']> & {
          exercise_id: string;
        };
        Update: Partial<Database['public']['Tables']['observations']['Row']>;
      };
      decision_scores: {
        Row: Timestamps & {
          id: string;
          decision_id: string;
          evaluator_id: string | null;
          score: number | null;
          notes: string | null;
          control_mappings: Json;
          authored_locale: Locale;
        };
        Insert: Partial<
          Database['public']['Tables']['decision_scores']['Row']
        > & { decision_id: string };
        Update: Partial<Database['public']['Tables']['decision_scores']['Row']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: AppRole;
      review_status: ReviewStatus;
      exercise_status: ExerciseStatus;
      locale: Locale;
    };
  };
}
