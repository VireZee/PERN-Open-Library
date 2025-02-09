import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/Store'
import { change, setShow } from '../redux/SettingsAction'

interface Props {
    isUser: {
        photo: string
        name: string
        uname: string
        email: string
    }
}
const Settings: React.FC<Props> = ({ isUser }) => {
    const dispatch = useDispatch()
    const setState = useSelector((state: RootState) => state.SET)
    const imgFormat = (base64String: string) => {
        const decodedString = atob(base64String)
        const hexString = Array.from(decodedString).map(char => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join('')
        if (decodedString.trim().startsWith('<svg')) return 'svg+xml'
        else if (hexString.startsWith('FFD8FF')) return 'jpeg'
        else if (hexString.startsWith('89504E470D0A1A0A')) return 'png'
        else if (hexString.startsWith('474946383761') || hexString.startsWith('474946383961')) return 'gif'
        return
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(change({ name, value }))
    }
    const toggle = (name: 'old' | 'new') => dispatch(setShow({ ...setState.show, [name]: !setState.show[name] }))
    React.useEffect(() => {
        dispatch(change({ name: 'name', value: isUser.name }))
        dispatch(change({ name: 'uname', value: isUser.uname }))
        dispatch(change({ name: 'email', value: isUser.email }))
    }, [isUser])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-extrabold text-center mb-4">Settings</h2>
                <form>
                    <div className="flex justify-center mb-6">
                        <img src={`data:image/${imgFormat(isUser.photo)};base64,${isUser.photo}`} alt="Image" className="rounded-full w-72 h-72 cursor-pointer" />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 border rounded-md mt-1"
                            value={setState.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Username</label>
                        <input
                            type="text"
                            name="uname"
                            className="w-full p-2 border rounded-md mt-1"
                            value={setState.uname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="EMAIL"
                            className="w-full p-2 border rounded-md mt-1"
                            value={setState.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Change Password</label>
                        <div className="relative">
                            <input
                                type={setState.show['old'] ? "text" : "password"}
                                name="oldPass"
                                placeholder="Old Password"
                                className="w-full p-2 border rounded-md mt-1"
                                value={setState.oldPass}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => toggle('old')}
                                className="absolute inset-y-0 right-0 flex items-center px-3"
                            >
                                {setState.show['old'] ? (
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type={setState.show['new'] ? "text" : "password"}
                                name="newPass"
                                placeholder="New Password"
                                className="w-full p-2 border rounded-md mt-1"
                                value={setState.newPass}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => toggle('new')}
                                className="absolute inset-y-0 right-0 flex items-center px-3"
                            >
                                {setState.show['new'] ? (
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {!setState.show['new'] && (
                            <input
                                type="password"
                                name="rePass"
                                placeholder="Retype Password"
                                className="w-full p-2 border rounded-md mt-1"
                                value={setState.rePass}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                    <button className="w-full p-2 bg-black text-white rounded-md mt-5">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Settings