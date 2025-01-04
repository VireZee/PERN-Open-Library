import { configureStore, Store } from '@reduxjs/toolkit'
import AA from './AppAction'
import NA from './NavbarAction'
import RA from './RegisterAction'
import LA from './LoginAction'
import HA from './HomeAction'
import CA from './CollectionAction'

const ReduxStore: Store = configureStore({
    reducer: {
        APP: AA,
        NAV: NA,
        REG: RA,
        LOG: LA,
        HOME: HA,
        COL: CA
    }
})
export type RootState = ReturnType<typeof ReduxStore.getState>
export default ReduxStore