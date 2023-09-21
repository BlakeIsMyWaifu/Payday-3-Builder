import { type Session, type SupabaseClient } from '@supabase/auth-helpers-remix'

import { type Database } from './databaseTypes'

declare global {
	interface Window {
		env: {
			SUPABASE_URL: string | undefined
			SUPABASE_ANON_KEY: string | undefined
			SERVER_URL: string | undefined
		}
	}
}

export type SupabaseClientDatabase = SupabaseClient<Database>

export type SupabaseContext = {
	supabase: SupabaseClientDatabase
	session: Session | null
} | null
