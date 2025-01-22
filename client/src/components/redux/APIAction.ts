import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    data: APIData[] | null
}
const initialState: State = {
    data: null
}
interface APIData {
    isbn: string
    title: string
    author_name: string
}
const APIAction = createSlice({
    name: 'API',
    initialState,
    reducers: {
        setData: (state, { payload }: PayloadAction<APIData[]>) => {
            state.data = payload
        }
    }
})
export const { setData } = APIAction.actions
export default APIAction.reducer