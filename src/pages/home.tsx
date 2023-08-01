import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import StayResults from '~/components/stayResults/stayResults';
import { stays } from '~/data/stays';
import { GetListRequestQuery, Stay } from '~/types/stays';
import { Box, Typography } from '@mui/material';

interface HomeProps {
    query: GetListRequestQuery | null;
}

const Home = ({ query }: HomeProps) => {
    const theme = useTheme();

    const [filteredStays, setFilteredStays] = useState<Stay[]>();
    const [totalStays, setTotalStays] = useState<number>(0);

    const handleTotalStays = (total: number) => {
        setTotalStays(total);
    };

    const sortByRating = () => {
        const sorted = [...stays].sort((a, b) => b.rating - a.rating);
        handleTotalStays(sorted.length);
        setFilteredStays(sorted);
    };

    const filterStays = (
        staysList: Stay[],
        location: string,
        guests: { adults: number; children: number },
    ) => {
        const [city, country] = location.split(', ');
        return staysList.filter((stay) => {
            const locationMatch = !location || (stay.city === city && stay.country === country);
            const guestsMatch = !guests || stay.maxGuests >= guests.adults + guests.children;
            return locationMatch && guestsMatch;
        });
    };

    useEffect(() => {
        sortByRating();
    }, []);

    useEffect(() => {
        const filtered = filterStays(
            stays,
            query?.location || '',
            query?.guests || { adults: 0, children: 0 },
        );
        setFilteredStays(filtered);
        handleTotalStays(filtered.length);
    }, [query]);

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
                    {query?.location ? query.location : 'Most popular stays'}
                </Typography>

                <Typography variant='body1' color={theme.palette.grey[300]}>
                    {totalStays && totalStays > 0
                        ? `${totalStays} stay${totalStays > 1 ? 's' : ''}`
                        : ''}
                </Typography>
            </Box>

            <StayResults filteredStays={filteredStays || []} handleTotalStays={handleTotalStays} />
        </>
    );
};

export default Home;
