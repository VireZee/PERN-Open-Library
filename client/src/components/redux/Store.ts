import { configureStore, Store } from '@reduxjs/toolkit'
import RA from './RegisterAction'
import HA from './HomeAction'

const ReduxStore:Store = configureStore({
    reducer: {
        REG: RA,
        HOME: HA
    }
})
export type RootState = ReturnType<typeof ReduxStore.getState>
export default ReduxStore