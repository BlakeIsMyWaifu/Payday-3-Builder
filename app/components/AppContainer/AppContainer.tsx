import { AppShell, ScrollArea, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type SupabaseClient } from '@supabase/supabase-js'
import { type ReactNode } from 'react'

import Header from './Header'
import UserSection from './UserSection'

interface AppContainerProps {
	children: ReactNode
	supabase: SupabaseClient
	baseUrl: string
}

export default function AppContainer({ children, supabase, baseUrl }: AppContainerProps) {
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
					{Array(25)
						.fill(0)
						.map((_, index) => (
							<Skeleton key={index} h={28} mt='sm' animate={false} />
						))}
				</AppShell.Section>

				<AppShell.Section h='70px'>
					<UserSection supabase={supabase} baseUrl={baseUrl} />
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
