import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: string | { old: boolean, new: boolean }
}
const initialState: State = {
    name: '',
    uname: '',
    email: '',
    oldPass: '',
    newPass: '',
    rePass: '',
    show: { old: false, new: false }
}
const SettingsAction = createSlice({
    name: 'SET',
    initialState,
    reducers: {
        change: (state, { payload: { name, value } }: PayloadAction<{ name: keyof State, value: string }>) => {
            state[name] = value
        },
        setShow: (state, { payload }: PayloadAction<{ old: boolean; new: boolean }>) => {
            state['show'] = payload
        }
    }
})
export const { change, setShow } = SettingsAction.actions
export default SettingsAction.reducer