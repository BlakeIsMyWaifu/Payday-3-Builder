import { useOutletContext } from '@remix-run/react'

import { type SupabaseContext } from '~/supabase'

export default function useSupabaseOutlet() {
	return useOutletContext<SupabaseContext>() || {}
}
