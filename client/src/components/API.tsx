import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import APIGQL from './graphql/api/API'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/Store'
import { setApi } from './redux/APIAction'

const API: React.FC = () => {
    const { hash } = useParams<{ hash: string }>()
    const { loading, data, error } = useQuery(APIGQL, { variables: { api_key: hash } })
    const apiState = useSelector((state: RootState) => state.API)
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (!loading) {
            if (data) {
                const { __typename, ...api } = data.api
                dispatch(setApi(api))
            }
            else if (error) { }
        }
    }, [data, error])
    return (
        <>
            {apiState ? (
                <pre>{JSON.stringify(apiState, null, 2)}</pre>
            ) : (
                <>Loading...</>
            )}
        </>
    )
}
export default API