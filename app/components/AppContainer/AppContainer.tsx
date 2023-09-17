import { AppShell, Button, Center, Loader, ScrollArea, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type SupabaseClient } from '@supabase/supabase-js'
import { type ReactNode } from 'react'

import useAuthUserData from '~/hooks/useAuthUserData'

import Header from './Header'
import UserButton from './UserButton'

interface AppContainerProps {
	children: ReactNode
	supabase: SupabaseClient
	baseUrl: string
}

export default function AppContainer({ children, supabase, baseUrl }: AppContainerProps) {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

	const handleDiscordLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: `${baseUrl}auth/callback`
			}
		})
	}

	const { userMetadata, loading: userMetaDataLoading } = useAuthUserData({ supabase })

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
					{userMetaDataLoading ? (
						<Center>
							<Loader type='bars' />
						</Center>
					) : userMetadata ? (
						<UserButton image={userMetadata.avatarUrl} name={userMetadata.username} supabase={supabase} />
					) : (
						<Center>
							<Button onClick={handleDiscordLogin}>Sign In</Button>
						</Center>
					)}
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
