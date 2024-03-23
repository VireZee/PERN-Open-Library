import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Nav from './components/Navbar';
import Home from './components/Home';
import Reg from './components/auth/Register';
import Log from './components/auth/Login';
import FP from './components/auth/ForgotPassword';
import Col from './components/Collection';
import API from './components/API';

const App: React.FC = () => {
    const [search, setSearch] = useState<string>();
    const searchHandler = (s: string) => setSearch(s);
    const navbar = ['/register', '/login'].includes(window.location.pathname);
    return (
        <BrowserRouter>
            <header className="fixed w-screen">
                {!navbar && <Nav onSearch={searchHandler} />}
                {navbar && <a href="/" className="absolute top-4 left-4 text-[1.2rem] text-white no-underline">&#8592; Back to home</a>}
            </header>
            <main>
                <Routes>
                    <Route path="*" element={<Home search={search} />} />
                    <Route path="collection" element={<Col />} />
                    <Route path="API" element={<API />} />
                    <Route path="register" element={<Reg />} />
                    <Route path="login" element={<Log />} />
                    <Route path="fp" element={<FP />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}
export default App;