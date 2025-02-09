import { configureStore, Store } from '@reduxjs/toolkit'
import AppAct from './AppAction'
import NavAct from './NavbarAction'
import RegAct from './RegisterAction'
import LogAct from './LoginAction'
import HomeAct from './HomeAction'
import ColAct from './CollectionAction'
import APIKeyAct from './APIKeyAction'
import SetAct from './SettingsAction'
import APIAct from './APIAction'

const ReduxStore: Store = configureStore({
    reducer: {
        APP: AppAct,
        NAV: NavAct,
        REG: RegAct,
        LOG: LogAct,
        HOME: HomeAct,
        COL: ColAct,
        APIK: APIKeyAct,
        SET: SetAct,
        API: APIAct
    }
})
export type RootState = ReturnType<typeof ReduxStore.getState>
export default ReduxStore