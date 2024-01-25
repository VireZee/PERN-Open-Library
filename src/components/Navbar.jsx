import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed flex items-center justify-between -mt-16 p-7 w-full h-16 bg-black">
            <div className="text-white">
                <a href="/" className="hover:text-gray-500 mr-4">Home</a>
                <a href="collection" className="hover:text-gray-500 mr-4">Collection</a>
                <a href="api" className="hover:text-gray-500">API</a>
            </div>
            <input type="text" placeholder="Search Title, Author, or ISBN" className="w-[25vw] p-2 rounded-full" />
            <div className="text-white">
                <a href="register" className="hover:text-gray-500 mr-4">Register</a>
                <a href="login" className="hover:text-gray-500">Already have an account?</a>
            </div>
        </nav>
    )
}
export default Navbar;