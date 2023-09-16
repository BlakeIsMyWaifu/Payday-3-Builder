import { type SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

interface UseAuthUserDataProps {
	supabase: SupabaseClient
}

interface SupabaseUserMetadata {
	avatar_url: string
	custom_claims: {
		global_name: string
	}
	email: string
	email_verified: boolean
	full_name: string
	iss: string
	name: string
	picture: string
	provider_id: string
	sub: string
}

type MaybeSupabaseUserMetadata = SupabaseUserMetadata | null

interface AuthUserData {
	loading: boolean
	userMetadata: null | {
		avatarUrl: string
		username: string
	}
}

export default function useAuthUserData({ supabase }: UseAuthUserDataProps) {
	const [loading, setLoading] = useState(true)
	const [userMetadata, setUserMetadata] = useState<MaybeSupabaseUserMetadata>(null)

	useEffect(() => {
		supabase.auth
			.getUser()
			.then(user => {
				setUserMetadata((user.data.user?.user_metadata || null) as MaybeSupabaseUserMetadata)
				setLoading(false)
			})
			.catch(console.error)
	}, [supabase.auth])

	if (!userMetadata)
		return {
			loading,
			userMetadata: null
		} satisfies AuthUserData

	return {
		loading,
		userMetadata: {
			avatarUrl: userMetadata.avatar_url,
			username: userMetadata.custom_claims.global_name
		}
	} satisfies AuthUserData
}
