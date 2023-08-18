import { useState } from 'react';
import { Modal, Fade, Container, Button, Box, Typography, Grid } from '@mui/material';
import InputLabelBorder from '~/components/inputLabelBorder/inputLabelBorder';
import {
    FlexContainer,
    StyledModal,
    StyledButtonDiv,
} from '~/components/searchModal/searchModalStyles';
import { useTheme } from '@mui/material/styles';
import PlaceIcon from '@mui/icons-material/Place';
import { stays } from '~/data/stays';
import { GetListRequestQuery, Stay } from '~/types/stays';
import AmountCounter from '~/components/amountCounter/amountCounter';
import { useResponsiveQueries } from '~/utility/mediaQueries';

interface SearchHeaderProps {
    open: boolean;
    onClose: () => void;
    query: GetListRequestQuery;
    setQuery: (query: GetListRequestQuery) => void;
    totalStays: number;
}

const SearchModal = ({ open, onClose, query, setQuery, totalStays }: SearchHeaderProps) => {
    const theme = useTheme();
    const { isTablet } = useResponsiveQueries();

    const [viewGuestOptions, setViewGuestOptions] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const totalGuests = {
        total: query.guests.adults + query.guests.children,
        text: `${query.guests.adults + query.guests.children} guests`,
    };

    const uniqueLocations = new Set<string>();

    const locationFilter: Stay[] = stays.reduce<Stay[]>((filtered, stay) => {
        const cityLower = stay.city.toLowerCase();
        const countryLower = stay.country.toLowerCase();

        const matchesCity = cityLower.includes(searchTerm.toLowerCase());
        const matchesCountry = countryLower.includes(searchTerm.toLowerCase());

        if (matchesCity || matchesCountry) {
            const locationKey = `${cityLower}-${countryLower}`;

            if (!uniqueLocations.has(locationKey)) {
                uniqueLocations.add(locationKey);
                filtered.push(stay);
            }
        }

        return filtered;
    }, []);

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);

        setQuery({
            ...query,
            location: '',
        });
    };

    const handleLocationSelected = (city: string, country: string) => {
        const locationSelected = `${city}, ${country}`;

        setQuery({
            ...query,
            location: locationSelected,
        });
    };

    const handleViewGuestOptions = () => setViewGuestOptions(!viewGuestOptions);

    const updateGuests = (guestType: keyof typeof query.guests, newCount: number) => {
        setQuery({
            ...query,
            guests: {
                ...query.guests,
                [guestType]: newCount,
            },
        });
    };

    const handleGuestChange = (
        guestType: keyof typeof query.guests,
        operation: 'increment' | 'decrement',
    ) => {
        const currentCount = query.guests[guestType];

        if (operation === 'increment') {
            updateGuests(guestType, currentCount + 1);
        } else if (operation === 'decrement' && currentCount > 0) {
            updateGuests(guestType, currentCount - 1);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    style: {
                        zIndex: 1300,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            }}>
            <Fade in={open}>
                <StyledModal sx={isTablet ? { pt: 3 } : { p: '95px 95px 50px 95px' }}>
                    <Container maxWidth='lg'>
                        {isTablet && (
                            <>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={onClose}
                                    sx={{
                                        width: '100%',
                                        mb: 2,
                                        borderRadius: 3,
                                        textTransform: 'none',
                                    }}>
                                    Show stays
                                </Button>

                                <Typography
                                    variant='subtitle1'
                                    color={theme.palette.grey[400]}
                                    marginBottom={2}
                                    textAlign='center'>
                                    {totalStays <= 0
                                        ? 'No stays found'
                                        : `${totalStays} stays found`}
                                </Typography>
                            </>
                        )}

                        <FlexContainer
                            sx={{
                                border: `1px solid ${theme.palette.grey[50]}`,
                            }}>
                            <InputLabelBorder
                                title='Location'
                                placeholder='Find location'
                                onChange={handleLocationChange}
                                value={query.location || searchTerm}
                            />

                            <InputLabelBorder
                                title='Guests'
                                placeholder={
                                    totalGuests.total > 0 ? totalGuests.text : 'Add guests'
                                }
                                onClick={handleViewGuestOptions}
                                placeholderColorMain={totalGuests.total > 0}
                            />

                            {!isTablet && (
                                <StyledButtonDiv>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={onClose}
                                        sx={{
                                            borderRadius: 3,
                                            textTransform: 'none',
                                        }}>
                                        Show stays
                                    </Button>
                                </StyledButtonDiv>
                            )}
                        </FlexContainer>

                        <Box
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                            marginTop={3}
                            gap={2}
                            marginLeft={isTablet ? 2 : 4}
                            mb={3}>
                            <Box sx={{ flex: isTablet ? 1 / 2 : 1 / 3 }}>
                                {searchTerm &&
                                    !query.location &&
                                    (locationFilter.length > 0 ? (
                                        <>
                                            {locationFilter.map(
                                                (
                                                    {
                                                        city,
                                                        country,
                                                    }: { city: string; country: string },
                                                    index: number,
                                                ) => (
                                                    <Box
                                                        key={`${city}-${country}-${index}`}
                                                        onClick={() =>
                                                            handleLocationSelected(city, country)
                                                        }
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'center',
                                                            mb: 3,
                                                            '&:hover .MuiTypography-root, &:hover .MuiSvgIcon-root':
                                                                {
                                                                    color: theme.palette.primary
                                                                        .main,
                                                                },
                                                            cursor: 'pointer',
                                                        }}>
                                                        <PlaceIcon
                                                            sx={{ color: theme.palette.grey[300] }}
                                                        />
                                                        <Typography
                                                            variant='body2'
                                                            color={theme.palette.grey[300]}
                                                            style={{ marginLeft: '8px' }}>
                                                            {`${city} - ${country}`}
                                                        </Typography>
                                                    </Box>
                                                ),
                                            )}
                                        </>
                                    ) : (
                                        <Typography
                                            variant='subtitle1'
                                            color={theme.palette.grey[400]}
                                            marginBottom={3}>
                                            No locations found
                                        </Typography>
                                    ))}
                            </Box>

                            <Box sx={{ flex: isTablet ? 1 / 2 : 1 / 3 }}>
                                {viewGuestOptions && (
                                    <>
                                        <Box mb={6}>
                                            <AmountCounter
                                                title='Adults'
                                                subtitle='Ages 13 or above'
                                                handleIncrement={() =>
                                                    handleGuestChange('adults', 'increment')
                                                }
                                                handleDecrement={() =>
                                                    handleGuestChange('adults', 'decrement')
                                                }
                                                total={query.guests.adults}
                                            />
                                        </Box>

                                        <AmountCounter
                                            title='Children'
                                            subtitle='Ages 2-12'
                                            handleIncrement={() =>
                                                handleGuestChange('children', 'increment')
                                            }
                                            handleDecrement={() =>
                                                handleGuestChange('children', 'decrement')
                                            }
                                            total={query.guests.children}
                                        />
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Container>
                </StyledModal>
            </Fade>
        </Modal>
    );
};

export default SearchModal;
