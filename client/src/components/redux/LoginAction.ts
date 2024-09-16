import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: string | boolean
}
const initialState: State = {
    emailOrUname: '',
    pass: '',
    show: false,
    error: ''
}
const LoginAction = createSlice({
    name: 'LOG',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<{ name: keyof State, value: string }>) => {
            state[action.payload.name] = action.payload.value
        },
        setShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})
export const { change, setShow, setError } = LoginAction.actions
export default LoginAction.reducer