import '@mantine/core/styles.css'

import { Center, Loader, MantineProvider } from '@mantine/core'
import { cssBundleHref } from '@remix-run/css-bundle'
import { json, type LinksFunction, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useNavigation } from '@remix-run/react'
import { type Session } from '@supabase/supabase-js'

import AppContainer from './components/AppContainer'
import Document from './components/Document'
import { getServerClient, getSession, useSupabaseBrowserClient } from './supabase'
import getUrlBase from './utils/getUrlBase'
import { theme } from './utils/mantineTheme'

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { env, headers } = await getServerClient(request)
	const { session } = await getSession(request)
	const baseUrl = getUrlBase()
	return json({ env, session, baseUrl }, { headers })
}

export default function App() {
	const { env, session, baseUrl } = useLoaderData<typeof loader>()
	const context = useSupabaseBrowserClient({ env, session: session as Session | null })
	const navigation = useNavigation()

	return (
		<Document>
			<MantineProvider theme={theme} defaultColorScheme='auto'>
				<AppContainer context={context} baseUrl={baseUrl}>
					{navigation.state === 'loading' ? (
						<Center>
							<Loader />
						</Center>
					) : (
						<Outlet context={context} />
					)}
				</AppContainer>
			</MantineProvider>
		</Document>
	)
}
