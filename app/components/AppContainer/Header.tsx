import {
	Box,
	Burger,
	Center,
	Group,
	SegmentedControl,
	type SegmentedControlItem,
	Title,
	useMantineColorScheme
} from '@mantine/core'
import { Link } from '@remix-run/react'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import useIsMobile from '~/hooks/useIsMobile'

interface HeaderProps {
	mobile: Disclosure
	desktop: Disclosure
}

interface Disclosure {
	opened: boolean
	toggle: () => void
}

export default function Header({
	mobile: { opened: mobileOpened, toggle: toggleMobile },
	desktop: { opened: desktopOpened, toggle: toggleDesktop }
}: HeaderProps) {
	const isMobile = useIsMobile()

	return (
		<Group h='100%' px='md' justify='space-between'>
			<Group>
				<Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
				<Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
				<Link to='/'>
					<Title>Payday 3 Builder</Title>
				</Link>
			</Group>
			{!isMobile ? <SegmentedToggle /> : null}
		</Group>
	)
}

function SegmentedToggle() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()

	// Data must be set like this to prevent hydration desynchronisation
	const [data, setData] = useState<SegmentedControlItem[]>([])
	useEffect(() => {
		setData([
			{
				value: 'light',
				label: (
					<Center>
						<IconSun size='1rem' stroke={1.5} />
						<Box ml={10}>Light</Box>
					</Center>
				)
			},
			{
				value: 'dark',
				label: (
					<Center>
						<IconMoon size='1rem' stroke={1.5} />
						<Box ml={10}>Dark</Box>
					</Center>
				)
			}
		])
	}, [])

	return (
		<Group justify='center'>
			<SegmentedControl value={colorScheme} onChange={toggleColorScheme} data={data} />
		</Group>
	)
}
