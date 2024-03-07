import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';

const App: React.FC = () => {
    const [change, setChange] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('harry+potter');
    const changeHandler = (c: boolean) => setChange(c);
    const searchHandler = (s: string) => setSearch(s);
    return (
        <>
            <header className="fixed w-screen">
                <Navbar onChange={changeHandler} onSearch={searchHandler} />
            </header>
            <main>
                <Home change={change} search={search} />
            </main>
        </>
    )
}
export default App;