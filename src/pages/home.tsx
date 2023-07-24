import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StayResults from '~/components/stayResults/stayResults';
import { stays } from '~/data/stays';

const LandingPage = () => {
    const theme = useTheme();

    console.log(1, stays);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                }}>
                <Typography variant='h1' color={theme.palette.grey[400]}>
                    Most popular stays
                </Typography>

                <Typography variant='body1' color={theme.palette.grey[300]}>
                    12+ stays (Count)
                </Typography>
            </Box>

            <StayResults stays={stays} />
        </>
    );
};

export default LandingPage;
