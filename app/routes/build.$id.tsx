import { Text } from '@mantine/core'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export function loader({ params }: LoaderFunctionArgs) {
	return {
		params
	}
}

export default function Build() {
	const { params } = useLoaderData<typeof loader>()

	return <Text>{JSON.stringify(params)}</Text>
}
