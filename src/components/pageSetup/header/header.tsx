import { useState } from 'react';
import { Container, Link, Typography, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '~/img/logo.png';
import SearchHeader from '~/components/searchModal/searchModal';
import { GetListRequestQuery } from '~/types/stay';
import { useTheme } from '@mui/material/styles';

const Header = () => {
    const theme = useTheme();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [query, setQuery] = useState<GetListRequestQuery>();

    /*
        query:

        location: city/country,
        guests: { adults, children }
    */

    const text1 = 'Find location';
    const text2 = 'Add guests';

    const [isModalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 4,
            }}>
            <Link href='/'>
                <img src={logo} alt='Windbnb logo' />
            </Link>

            <Button
                sx={{
                    p: 0,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.grey[50]}`,
                    boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.2)',
                    },
                }}
                onClick={handleModalOpen}
                disableRipple>
                <Typography
                    variant='body2'
                    color={theme.palette.grey[100]}
                    sx={{
                        px: 2,
                        py: 2,
                        borderRightColor: theme.palette.grey[50],
                        borderRightWidth: 1,
                        borderRightStyle: 'solid',
                    }}>
                    {text1}
                </Typography>

                <Typography
                    variant='body2'
                    color={theme.palette.grey[100]}
                    sx={{
                        py: 2,
                        px: 2,
                        borderRightColor: theme.palette.grey[50],
                        borderRightWidth: 1,
                        borderRightStyle: 'solid',
                    }}
                    onClick={() => console.log('guests clicked')}>
                    {text2}
                </Typography>

                <Box
                    sx={{
                        px: 1.5,
                        pt: 1.5,
                        pb: 0.5,
                    }}>
                    <SearchIcon
                        sx={{
                            color: theme.palette.primary.main,
                        }}
                    />
                </Box>
            </Button>

            <SearchHeader open={isModalOpen} onClose={handleModalClose} />
        </Container>
    );
};

export default Header;
