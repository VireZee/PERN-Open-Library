import React from 'react';
import _debounce from 'lodash/debounce';

const Navbar = ({ onSearch }) => {
    const [active, setActive] = React.useState('home');
    const debSearch = _debounce((val) => onSearch(val), 500);
    return (
        <nav className="flex items-center justify-between -mt-16 p-7 h-16 bg-black">
            <div className="text-white">
                <a href="/" className={`${active === 'home' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => setActive('home')}>Home</a>
                <a href="collection" className={`${active === 'col' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => setActive('col')}>Collection</a>
                <a href="API" className={`${active === 'api' ? 'text-gray-500' : 'hover:text-gray-500'}`} onClick={() => setActive('api')}>API</a>
            </div>
            <input placeholder="Search Title or ISBN" className="w-[25vw] p-2 rounded-full" onChange={(e) => debSearch(e.target.value)} />
            <div className="text-white">
                <a href="register" className="hover:text-gray-500 mr-4">Register</a>
                <a href="login" className="hover:text-gray-500">Already have an account?</a>
            </div>
        </nav>
    );
};
export default Navbar;