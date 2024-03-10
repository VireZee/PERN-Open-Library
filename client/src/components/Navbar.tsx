import React from 'react';
import { Link } from 'react-router-dom';
import _debounce from 'lodash/debounce';

interface Props {
    onSearch: (v: string) => void;
}
interface URLParams {
    title?: string;
    isbn?: string;
}
const Navbar: React.FC<Props> = ({ onSearch }) => {
    const [active, setActive] = React.useState<string>('home');
    const debSearch = _debounce((e: string) => onSearch(e), 750);
    const { title, isbn }: URLParams = Object.fromEntries(new URLSearchParams(window.location.search));
    const str = title || isbn;
    return (
        <nav className="flex items-center justify-between -mt-16 p-7 h-16 bg-black">
            <div className="text-white">
                <Link to="" className={`${active === 'home' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => setActive('home')}>Home</Link>
                <Link to="collection" className={`${active === 'col' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => setActive('col')}>Collection</Link>
                <Link to="API" className={`${active === 'api' ? 'text-gray-500' : 'hover:text-gray-500'}`} onClick={() => setActive('api')}>API</Link>
            </div>
            <input placeholder="Search Title or ISBN (without &quot;-&quot; or spaces)" className="w-[25vw] p-2 rounded-full" defaultValue={str} onChange={(e) => debSearch(e.target.value)} />
            <div className="text-white">
                <a href="register" className="hover:text-gray-500 mr-4">Register</a>
                <a href="login" className="hover:text-gray-500">Already have an account?</a>
            </div>
        </nav>
    );
};
export default Navbar;