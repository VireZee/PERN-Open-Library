import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: string | boolean
}
const initialState: State = {
    active: 'home',
    isDropdownOpen: false
}
const NavbarAction = createSlice({
    name: 'NAV',
    initialState,
    reducers: {
        setActive: (state, action: PayloadAction<string>) => {
            state.active = action.payload
        },
        setIsDropdownOpen: (state, action: PayloadAction<boolean>) => {
            state.isDropdownOpen = action.payload
        }
    }
})
export const { setActive, setIsDropdownOpen } = NavbarAction.actions
export default NavbarAction.reducer