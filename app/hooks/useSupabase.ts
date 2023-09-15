import { type LoaderFunctionArgs } from '@remix-run/node'
import { useRevalidator } from '@remix-run/react'
import { createBrowserClient, createServerClient, type Session } from '@supabase/auth-helpers-remix'
import { useEffect, useState } from 'react'

import { type Database } from '~/types/database.types'

interface env {
	SUPABASE_URL: string
	SUPABASE_ANON_KEY: string
}

/**
 * Use ONLY in the root loader
 */
export const supabaseLoader = async (request: LoaderFunctionArgs['request']) => {
	const env: env = {
		SUPABASE_URL: process.env.SUPABASE_URL!,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!
	}

	const response = new Response()

	const supabase = createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
		request,
		response
	})

	const {
		data: { session }
	} = await supabase.auth.getSession()

	return { env, session, response }
}

interface UseSupabaseInput {
	env: env
	session: Session | null
}

/**
 * Use ONLY in root
 */
export default function useSupabase({ env, session }: UseSupabaseInput) {
	const { revalidate } = useRevalidator()

	const [supabase] = useState(() => createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))

	const serverAccessToken = session?.access_token

	useEffect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event !== 'INITIAL_SESSION' && session?.access_token !== serverAccessToken) {
				revalidate()
			}
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [serverAccessToken, supabase, revalidate])

	return {
		supabase
	}
}
