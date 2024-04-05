import { createSlice } from '@reduxjs/toolkit';

interface State {
    email: string;
    uname: string;
    name: string;
    pass: string;
    rePass: string;
    match: boolean;
    show: boolean;
}
const initialState: State = {
    email: '',
    uname: '',
    name: '',
    pass: '',
    rePass: '',
    match: true,
    show: false
}
// const RegisterSlice = createSlice({
//     name: 'register',
//     initialState,
//     reducers: {
//         change: (state, action: PayloadAction<{ name: string, value: string }>) => {
//             state[action.payload.name] = action.payload.value;
//         },
//         setRePass: (state, action: PayloadAction<string>) => {
//             state.rePass = action.payload;
//         },
//         setMatch: (state, action: PayloadAction<boolean>) => {
//             state.match = action.payload;
//         },
//         setShow: (state, action: PayloadAction<boolean>) => {
//             state.show = action.payload;
//         },
//     }
// });

const RegisterSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        change: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        setRePass: (state, action) => {
            state.rePass = action.payload;
        },
        setMatch: (state, action) => {
            state.match = action.payload;
        },
        setShow: (state, action) => {
            state.show = action.payload;
        }
    }
});
export const { change, setRePass, setMatch, setShow } = RegisterSlice.actions;