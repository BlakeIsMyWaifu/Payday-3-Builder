import { ColorSchemeScript } from '@mantine/core'
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react'
import { type ReactNode } from 'react'

export default function Document({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<Meta />
				<Links />
				<ColorSchemeScript defaultColorScheme='auto' />
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
