import { Button, Tooltip } from '@mantine/core'
import { useNavigate } from '@remix-run/react'

import { type SupabaseClientDatabase } from '~/supabase'

interface NavbarProps {
	supabase: SupabaseClientDatabase
	isAuth: boolean
}

export default function Navbar({ supabase, isAuth }: NavbarProps) {
	const navigate = useNavigate()

	const newBuild = async () => {
		const response = await supabase.from('build').insert({}).select()
		const id = response.data?.at(0)?.id
		if (!response.error) navigate(`/build/${id}/edit`)
	}

	return isAuth ? (
		<Button onClick={newBuild}>New Build</Button>
	) : (
		<Tooltip label='You must be signed in to create a new build'>
			<Button onClick={event => event.preventDefault()} disabled>
				New Build
			</Button>
		</Tooltip>
	)
}
