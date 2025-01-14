import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setApiKey } from './redux/APIAction'
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
        check()
    }, [apiState.online, apiState.apiKey])
    console.log(apiState.apiKey)
    return (
        <>
            {apiState.online ? (
                <div className="mt-16">
                    {apiState.apiKey !== null ? (
                        <h1 className="bg-black text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl break-all">{apiState.apiKey}</h1>
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