import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    search: string
    auth: boolean
    user: {
        name: string
        photo: string
    } | null
}
const initialState: State = {
    search: '',
    auth: false,
    user: null
}
const AppAction = createSlice({
    name: 'APP',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload
        },
        setUser: (state, action: PayloadAction<{ name: string, photo: string } | null>) => {
            state.user = action.payload
        }
    }
})
export const { setSearch, setAuth, setUser } = AppAction.actions
export default AppAction.reducer