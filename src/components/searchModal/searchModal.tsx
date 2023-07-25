import { useState } from 'react';
import { Modal, Fade, Container, Button, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputLabelBorder from '../inputLabelBorder/inputLabelBorder';
import { StyledBox, StyledModal, StyledButtonDiv } from './searchModalStyles';
import { useTheme } from '@mui/material/styles';
import PlaceIcon from '@mui/icons-material/Place';
import { stays } from '~/data/stays';
import { GetListRequestQuery, Stay } from '~/types/stays';

interface SearchHeaderProps {
    open: boolean;
    onClose: () => void;
    query: GetListRequestQuery;
    setQuery: (query: GetListRequestQuery) => void;
}

const SearchModal = ({ open, onClose, query, setQuery }: SearchHeaderProps) => {
    const theme = useTheme();

    const [searchTerm, setSearchTerm] = useState('');

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

    const handleGuestsChange = (guests: { adults: number; children: number }) => {
        setQuery({
            ...query,
            guests,
        });
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
                    <Container>
                        <StyledBox
                            sx={{
                                border: `1px solid ${theme.palette.grey[50]}`,
                            }}>
                            <InputLabelBorder
                                title='Location'
                                placeholder='Find location'
                                onChange={handleLocationChange}
                                value={query.location || searchTerm}
                            />

                            <InputLabelBorder title='Guests' placeholder='Add guests' />

                            <StyledButtonDiv>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    sx={{
                                        borderRadius: 3,
                                        textTransform: 'capitalize',
                                    }}>
                                    <SearchIcon sx={{ mr: 0.5 }} />
                                    Search
                                </Button>
                            </StyledButtonDiv>
                        </StyledBox>

                        {searchTerm &&
                            !query.location &&
                            (locationFilter.length > 0 ? (
                                <Box sx={{ mt: 4, mb: 2, ml: 3 }}>
                                    {locationFilter.map(
                                        (
                                            { city, country }: { city: string; country: string },
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
                                                            color: theme.palette.primary.main,
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
                                </Box>
                            ) : (
                                <Typography
                                    variant='subtitle1'
                                    color={theme.palette.grey[400]}
                                    sx={{
                                        mt: 4,
                                        mb: 2,
                                        ml: 3,
                                    }}>
                                    No locations found
                                </Typography>
                            ))}
                    </Container>
                </StyledModal>
            </Fade>
        </Modal>
    );
};

export default SearchModal;
