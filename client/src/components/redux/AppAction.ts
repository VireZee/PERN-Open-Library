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
        setSearch: () => { },
        setAuth: () => { }
    }
})
export const { setSearch, setAuth } = HomeAction.actions
export default HomeAction.reducer