import { FC, useState } from 'react';
import { Container, Link, Typography, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '~/img/logo.jpg';
import SearchModal from '~/components/searchModal/searchModal';
import { GetListRequestQuery } from '~/types/stays';
import { useTheme } from '@mui/material/styles';
import { useResponsiveQueries } from '~/utility/mediaQueries';

interface HeaderProps {
    query: GetListRequestQuery;
    setQuery: (query: GetListRequestQuery) => void;
    totalStays: number;
}

const Header: FC<HeaderProps> = ({ query, setQuery, totalStays }) => {
    const { isMobile } = useResponsiveQueries();

    const theme = useTheme();

    const [isModalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const locationCheck = query?.location;
    const guestCheck = query?.guests && (query.guests.adults > 0 || query.guests.children > 0);

    const totalGuestsText = `${query.guests.adults + query.guests.children} guests`;

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 4,
            }}>
            <Link href='/' sx={{ m: '0 !important' }}>
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
                {isMobile ? (
                    <Typography
                        variant='body2'
                        color={locationCheck ? theme.palette.grey[400] : theme.palette.grey[100]}
                        sx={{
                            px: 2,
                            py: 2,
                            borderRightColor: theme.palette.grey[50],
                            borderRightWidth: 1,
                            borderRightStyle: 'solid',
                        }}>
                        Filters
                    </Typography>
                ) : (
                    <>
                        <Typography
                            variant='body2'
                            color={
                                locationCheck ? theme.palette.grey[400] : theme.palette.grey[100]
                            }
                            sx={{
                                px: 2,
                                py: 2,
                                borderRightColor: theme.palette.grey[50],
                                borderRightWidth: 1,
                                borderRightStyle: 'solid',
                            }}>
                            {locationCheck || 'Find location'}
                        </Typography>

                        <Typography
                            variant='body2'
                            color={guestCheck ? theme.palette.grey[400] : theme.palette.grey[100]}
                            sx={{
                                py: 2,
                                px: 2,
                                borderRightColor: theme.palette.grey[50],
                                borderRightWidth: 1,
                                borderRightStyle: 'solid',
                            }}>
                            {guestCheck ? totalGuestsText : 'Add guests'}
                        </Typography>
                    </>
                )}

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

            <SearchModal
                open={isModalOpen}
                onClose={handleModalClose}
                query={query}
                setQuery={setQuery}
                totalStays={totalStays}
            />
        </Container>
    );
};

export default Header;
