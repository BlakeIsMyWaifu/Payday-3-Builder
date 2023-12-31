import { Center, Title } from '@mantine/core'
import { type MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export default function Index() {
	return (
		<Center>
			<Title>Home</Title>
		</Center>
	)
}
