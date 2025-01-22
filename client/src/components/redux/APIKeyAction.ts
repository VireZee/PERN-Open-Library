import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: boolean | undefined | string | null
}
const initialState: State = {
    online: navigator.onLine,
    apiKey: undefined
}
const APIKeyAction = createSlice({
    name: 'APIK',
    initialState,
    reducers: {
        setOnline: (state, { payload }: PayloadAction<boolean>) => {
            state['online'] = payload
        },
        setApiKey: (state, { payload }: PayloadAction<string | null>) => {
            state['apiKey'] = payload
        }
    }
})
export const { setOnline, setApiKey } = APIKeyAction.actions
export default APIKeyAction.reducer