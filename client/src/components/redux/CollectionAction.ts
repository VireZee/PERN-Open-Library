import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    [key: string]: boolean | Books[] | number
    books: Books[]
}
const initialState: State = {
    online: navigator.onLine,
    load: false,
    books: [],
    currentPage: 1,
    totalPages: 1
}
export interface Books {
    cover_i: number
    isbn: string
    title: string
    author_name: string
}
const CollectionAction = createSlice({
    name: 'COL',
    initialState,
    reducers: {
        setOnline: (state, { payload }: PayloadAction<boolean>) => {
            state['online'] = payload
        },
        setLoad: (state, { payload }: PayloadAction<boolean>) => {
            state['load'] = payload
        },
        setBooks: (state, { payload }: PayloadAction<Books[]>) => {
            state['books'] = payload
        },
        setCurrentPage: (state, { payload }: PayloadAction<number>) => {
            state['currentPage'] = payload
        },
        setTotalPages: (state, { payload }: PayloadAction<number>) => {
            state['totalPages'] = payload
        }
    }
})
export const { setOnline, setLoad, setBooks, setCurrentPage, setTotalPages } = CollectionAction.actions
export default CollectionAction.reducer