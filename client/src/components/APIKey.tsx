import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/Store'
import { setOnline, setApiKey } from './redux/APIKeyAction'
import axios, { AxiosError } from 'axios'
import Net from './error/Internet'

interface Props {
    isUser: {
        user_id: number
    } | null
}
const APIKey: React.FC<Props> = ({ isUser }) => {
    const apiKeyState = useSelector((state: RootState) => state.APIK)
    const dispatch = useDispatch()
    const check = async () => {
        try {
            const res = await axios.get(`http://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_SERVER_PORT}/API/check`, {
                params: { u: isUser!.user_id },
                withCredentials: true
            })
            dispatch(setApiKey(res.data.apiKey))
        } catch (err) {
            const XR = err as AxiosError<{ e: string }>
            if (XR.response!.data.e) {
                alert('Check Error: ' + XR.response!.data.e)
            } else {
                alert('Check Error: ' + XR.response!.statusText)
            }
        }
    }
    const generate = async () => {
        try {
            const res = await axios.post(`http://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_SERVER_PORT}/API/generate`, { user_id: isUser!.user_id }, { withCredentials: true })
            dispatch(setApiKey(res.data.apiKey))
        } catch (err) {
            const XR = err as AxiosError<{ e: string }>
            if (XR.response!.data.e) {
                alert(XR.response!.data.e)
            } else {
                alert(XR.response!.statusText)
            }
        }
    }
    React.useEffect(() => {
        const handleOnline = () => dispatch(setOnline(navigator.onLine))
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOnline)
        check()
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOnline)
        }
    }, [apiKeyState.online, apiKeyState.apiKey])
    return (
        <>
            {apiKeyState.online ? (
                <div className="mt-16">
                    {apiKeyState.apiKey !== null ? (
                        <p className="bg-black text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-center">http://{import.meta.env.VITE_DOMAIN}/API/{apiKeyState.apiKey}</p>
                    ) : (
                        <button
                            onClick={generate}
                            className="bg-black text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl"
                        >
                            Generate
                        </button>
                    )}
                </div>
            ) : (
                <Net />
            )}
        </>
    )
}
export default APIKey