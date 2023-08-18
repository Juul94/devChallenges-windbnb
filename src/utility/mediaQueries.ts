import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const useResponsiveQueries = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

    return { isMobile, isTablet };
};
