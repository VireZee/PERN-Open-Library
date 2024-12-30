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
    totalPages: 1,
    status: false
}
export interface Books {
    cover_i: number
    isbn: string[]
    title: string
    author_name: string[]
}
const HomeAction = createSlice({
    name: 'HOME',
    initialState,
    reducers: {
        setOnline: (state, action: PayloadAction<boolean>) => {
            state.online = action.payload
        },
        setLoad: (state, action: PayloadAction<boolean>) => {
            state.load = action.payload
        },
        setBooks: (state, action: PayloadAction<Books[]>) => {
            state.books = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
        setStatus: (state, action: PayloadAction<boolean>) => {
            state.status = action.payload
        }
    }
})
export const { setOnline, setLoad, setBooks, setCurrentPage, setTotalPages, setStatus } = HomeAction.actions
export default HomeAction.reducer