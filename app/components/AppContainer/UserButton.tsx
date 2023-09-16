import { Avatar, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core'
import { type SupabaseClient } from '@supabase/supabase-js'
import { IconChevronRight, IconLogout } from '@tabler/icons-react'

import useIsMobile from '~/hooks/useIsMobile'

import classes from './AppContainer.module.css'

interface UserButtonProps {
	image: string
	name: string
	supabase: SupabaseClient
}

export default function UserButton({ image, name, supabase }: UserButtonProps) {
	const handleLogout = async () => {
		await supabase.auth.signOut()
		window.location.reload()
	}

	const isMobile = useIsMobile()

	return (
		<Menu position={isMobile ? 'top' : 'right'}>
			<Menu.Target>
				<UnstyledButton className={classes.userButton}>
					<Group>
						<Avatar src={image} radius='xl' />

						<div style={{ flex: 1 }}>
							<Text size='sm'>{name}</Text>
						</div>

						<IconChevronRight size='0.9rem' stroke={1.5} />
					</Group>
				</UnstyledButton>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Account</Menu.Label>
				<Menu.Item
					leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
					onClick={handleLogout}
				>
					Sign Out
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}
