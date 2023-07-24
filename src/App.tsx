import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Layout from './components/pageSetup/layout/layout';
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
    interface DefaultTheme extends Theme {}
}

const App = () => (
    <Routes>
        {/* Route with id */}
        {/* <Route path='/:paramId/home' element={<Home />} /> */}

        <Route
            path='/'
            element={
                <Layout>
                    <Home />
                </Layout>
            }
        />
    </Routes>
);

export default App;
