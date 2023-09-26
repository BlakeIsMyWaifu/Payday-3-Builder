import { json, type LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import SkillTree from '~/components/SkillTree'
import { requireAuthor } from '~/supabase'
import isNumeric from '~/utils/isNumeric'

export async function loader({ params, request }: LoaderFunctionArgs) {
	const id = isNumeric(params.id!) ? +params.id! : null
	if (!id) {
		throw redirect('/', { headers: request.headers })
	}

	const { session, headers } = await requireAuthor(request, id)

	return json({ user: session.user }, { headers })
}

export default function Build() {
	const { user } = useLoaderData<typeof loader>()

	return <SkillTree />
}
