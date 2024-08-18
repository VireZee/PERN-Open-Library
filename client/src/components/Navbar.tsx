import React from 'react'
import { Link } from 'react-router-dom'
import _debounce from 'lodash/debounce'

interface Props {
    onSearch: (v: string) => void
    isUser: {
        name: string
        photo: string
    } | null
}
interface URLParams {
    title?: string
    isbn?: string
}
const Navbar: React.FC<Props> = ({ onSearch, isUser }) => {
    const [active, setActive] = React.useState<string>('home')
    const debSearch = _debounce((e: string) => onSearch(e), 500)
    const { title, isbn }: URLParams = Object.fromEntries(new URLSearchParams(window.location.search))
    const str = title || isbn
    const imgFormat = (base64String: string) => {
        const hexString = Buffer.from(base64String, 'base64').toString('hex').toUpperCase()
        if (Buffer.from(base64String, 'base64').toString('utf-8').trim().startsWith('<svg')) {
            return 'svg+xml';
        } else if (hexString.startsWith('FFD8FF')) {
            return 'jpeg';
        } else if (hexString.startsWith('89504E470D0A1A0A')) {
            return 'png';
        } else if (hexString.startsWith('474946383761') || hexString.startsWith('474946383961')) {
            return 'gif';
        }
        return
    }
    return (
        <nav className="flex justify-between items-center -mt-16 p-7 h-16 bg-[#282828]">
            <div className="text-white">
                {isUser ? (
                    <>
                        <Link to="" className={`${active === 'home' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => setActive('home')}>Home</Link>
                        <Link to="collection" className={`${active === 'col' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => setActive('col')}>Collection</Link>
                        <Link to="API" className={`${active === 'api' ? 'text-gray-500' : 'hover:text-gray-500'}`} onClick={() => setActive('api')}>API</Link>
                    </>
                ) : (
                    <Link to="" className='text-gray-500'>Home</Link>
                )}
            </div>
            <input placeholder="Search Title or ISBN (without &quot;-&quot; or spaces)" className="w-[25vw] p-2 rounded-full" defaultValue={str} onChange={e => debSearch(e.target.value)} />
            <div className="text-white flex items-center">
                {isUser ? (
                    <>
                        <span className="mr-4">{isUser.name}</span>
                        <img src={`data:image/${imgFormat(isUser.photo)};base64,${isUser.photo}`} alt="Image" className="rounded-full w-12 h-12" />
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