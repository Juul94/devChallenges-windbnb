import { FC, useState, useEffect } from 'react';
import { Box, Grid, Typography, Chip } from '@mui/material';
import { Stay } from '~/types/stays';
import { useTheme } from '@mui/material/styles';
import StarRateIcon from '@mui/icons-material/StarRate';
import { FlexBox } from './stayResultsStyles';

interface StayResultsProps {
    filteredStays: Stay[];
    handleTotalStays: (total: number) => void;
}

const StayResults: FC<StayResultsProps> = ({ filteredStays, handleTotalStays }) => {
    const theme = useTheme();

    return (
        <Grid container spacing={4}>
            {filteredStays.map((stay: Stay, index: number) => {
                return (
                    <Grid
                        key={`${stay.uid}-${index}`}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{
                            mt: 2,
                        }}>
                        <Box
                            style={{
                                position: 'relative',
                                width: '100%',
                                paddingTop: '275px',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                maxHeight: '250px',
                            }}>
                            <img
                                src={stay.photo}
                                alt={stay.title}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mt: 1.5,
                            }}>
                            <FlexBox>
                                {stay.superHost && (
                                    <Chip
                                        label={
                                            <Typography
                                                variant='subtitle1'
                                                color={theme.palette.grey[300]}
                                                sx={{
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                }}>
                                                Super Host
                                            </Typography>
                                        }
                                        variant='outlined'
                                        sx={{
                                            border: `1px solid ${theme.palette.grey[300]}`,
                                            textTransform: 'uppercase',
                                            mr: 1,
                                        }}
                                    />
                                )}

                                <Typography variant='body1' color={theme.palette.grey[200]}>
                                    {stay.type} {stay.beds && `- ${stay?.beds} beds`}
                                </Typography>
                            </FlexBox>

                            <FlexBox>
                                <StarRateIcon
                                    sx={{
                                        width: '20px',
                                        color: theme.palette.primary.main,
                                        mr: 0.5,
                                    }}
                                />

                                <Typography variant='body1' color={theme.palette.grey[300]}>
                                    {stay.rating}
                                </Typography>
                            </FlexBox>
                        </Box>

                        <Typography
                            variant='subtitle1'
                            color={theme.palette.grey[400]}
                            sx={{
                                mt: 1,
                            }}>
                            {stay.title}
                        </Typography>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default StayResults;
