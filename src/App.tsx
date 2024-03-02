import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';

const App: React.FC = () => {
    const [search, setSearch] = React.useState<string>();
    const handleSearch = (s: string) => setSearch(s);
    return (
        <>
            <header className="fixed w-screen">
                <Navbar onSearch={handleSearch} />
            </header>
            <Home search={search} />
        </>
    )
}
export default App;