import React, { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import { Container } from '@mui/material';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Container>{children}</Container>
            <Footer />
        </>
    );
};

export default Layout;
