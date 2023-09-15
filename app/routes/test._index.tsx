import { Container, Text } from '@mantine/core'
import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createServerClient } from '@supabase/auth-helpers-remix'

import Login from '~/components/login'
import { type Database } from '~/types/database.types'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const response = new Response()
	const supabaseClient = createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
		request,
		response
	})

	const { data } = await supabaseClient.from('Test').select('*')

	return json(
		{ data },
		{
			headers: response.headers
		}
	)
}

export const meta: MetaFunction = () => {
	return [{ title: 'test' }]
}

export default function Index() {
	const test = useLoaderData<typeof loader>()

	return (
		<Container>
			<Text>{JSON.stringify(test)}</Text>
			<Login />
		</Container>
	)
}
