import { Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '@mui/material/styles';
import { StyledIconButton } from '~/components/amountCounter/amountCounterStyles';

interface AmountCounterProps {
    title: string;
    subtitle: string;
    handleDecrement: () => void;
    handleIncrement: () => void;
    total: number;
}

const AmountCounter = ({
    title,
    subtitle,
    handleDecrement,
    handleIncrement,
    total,
}: AmountCounterProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                userSelect: 'none',
            }}>
            <Typography
                variant='body2'
                fontWeight='bold'
                sx={{
                    mb: 0.5,
                }}>
                {title}
            </Typography>

            <Typography variant='body2' color={theme.palette.grey[100]}>
                {subtitle}
            </Typography>

            <Box
                sx={{
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
                <StyledIconButton
                    onClick={handleDecrement}
                    sx={{
                        border: `2px solid ${theme.palette.grey[100]}`,
                        ...(total === 0 && {
                            color: theme.palette.grey[200],
                        }),
                        ...(total > 0 && {
                            '&:hover': {
                                cursor: 'pointer',
                                border: `2px solid ${theme.palette.primary.main}`,
                                '.MuiSvgIcon-root': {
                                    color: theme.palette.primary.main,
                                },
                            },
                        }),
                    }}>
                    <RemoveIcon
                        fontSize='inherit'
                        sx={{
                            color: theme.palette.grey[200],
                        }}
                    />
                </StyledIconButton>

                <Typography
                    variant='body1'
                    sx={{
                        mx: 2,
                        width: 15,
                        textAlign: 'center',
                    }}>
                    {total}
                </Typography>

                <StyledIconButton
                    onClick={handleIncrement}
                    sx={{
                        border: `2px solid ${theme.palette.grey[100]}`,
                        ...(total === 0 && {
                            color: theme.palette.grey[200],
                        }),
                        '&:hover': {
                            cursor: 'pointer',
                            border: `2px solid ${theme.palette.primary.main}`,
                            '.MuiSvgIcon-root': {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}>
                    <AddIcon
                        fontSize='inherit'
                        sx={{
                            color: theme.palette.grey[200],
                        }}
                    />
                </StyledIconButton>
            </Box>
        </Box>
    );
};

export default AmountCounter;
