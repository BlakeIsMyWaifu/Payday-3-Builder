import { useOutletContext } from '@remix-run/react'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

export default function Login() {
	const { supabase } = useOutletContext<{ supabase: SupabaseClient<Database> }>()

	const handleDiscordLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: 'http://localhost:3000/auth/callback'
			}
		})
	}

	const handleLogout = async () => {
		await supabase.auth.signOut()
	}

	return (
		<>
			<button onClick={handleDiscordLogin}>Discord Login</button>
			<button onClick={handleLogout}>Logout</button>
		</>
	)
}
