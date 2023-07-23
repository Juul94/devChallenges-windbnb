import { Container, Link, Typography } from '@mui/material';

const Footer = () => (
    <Container
        sx={{
            textAlign: 'center',
            mt: 10,
            mb: 5,
        }}>
        <Typography
            variant='body1'
            sx={{
                color: (theme) => theme.palette.grey[200],
            }}>
            Created by
            <Link
                href='https://devchallenges.io/portfolio/Juul94'
                target='_blank'
                sx={{
                    fontWeight: 700,
                    color: (theme) => theme.palette.grey[200],
                    textDecorationColor: (theme) => theme.palette.grey[200],
                    '&:hover': {
                        color: (theme) => theme.palette.primary.main,
                    },
                }}>
                Juul94
            </Link>
            -
            <Link
                href='https://devchallenges.io/'
                target='_blank'
                sx={{
                    fontWeight: 500,
                    color: (theme) => theme.palette.grey[200],
                    textDecoration: 'none',
                    '&:hover': {
                        color: (theme) => theme.palette.primary.main,
                    },
                }}>
                devchallenges.io
            </Link>
        </Typography>
    </Container>
);

export default Footer;
