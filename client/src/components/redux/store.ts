import { configureStore } from '@reduxjs/toolkit';
import RA from './RegisterAction';
import HA from './HomeAction';

const Store = configureStore({
    reducer: {
        REG: RA,
        HOME: HA
    },
})
export type RootState = ReturnType<typeof Store.getState>;
export default Store;