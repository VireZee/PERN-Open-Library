import { configureStore } from '@reduxjs/toolkit';
import Reg from './RegisterAction';

const Store = configureStore({
    reducer: {
        REG: Reg
    },
})
export type RootState = ReturnType<typeof Store.getState>;
export default Store;