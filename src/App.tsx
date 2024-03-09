import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';

const App: React.FC = () => {
    const [search, setSearch] = useState<string>();
    const searchHandler = (s: string) => setSearch(s);
    return (
        <>
            <header className="fixed w-screen">
                <Navbar  onSearch={searchHandler} />
            </header>
            <main>
                <Home search={search} />
            </main>
        </>
    )
}
export default App;