import React from 'react';

const Register: React.FC = () => {
    const [show, setShow] = React.useState<boolean>(false);
    const toggle = () => setShow(prevState => !prevState);
    return (
        <div className="bg-black flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
                <h1 className="flex justify-center text-2xl font-semibold mb-4">Register</h1>
                <form action="register">
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
                            <input type={show ? "text" : "password"} name="password" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-black" />
                            <button
                                type="button"
                                onClick={toggle}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                            >
                                {show ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.997 18c4.418 0 8-4.18 8-9s-3.582-9-8-9C5.579 0 2 4.18 2 9s3.579 9 7.997 9zm0-16c3.309 0 5.997 3.589 5.997 7s-2.688 7-5.997 7C6.688 16 4 12.411 4 9s2.688-7 5.997-7zM8 9a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3c4.418 0 8 4.18 8 9s-3.582 9-8 9C5.579 21 2 16.82 2 12s3.579-9 7.997-9zm0 16c3.309 0 5.997-3.589 5.997-7S13.309 5 10 5C6.688 5 4 8.589 4 12s2.688 7 5.997 7zm0-11a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="text-md text-gray-700">Retype Password</label>
                        <input type="password" name="password" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-black" />
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="rememberMe" className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded" />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">Remember me</label>
                        </div>
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