import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import AuthGQL from './components/graphql/auth/Auth'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './components/redux/Store'
import { setSearch, setUser } from './components/redux/AppAction'
import './styles/App.css'
import Nav from './components/Navbar'
import Home from './components/Home'
import Reg from './components/auth/Register'
import Log from './components/auth/Login'
// import FP from './components/auth/ForgotPassword'
import Col from './components/Collection'
import APIKey from './components/APIKey'
import Set from './components/auth/Settings'
import NF from './components/error/NotFound'

const App: React.FC = () => {
    const { loading, data, error } = useQuery(AuthGQL)
    const dispatch = useDispatch()
    const appState = useSelector((state: RootState) => state.APP)
    const searchHandler = (s: string) => dispatch(setSearch(s))
    const showBackLink = ['/register', '/login'].includes(window.location.pathname)
    const hideHeader = window.location.pathname === '/settings'
    React.useEffect(() => {
        if (!loading) {
            if (data) dispatch(setUser(data.auth))
            else if (error) dispatch(setUser(null))
        }
    }, [data, error])
    return (
        <BrowserRouter>
            {!hideHeader && (
                <header className="fixed w-screen">
                    {showBackLink ? (
                        <a href="/" className="absolute top-4 left-4 text-[1.2rem] text-white no-underline">&#8592; Back to home</a>
                    ) : (
                        <Nav isUser={appState.user} onSearch={searchHandler} />
                    )}
                </header>
            )}
            <main>
                <Routes>
                    <Route path='' element={<Home isUser={appState.user} search={appState.search} />} />
                    <Route path='s' element={<Home isUser={appState.user} search={appState.search} />} />
                    <Route path='register' element={!appState.user ? <Reg /> : <Navigate to='/' />} />
                    <Route path='login' element={!appState.user ? <Log /> : <Navigate to='/' />} />
                    <Route path='collection' element={appState.loadUser ? null : appState.user ? <Col isUser={appState.user} search={appState.search} /> : <Navigate to='/login' />} />
                    <Route path='collection?' element={appState.loadUser ? null : appState.user ? <Col isUser={appState.user} search={appState.search} /> : <Navigate to='/login' />} />
                    <Route path='API' element={appState.loadUser ? null : appState.user ? <APIKey isUser={appState.user} /> : <Navigate to='/login' />} />
                    <Route path='settings' element={appState.loadUser ? null : appState.user ? <Set isUser={appState.user} /> : <Navigate to='/login' />} />
                    <Route path='*' element={<NF />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}
export default App