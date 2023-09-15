import { AppShell, Burger, Group, ScrollArea, Skeleton, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type ReactNode } from 'react'

interface AppContainerProps {
	children: ReactNode
}

export default function AppContainer({ children }: AppContainerProps) {
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
				<Group h='100%' px='md'>
					<Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
					<Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
					<Title>Payday 3 Builder</Title>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<AppShell.Section grow my='md' component={ScrollArea}>
					{Array(25)
						.fill(0)
						.map((_, index) => (
							<Skeleton key={index} h={28} mt='sm' animate={false} />
						))}
				</AppShell.Section>
				<AppShell.Section>Account Info</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
