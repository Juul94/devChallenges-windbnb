import React, { ReactNode } from 'react';
import Footer from '../footer/footer';
import { Container } from '@mui/material';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Container sx={{ mt: 10 }}>{children}</Container>
            <Footer />
        </>
    );
};

export default Layout;
