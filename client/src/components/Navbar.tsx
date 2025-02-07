import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/Store'
import { setActive, setIsDropdownOpen } from './redux/NavbarAction'
import { useMutation, ApolloError } from '@apollo/client'
import LogoutGQL from './graphql/auth/Logout'

interface Props {
    onSearch: (v: string) => void
    isUser: {
        photo: string
        name: string
    } | null
}
interface URLParams {
    title?: string
    isbn?: string
}
const Navbar: React.FC<Props> = ({ onSearch, isUser }) => {
    const navState = useSelector((state: RootState) => state.NAV)
    const dispatch = useDispatch()
    const [logout] = useMutation(LogoutGQL)
    const { title, isbn }: URLParams = Object.fromEntries(new URLSearchParams(window.location.search))
    const str = title || isbn
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSearch(e.currentTarget.value)
    }
    const imgFormat = (base64String: string) => {
        const decodedString = atob(base64String)
        const hexString = Array.from(decodedString).map(char => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join('')
        if (decodedString.trim().startsWith('<svg')) return 'svg+xml'
        else if (hexString.startsWith('FFD8FF')) return 'jpeg'
        else if (hexString.startsWith('89504E470D0A1A0A')) return 'png'
        else if (hexString.startsWith('474946383761') || hexString.startsWith('474946383961')) return 'gif'
        return
    }
    const handleLogOut = async () => {
        try {
            const { data } = await logout()
            if (data.logout) location.href = '/'
        } catch (err) {
            if (err instanceof ApolloError) alert(err.message)
            else alert('An unexpected error occurred.')
        }
    }
    React.useEffect(() => {
        const path = window.location.pathname
        if (path === '/collection') dispatch(setActive('col'))
        else if (path === '/API') dispatch(setActive('api'))
    }, [])
    return (
        <nav className="flex justify-between items-center -mt-16 p-7 h-16 bg-[#282820]">
            <div className="text-white">
                {isUser ? (
                    <>
                        <Link to="" className={`${navState.active === 'home' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => dispatch(setActive('home'))}>Home</Link>
                        <Link to="collection" className={`${navState.active === 'col' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => dispatch(setActive('col'))}>Collection</Link>
                        <Link to="API" className={`${navState.active === 'api' ? 'text-gray-500' : 'hover:text-gray-500'}`} onClick={() => dispatch(setActive('api'))}>API</Link>
                    </>
                ) : (
                    <Link to="" className='text-gray-500'>Home</Link>
                )}
            </div>
            {navState.active !== 'api' && (
                <input placeholder={navState.active === 'home' ? 'Search Title or ISBN (without "-" or spaces)' : 'Search Title'} className="bg-white w-[25vw] p-2 rounded-full" defaultValue={str} onKeyDown={handleKeyDown} />
            )}
            <div className="text-white flex items-center">
                {isUser ? (
                    <>
                        <span className="mr-4">{isUser.name}</span>
                        <img src={`data:image/${imgFormat(isUser.photo)};base64,${isUser.photo}`} alt="Image" className="rounded-full w-12 h-12 cursor-pointer" onClick={() => dispatch(setIsDropdownOpen(!navState.isDropdownOpen))} />
                        {navState.isDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-white text-black shadow-md rounded-md w-32 z-50">
                                <ul>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer"><a href="settings">Settings</a></li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogOut}>Log Out</li>
                                </ul>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <a href="register" className="hover:text-gray-500 mr-4">Register</a>
                        <a href="login" className="hover:text-gray-500">Already have an account?</a>
                    </>
                )}
            </div>
        </nav>
    )
}
export default Navbar