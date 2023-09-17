import '@mantine/core/styles.css'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { cssBundleHref } from '@remix-run/css-bundle'
import { json, type LinksFunction, type LoaderFunctionArgs } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import { type Session, type SupabaseClient } from '@supabase/supabase-js'
import { type ReactNode } from 'react'

import AppContainer from './components/AppContainer'
import useSupabase, { supabaseLoader } from './hooks/useSupabase'
import getURL from './utils/getURL'
import { theme } from './utils/mantineTheme'

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])]

interface RootOutlet {
	supabase: SupabaseClient
	session: Session | null
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { env, session, response } = await supabaseLoader(request)
	const baseUrl = getURL()
	return json({ env, session, baseUrl }, { headers: response.headers })
}

export default function App() {
	const { env, session: sessionJsonify, baseUrl } = useLoaderData<typeof loader>()
	const session = sessionJsonify as Session | null
	const { supabase } = useSupabase({ env, session })

	return (
		<Document>
			<MantineProvider theme={theme} defaultColorScheme='auto'>
				<AppContainer supabase={supabase} baseUrl={baseUrl}>
					<Outlet context={{ supabase, session } satisfies RootOutlet} />
				</AppContainer>
			</MantineProvider>
		</Document>
	)
}

interface DocumentProps {
	children: ReactNode
}

export function Document({ children }: DocumentProps) {
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
