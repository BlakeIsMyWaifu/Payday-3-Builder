import { Container, Text, Title } from '@mantine/core'
import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export default function Index() {
	return (
		<Container>
			<Title>Welcome to Remix</Title>
			<Text>Mantine</Text>
		</Container>
	)
}
