import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.ts';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
