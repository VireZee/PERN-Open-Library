import React from 'react'
import { Provider } from 'react-redux'
import store from './components/redux/Store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './styles/App.scss'
import Nav from './components/Navbar'
import Home from './components/Home'
import Reg from './components/auth/Register'
import Log from './components/auth/Login'
import FP from './components/auth/ForgotPassword'
import Col from './components/Collection'
import API from './components/API'

const App: React.FC = () => {
    const [search, setSearch] = React.useState<string>('')
    // const [isAuth, setIsAuth] = React.useState<boolean>(false)
    const searchHandler = (s: string) => setSearch(s)
    const authNav = ['/register', '/login'].includes(window.location.pathname);
    (async () => {
        try {
            const res = await axios.get('http://localhost:3001/API/auth', { withCredentials: true })
            console.log(res)
        } catch {
        }
    })()
    return (
        <Provider store={store}>
            <BrowserRouter>
                <header className="fixed w-screen">
                    {!authNav && <Nav onSearch={searchHandler} isAuth={false} />}
                    {authNav && <a href="/" className="absolute top-4 left-4 text-[1.2rem] text-white no-underline">&#8592; Back to home</a>}
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
        </Provider>
    )
}
export default App