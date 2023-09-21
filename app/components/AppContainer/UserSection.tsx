import { Avatar, Button, Center, Group, Loader, Menu, rem, Text, UnstyledButton } from '@mantine/core'
import { IconChevronRight, IconLogout } from '@tabler/icons-react'

import classes from '~/components/AppContainer/AppContainer.module.css'
import useAuthUserData from '~/hooks/useAuthUserData'
import useIsMobile from '~/hooks/useIsMobile'
import { type SupabaseClientDatabase } from '~/supabase'

interface UserSectionProps {
	supabase: SupabaseClientDatabase
	baseUrl: string
}

export default function UserSection({ supabase, baseUrl }: UserSectionProps) {
	const handleDiscordLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: `${baseUrl}auth/callback`
			}
		})
	}

	const { userMetadata, loading } = useAuthUserData({ supabase })

	if (loading) return <Loading />

	return userMetadata ? (
		<UserButton image={userMetadata.avatarUrl} name={userMetadata.username} supabase={supabase} />
	) : (
		<Center>
			<Button onClick={handleDiscordLogin}>Sign In</Button>
		</Center>
	)
}

function Loading() {
	return (
		<Center>
			<Loader type='bars' />
		</Center>
	)
}

interface UserButtonProps {
	image: string
	name: string
	supabase: SupabaseClientDatabase
}

function UserButton({ image, name, supabase }: UserButtonProps) {
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
