import '@mantine/core/styles.css'

import { Center, ColorSchemeScript, Loader, MantineProvider } from '@mantine/core'
import { cssBundleHref } from '@remix-run/css-bundle'
import { json, type LinksFunction, type LoaderFunctionArgs } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useNavigation
} from '@remix-run/react'
import { type Session } from '@supabase/supabase-js'
import { type ReactNode } from 'react'

import AppContainer from './components/AppContainer'
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

export function Document({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<Meta />
				<Links />
				<ColorSchemeScript />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
			</body>
		</html>
	)
}
