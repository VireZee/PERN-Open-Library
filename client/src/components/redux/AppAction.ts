import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    search: string
    user: {
        name: string
        photo: string
    } | null
}
const initialState: State = {
    search: '',
    user: null
}
const AppAction = createSlice({
    name: 'APP',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setUser: (state, action: PayloadAction<{ name: string, photo: string } | null>) => {
            state.user = action.payload
        }
    }
})
export const { setSearch, setUser } = AppAction.actions
export default AppAction.reducer