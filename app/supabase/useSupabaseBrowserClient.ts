import { useRevalidator } from '@remix-run/react'
import { createBrowserClient, type Session } from '@supabase/auth-helpers-remix'
import { useEffect, useState } from 'react'

import { type Database, type SupabaseContext } from '~/supabase'

interface env {
	readonly SUPABASE_URL: string
	readonly SUPABASE_ANON_KEY: string
}

export function useSupabaseBrowserClient({ env, session }: { env: env; session: Session | null }) {
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
		supabase,
		session
	} satisfies SupabaseContext
}
