import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
    isUser: {
        user_id: number
    } | null
}
const API: React.FC<Props> = ({ isUser }) => {
    const dispatch = useDispatch()
    const homeState = useSelector((state: RootState) => state.API)
    return (
        <div className="mt-16">
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">This is API</h1>
        </div>
    )
}
export default API