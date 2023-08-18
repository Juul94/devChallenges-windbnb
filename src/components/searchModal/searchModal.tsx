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

interface SearchHeaderProps {
    open: boolean;
    onClose: () => void;
    query: GetListRequestQuery;
    setQuery: (query: GetListRequestQuery) => void;
}

const SearchModal = ({ open, onClose, query, setQuery }: SearchHeaderProps) => {
    const theme = useTheme();

    const [viewGuestOptions, setViewGuestOptions] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const totalGuests = {
        total: query.guests.adults + query.guests.children,
        text: `${query.guests.adults + query.guests.children} guests`,
    };

    const uniqueLocations = new Set<string>();

    const locationFilter = stays.reduce<Stay[]>((filtered, stay) => {
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

    const handleGuestChange = (
        guestType: keyof GetListRequestQuery['guests'],
        operation: 'increment' | 'decrement',
    ) => {
        if (operation === 'increment') {
            setQuery({
                ...query,
                guests: {
                    ...query.guests,
                    [guestType]: query.guests[guestType] + 1,
                },
            });
        } else if (operation === 'decrement') {
            if (query.guests[guestType] > 0) {
                setQuery({
                    ...query,
                    guests: {
                        ...query.guests,
                        [guestType]: query.guests[guestType] - 1,
                    },
                });
            }
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
                        backgroundColor: 'rgba(79, 79, 79, 0.4)',
                    },
                },
            }}>
            <Fade in={open}>
                <StyledModal>
                    <Container maxWidth='lg'>
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
                        </FlexContainer>

                        <Grid
                            container
                            spacing={2}
                            sx={{
                                mt: 2,
                                ml: 2,
                                'MuiGrid-root>.MuiGrid-item': {
                                    px: 4,
                                    py: 0,
                                },
                            }}>
                            <Grid item xs={4}>
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
                                            color={theme.palette.grey[400]}>
                                            No locations found
                                        </Typography>
                                    ))}
                            </Grid>

                            <Grid item xs={4}>
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
                            </Grid>
                        </Grid>
                    </Container>
                </StyledModal>
            </Fade>
        </Modal>
    );
};

export default SearchModal;
