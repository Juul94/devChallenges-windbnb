import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

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
    value?: string;
}

const InputLabelBorder: FC<InputLabelBorderProps> = ({
    title,
    placeholder,
    onChange,
    value,
    borderColor,
    borderWidth,
    borderStyle,
}) => {
    const theme = useTheme();

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
                    px: 4,
                }}>
                <Typography variant='subtitle2' sx={{ pb: 1 }}>
                    {title}
                </Typography>

                <TextField
                    fullWidth
                    id='inputLocation'
                    placeholder={placeholder}
                    variant='outlined'
                    onChange={onChange}
                    value={value}
                />
            </Box>
        </Box>
    );
};

export default InputLabelBorder;
