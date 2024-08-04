import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: string | boolean | Errors
}
const initialState: State = {
    name: '',
    uname: '',
    email: '',
    pass: '',
    rePass: '',
    show: false,
    errors: {}
}
export interface Errors {
    name?: string
    uname?: string
    email?: string
    pass?: string
    rePass?: string
}
const RegisterAction = createSlice({
    name: 'REG',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<{ name: keyof State, value: string }>) => {
            state[action.payload.name] = action.payload.value
        },
        setShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload
        },
        setErrors: (state, action: PayloadAction<Errors>) => {
            state.errors = action.payload
        }
    }
})
export const { change, setShow, setErrors } = RegisterAction.actions
export default RegisterAction.reducer