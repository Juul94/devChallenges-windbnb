import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '~/pages/home';
import Layout from '~/components/layoutSetup/layout/layout';
import { Theme } from '@mui/material/styles';
import { GetListRequestQuery } from '~/types/stays';
import Header from '~/components/layoutSetup/header/header';

declare module '@mui/material/styles' {
    interface DefaultTheme extends Theme {}
}

const App = () => {
    const [query, setQuery] = useState<GetListRequestQuery>({
        location: '',
        guests: { adults: 0, children: 0 },
    });

    const [totalStays, setTotalStays] = useState<number>(0);

    const handleTotalStays = (total: number) => {
        setTotalStays(total);
    };

    console.log(totalStays);

    return (
        <>
            <Header query={query} setQuery={setQuery} totalStays={totalStays} />
            <Routes>
                {/* Route with id */}
                {/* <Route path='/:paramId/home' element={<Home />} /> */}

                <Route
                    path='/devChallenges-windbnb'
                    element={
                        <Layout>
                            <Home
                                query={query}
                                totalStays={totalStays}
                                handleTotalStays={handleTotalStays}
                            />
                        </Layout>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
