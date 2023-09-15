import '@mantine/core/styles.css'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { cssBundleHref } from '@remix-run/css-bundle'
import { json, type LinksFunction, type LoaderArgs } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'

import useSupabase, { supabaseLoader } from './hooks/useSupabase'

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])]

export const loader = async ({ request }: LoaderArgs) => {
	const { env, session, response } = await supabaseLoader(request)
	return json({ env, session }, { headers: response.headers })
}

export default function App() {
	const { env, session } = useLoaderData<typeof loader>()
	const { supabase } = useSupabase({ env, session })

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
				<MantineProvider>
					<Outlet context={{ supabase }} />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</MantineProvider>
			</body>
		</html>
	)
}
