import { useState } from 'react';
import { Container, Link, Typography, Divider, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '~/img/logo.png';
import SearchHeader from '~/components/searchHeader';
import { GetListRequestQuery } from '~/types/stay';

const Header = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [query, setQuery] = useState<GetListRequestQuery>();

    const text1 = 'Hillerød';
    const text2 = '2 adults';

    /*
        query:

        location: city/country,
        guests: { adults, children }
    */

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
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: (theme) => `1px solid ${theme.palette.grey[50]}`,
                    boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.1)',
                }}
                onClick={handleModalOpen}
                disableRipple>
                <Typography variant='body1' color='textPrimary'>
                    {text1}
                </Typography>

                <Divider
                    orientation='vertical'
                    flexItem
                    sx={{
                        mx: 2,
                        my: -2,
                        color: (theme) => theme.palette.grey[50],
                    }}
                />

                <Typography variant='body1' color='textPrimary'>
                    {text2}
                </Typography>

                <Divider
                    orientation='vertical'
                    flexItem
                    sx={{
                        mx: 2,
                        my: -2,
                        color: (theme) => theme.palette.grey[50],
                    }}
                />

                <SearchIcon
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                    }}
                />
            </Button>

            <SearchHeader open={isModalOpen} onClose={handleModalClose} />
        </Container>
    );
};

export default Header;
