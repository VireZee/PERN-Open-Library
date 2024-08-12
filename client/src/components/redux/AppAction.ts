import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    search: string
    auth: boolean
}
const initialState: State = {
    search: '',
    auth: false
}
const HomeAction = createSlice({
    name: 'APP',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload
        }
    }
})
export const { setSearch, setAuth } = HomeAction.actions
export default HomeAction.reducer