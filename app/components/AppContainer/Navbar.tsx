import { Button, Tooltip } from '@mantine/core'
import { useNavigate } from '@remix-run/react'
import { type Session } from '@supabase/supabase-js'

import { type SupabaseClientDatabase } from '~/supabase'

interface NavbarProps {
	supabase: SupabaseClientDatabase
	session: Session | null
}

export default function Navbar({ supabase, session }: NavbarProps) {
	const navigate = useNavigate()

	const newBuild = async () => {
		if (!session) return
		const response = await supabase.from('build').insert({ author: session.user.id }).select()
		const id = response.data?.at(0)?.id
		if (!response.error) navigate(`/build/${id}/edit`)
	}

	return session ? (
		<Button onClick={newBuild}>New Build</Button>
	) : (
		<Tooltip label='You must be signed in to create a new build'>
			<Button onClick={event => event.preventDefault()} disabled>
				New Build
			</Button>
		</Tooltip>
	)
}
