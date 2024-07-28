import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: string | boolean
}
const initialState: State = {
    name: '',
    uname: '',
    email: '',
    pass: '',
    rePass: '',
    show: false
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
        }
    }
})
export const { change, setShow } = RegisterAction.actions
export default RegisterAction.reducer