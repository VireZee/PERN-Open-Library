import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: string | undefined | null | UserData | Boolean
}
const initialState: State = {
    search: '',
    user: undefined,
    loadUser: true
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
            state['search'] = payload
        },
        setUser: (state, { payload }: PayloadAction<null | UserData>) => {
            state['user'] = payload
            state['loadUser'] = false
        }
    }
})
export const { setSearch, setUser } = AppAction.actions
export default AppAction.reducer