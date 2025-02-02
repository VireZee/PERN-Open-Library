import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: number | string | Books[]
    message?: string
}
const initialState: State = {
    user_id: 0,
    email: '',
    username: '',
    books: []
}
interface API {
    user_id: number
    email: string
    username: string
    books: Books[]
    message?: string
}
interface Books {
    cover_i: string
    isbn: string
    title: string
    author_name: string
}
const APIAction = createSlice({
    name: 'API',
    initialState,
    reducers: {
        setApi: (state, { payload }: PayloadAction<API>) => {
            if (payload.message) state['message'] = payload.message
            else {
                state['user_id'] = payload.user_id
                state['email'] = payload.email
                state['username'] = payload.username
                state['books'] = payload.books
            }
        }
    }
})
export const { setApi } = APIAction.actions
export default APIAction.reducer