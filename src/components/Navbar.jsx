import React from 'react';

const Navbar = () => {
    const [active, setActive] = React.useState('home');
    const handleClick = (btn) => {
        setActive(btn);
    };
    return (
        <nav className="fixed flex items-center justify-between -mt-16 p-7 w-full h-16 bg-black">
            <div className="text-white">
                <a href="#" className={`${active === 'home' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => handleClick('home')}>Home</a>
                <a href="#" className={`${active === 'col' ? 'text-gray-500' : 'hover:text-gray-500'} mr-4`} onClick={() => handleClick('col')}>Collection</a>
                <a href="#" className={`${active === 'api' ? 'text-gray-500' : 'hover:text-gray-500'}`} onClick={() => handleClick('api')}>API</a>
            </div>
            <input type="text" placeholder="Search Title or ISBN" className="w-[25vw] p-2 rounded-full" />
            <div className="text-white">
                <a href="register" className="hover:text-gray-500 mr-4">Register</a>
                <a href="login" className="hover:text-gray-500">Already have an account?</a>
            </div>
        </nav>
    );
};
export default Navbar;