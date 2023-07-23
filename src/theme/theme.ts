import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: '#EB5757',
        },
        secondary: {
            main: '#4F4F4F',
        },
        grey: {
            50: '#F2F2F2',
            100: '#BDBDBD',
            200: '#828282',
            300: '#4F4F4F',
            400: '#333333',
            500: '#333333',
            600: '#333333',
            700: '#333333',
            800: '#333333',
            900: '#333333',
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        body1: {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1,
        },
        body2: {
            fontFamily: 'Mulish, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1,
        },
        subtitle1: {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        subtitle2: {
            fontFamily: 'Mulish, sans-serif',
            fontSize: '9px',
            fontWeight: 800,
            lineHeight: 0.5,
        },
        h1: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: 2,
        },
    },
});

export default theme;
