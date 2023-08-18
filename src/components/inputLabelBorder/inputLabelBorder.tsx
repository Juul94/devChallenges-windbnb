import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { Tooltip, useMediaQuery } from '@mui/material';
import { useResponsiveQueries } from '~/utility/mediaQueries';

interface BoxProps {
    borderColor?: string;
    borderWidth?: number;
    borderStyle?:
        | 'solid'
        | 'dashed'
        | 'dotted'
        | 'double'
        | 'groove'
        | 'ridge'
        | 'inset'
        | 'outset';
}

interface InputLabelBorderProps extends BoxProps {
    title: string;
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    onClick?: () => void;
    placeholderColorMain?: boolean;
}

const InputLabelBorder: FC<InputLabelBorderProps> = ({
    title,
    placeholder,
    onChange,
    value,
    borderColor,
    borderWidth,
    borderStyle,
    onClick,
    placeholderColorMain,
}) => {
    const theme = useTheme();
    const { isTablet } = useResponsiveQueries();

    return (
        <Box
            sx={{
                borderRightColor: borderColor || theme.palette.grey[50],
                borderRightWidth: borderWidth || 1,
                borderRightStyle: borderStyle || 'solid',
            }}>
            <Box
                sx={{
                    display: 'block',
                    mt: 2,
                    mb: 1.25,
                    px: isTablet ? 2 : 4,
                }}>
                <Typography variant='subtitle2' sx={{ pb: 1 }}>
                    {title}
                </Typography>

                {onClick && (
                    <Tooltip title='Display guests options'>
                        <Typography
                            variant='body2'
                            sx={{
                                width: '100%',
                                mt: 0.5,
                                color: placeholderColorMain
                                    ? theme.palette.grey[400]
                                    : theme.palette.grey[100],
                                '&:hover': {
                                    cursor: 'pointer',
                                    color: theme.palette.grey[200],
                                },
                                userSelect: 'none',
                            }}
                            onClick={onClick}>
                            {placeholder}
                        </Typography>
                    </Tooltip>
                )}

                {onChange && (
                    <TextField
                        fullWidth
                        id='inputLocation'
                        placeholder={placeholder}
                        variant='outlined'
                        onChange={onChange}
                        onClick={onClick}
                        value={value}
                    />
                )}
            </Box>
        </Box>
    );
};

export default InputLabelBorder;
