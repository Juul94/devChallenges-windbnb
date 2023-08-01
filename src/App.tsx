import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Layout from './components/layoutSetup/layout/layout';
import { Theme } from '@mui/material/styles';
import { GetListRequestQuery } from './types/stays';
import Header from '~/components/layoutSetup/header/header';

declare module '@mui/material/styles' {
    interface DefaultTheme extends Theme {}
}

const App = () => {
    const [query, setQuery] = useState<GetListRequestQuery>({
        location: '',
        guests: { adults: 0, children: 0 },
    });

    return (
        <>
            <Header query={query} setQuery={setQuery} />
            <Routes>
                {/* Route with id */}
                {/* <Route path='/:paramId/home' element={<Home />} /> */}

                <Route
                    path='/'
                    element={
                        <Layout>
                            <Home query={query} />
                        </Layout>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
