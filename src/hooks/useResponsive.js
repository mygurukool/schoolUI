import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles'

const useResposive = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.up('xs'));
    const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    return { isMobile, isTablet, isDesktop }
}

export default useResposive