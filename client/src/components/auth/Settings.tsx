import React from 'react'

interface Props {
    isUser: {
        photo: string
        name: string
        uname: string
        email: string
    }
}
const Settings: React.FC<Props> = ({ isUser }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-extrabold text-center mb-4">Settings</h2>
                <form className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input type="text" className="w-full p-2 border rounded-md mt-1" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Username</label>
                        <input type="text" className="w-full p-2 border rounded-md mt-1" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input type="email" className="w-full p-2 border rounded-md mt-1" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input type="password" className="w-full p-2 border rounded-md mt-1" />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Settings