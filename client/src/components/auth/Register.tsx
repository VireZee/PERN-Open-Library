import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
    const [pass, setPass] = useState<string>();
    const [rePass, setRePass] = useState<string>();
    const [match, setMatch] = useState<boolean>(true);
    const [show, setShow] = useState<boolean>(false);
    const toggle = () => setShow(s => !s);
    const handleRetype = (e: string) => {
        setRePass(e);
        setMatch(e === pass);
    };
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            const form = new FormData(e.currentTarget);
            const data = Object.fromEntries(form.entries());
            await axios.post('http://localhost:3000/register', data);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className="bg-black flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
                <h1 className="flex justify-center text-2xl font-semibold mb-4">Register</h1>
                <form action="register" method="POST" onSubmit={submit}>
                    <div className="mb-4">
                        <label className="text-md text-gray-700">Email</label>
                        <input type="email" name="email" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-black" />
                    </div>
                    <div className="mb-4">
                        <label className="text-md text-gray-700">Username</label>
                        <input type="text" name="username" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-black" />
                    </div>
                    <div className="mb-4">
                        <label className="text-md text-gray-700">Name</label>
                        <input type="text" name="name" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-black" />
                    </div>
                    <div className="mb-4">
                        <label className="text-md text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={show ? "text" : "password"}
                                name="password"
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-black"
                            />
                            <button
                                type="button"
                                onClick={toggle}
                                className="absolute inset-y-0 right-0 flex items-center px-3"
                            >
                                {show ? (
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 2L22 22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                ) : (
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    {!show && (
                        <div className="mb-4">
                            <label className="text-md text-gray-700">Retype Password</label>
                            <input
                                type="password"
                                name="retype"
                                value={rePass}
                                onChange={e => handleRetype(e.target.value)}
                                className={`mt-1 p-2 border ${match ? 'border-gray-300' : 'border-red-500'} rounded-md w-full focus:outline-none focus:border-black`}
                            />
                            {!match && <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>}
                        </div>
                    )}
                    <div className="flex justify-center mb-4">
                        <a href="fp" className="font-medium text-black hover:text-black">Forgot your password?</a>
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md">Register</button>
                </form>
                <div className="mt-4 text-sm text-gray-700 text-center">
                    Already have an account? <a href="/login" className="font-medium text-black hover:text-black">Log in</a>
                </div>
            </div>
        </div>
    )
}
export default Register;