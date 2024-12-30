import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: string | UserData | null
}
const initialState: State = {
    search: '',
    user: null
}
interface UserData {
    user_id: number
    photo: string
    name: string
    uname: string
    email: string
}
const AppAction = createSlice({
    name: 'APP',
    initialState,
    reducers: {
        setSearch: (state, { payload }: PayloadAction<string>) => {
            state.search = payload
        },
        setUser: (state, { payload }: PayloadAction<UserData | null>) => {
            state.user = payload
        }
    }
})
export const { setSearch, setUser } = AppAction.actions
export default AppAction.reducer