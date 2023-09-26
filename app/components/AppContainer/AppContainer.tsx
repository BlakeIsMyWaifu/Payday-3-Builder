import { AppShell, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type ReactNode } from 'react'

import { type SupabaseContext } from '~/supabase'

import Header from './Header'
import Navbar from './Navbar'
import UserSection from './UserSection'

interface AppContainerProps {
	children: ReactNode
	context: NonNullable<SupabaseContext>
	baseUrl: string
}

export default function AppContainer({ children, context: { supabase, session }, baseUrl }: AppContainerProps) {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
			}}
			padding='md'
		>
			<AppShell.Header>
				<Header
					mobile={{ opened: mobileOpened, toggle: toggleMobile }}
					desktop={{ opened: desktopOpened, toggle: toggleDesktop }}
				/>
			</AppShell.Header>

			<AppShell.Navbar>
				<AppShell.Section grow p='md' component={ScrollArea}>
					<Navbar supabase={supabase} session={session} />
				</AppShell.Section>

				<AppShell.Section h='70px'>
					<UserSection supabase={supabase} baseUrl={baseUrl} />
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
