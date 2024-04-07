import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    [key: string]: string | boolean;
    name: string;
    uname: string;
    email: string;
    pass: string;
    rePass: string;
    match: boolean;
    show: boolean;
}
const initialState: State = {
    name: '',
    uname: '',
    email: '',
    pass: '',
    rePass: '',
    match: true,
    show: false
}
const RegisterAction = createSlice({
    name: 'REG',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<{ name: string, value: string }>) => {
            state[action.payload.name] = action.payload.value;
        },
        setRePass: (state, action: PayloadAction<string>) => {
            state.rePass = action.payload;
        },
        setMatch: (state, action: PayloadAction<boolean>) => {
            state.match = action.payload;
        },
        setShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload;
        }
    }
});
export const { change, setRePass, setMatch, setShow } = RegisterAction.actions;
export default RegisterAction.reducer;