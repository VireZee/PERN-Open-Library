import { configureStore, Store } from '@reduxjs/toolkit'
import AA from './AppAction'
import NA from './NavbarAction'
import RA from './RegisterAction'
import LA from './LoginAction'
import BA from './BookAction'

const ReduxStore: Store = configureStore({
    reducer: {
        APP: AA,
        NAV: NA,
        REG: RA,
        LOG: LA,
        HOME: BA,
        COL: BA
    }
})
export type RootState = ReturnType<typeof ReduxStore.getState>
export default ReduxStore