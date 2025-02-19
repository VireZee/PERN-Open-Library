import React from 'react'
import { useQuery, useMutation, ApolloError } from '@apollo/client'
import CheckGQL from './graphql/api/Check'
import GenerateGQL from './graphql/api/Generate'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/Store'
import { setOnline, setApiKey } from './redux/APIAction'
import Net from './error/Internet'

const API: React.FC = () => {
    const { loading, data, error } = useQuery(CheckGQL)
    const [gen] = useMutation(GenerateGQL)
    const dispatch = useDispatch()
    const apiState = useSelector((state: RootState) => state.API)
    const check = async () => {
        if (!loading) {
            if (data) dispatch(setApiKey(data.check))
            else if (error) alert(error)
        }
    }
    const generate = async () => {
        try {
            const { data } = await gen()
            if (data) dispatch(setApiKey(data.generate))
        } catch (err) {
            if (err instanceof ApolloError) alert(err.message)
            else alert('An unexpected error occurred.')
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
    }, [apiState.online, data, error])
    return (
        <>
            {apiState.online ? (
                <div className="mt-16">
                    {apiState.apiKey !== null ? (
                        <p className="bg-black text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-center">http://{import.meta.env.VITE_DOMAIN}:{import.meta.env.VITE_SERVER_PORT}/API/{apiState.apiKey}</p>
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