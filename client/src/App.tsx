import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Nav from './components/Navbar';
import Home from './components/Home';
import Reg from './components/auth/Register';
import Log from './components/auth/Login';
// import FP from './components/auth/ForgotPassword';
import Col from './components/Collection';
import API from './components/API';


const App: React.FC = () => {
    const [search, setSearch] = useState<string>();
    const searchHandler = (s: string) => setSearch(s);
    return (
        <BrowserRouter>
            <header className="fixed w-screen">
                {window.location.pathname !== '/login' && window.location.pathname !== '/register' && (
                    <Nav onSearch={searchHandler} />
                )}
            </header>
            <main>
                <Routes>
                    <Route path="*" element={<Home search={search} />} />
                    <Route path="collection" element={<Col />} />
                    <Route path="API" element={<API />} />
                    <Route path="register" element={<Reg />} />
                    <Route path="login" element={<Log />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}
export default App;