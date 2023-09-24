import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import SkillTree from '~/components/SkillTree/SkillTree'
import { requireSession } from '~/supabase'

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { session, headers } = await requireSession(request, { onFailRedirectTo: `/build/${params.id}` })

	return json({ user: session.user }, { headers })
}

export default function Build() {
	const { user } = useLoaderData<typeof loader>()

	return <SkillTree />
}
