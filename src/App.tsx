import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';

const App = () => (
    <Routes>
        {/* Route with id */}
        {/* <Route path='/:paramId/home' element={<Home />} /> */}

        {/* Wildcard route */}
        <Route path='/' element={<Home />} />
    </Routes>
);

export default App;
