import { createServerClient } from '@supabase/auth-helpers-remix'

import { type Database } from './databaseTypes'

export async function getServerClient(request: Request, options?: { supabaseUrl?: string; supabaseAnonKey?: string }) {
	if (!process.env.SUPABASE_URL) {
		throw new Error('SUPABASE_URL env is missing')
	}

	if (!process.env.SUPABASE_ANON_KEY) {
		throw new Error('SUPABASE_ANON_KEY env is missing')
	}

	const env = {
		SUPABASE_URL: process.env.SUPABASE_URL!,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!
	} as const

	const response = new Response()

	const supabase = createServerClient<Database>(
		options?.supabaseUrl ?? process.env.SUPABASE_URL,
		options?.supabaseAnonKey ?? process.env.SUPABASE_ANON_KEY,
		{
			request,
			response
		}
	)

	return { supabase, env, headers: response.headers }
}
