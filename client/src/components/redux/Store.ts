import { configureStore, Store } from '@reduxjs/toolkit'
import NA from './NavbarAction'
import AA from './AppAction'
import RA from './RegisterAction'
import LA from './LoginAction'
import HA from './HomeAction'

const ReduxStore: Store = configureStore({
    reducer: {
        NAV: NA,
        APP: AA,
        REG: RA,
        LOG: LA,
        HOME: HA
    }
})
export type RootState = ReturnType<typeof ReduxStore.getState>
export default ReduxStore