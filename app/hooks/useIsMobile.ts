import { useMediaQuery } from '@mantine/hooks'

export default function useIsMobile() {
	return !useMediaQuery('(min-width: 769px)')
}
