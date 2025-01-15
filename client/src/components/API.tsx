import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOnline, setApiKey } from './redux/APIAction'
import { RootState } from './redux/Store'
import axios, { AxiosError } from 'axios'
import Net from './error/Internet'

interface Props {
    isUser: {
        user_id: number
    } | null
}
const API: React.FC<Props> = ({ isUser }) => {
    const dispatch = useDispatch()
    const apiState = useSelector((state: RootState) => state.API)
    const check = async () => {
        try {
            const res = await axios.get(`http://${import.meta.env.VITE_DOMAIN}/API/check`, {
                params: { u: isUser!.user_id },
                withCredentials: true
            })
            console.log(res)
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
            const res = await axios.post(`http://${import.meta.env.VITE_DOMAIN}/API/generate`, { user_id: isUser!.user_id }, { withCredentials: true })
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
    }, [apiState.online, apiState.apiKey])
    return (
        <>
            {apiState.online ? (
                <div className="mt-16">
                    {apiState.apiKey !== null ? (
                        <p className="bg-black text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-center">http://{import.meta.env.VITE_DOMAIN}/API/{apiState.apiKey}</p>
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
export default API