import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setData } from './redux/APIAction'
import { RootState } from './redux/Store'
import axios, { AxiosError } from 'axios'

const API: React.FC = () => {
    const dispatch = useDispatch()
    const apiState = useSelector((state: RootState) => state.API)
    const { hash } = useParams<{ hash: string }>()
    React.useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://${import.meta.env.VITE_DOMAIN}/API/${hash}`)
                dispatch(setData(res.data))
            } catch (err) {
                const XR = err as AxiosError<{ e: string }>
                if (XR.response!.data.e) {
                    alert(XR.response!.data.e)
                } else {
                    alert(XR.response!.statusText)
                }
            }
        })()
    }, [hash])
    return (
        <div>
            {apiState.data ? (
                apiState.data
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
export default API