import { useMediaQuery } from '@mantine/hooks';

export default function useMobile() {
    return useMediaQuery('(max-width: 768px)')
}