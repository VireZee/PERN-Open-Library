import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    online: boolean
    load: boolean
    books: Books[]
    currentPage: number
    totalPages: number
}
const initialState: State = {
    online: navigator.onLine,
    load: true,
    books: [],
    currentPage: 1,
    totalPages: 1
}
export interface Books {
    cover_i: number
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
        }
    }
})
export const { setOnline, setLoad, setBooks, setCurrentPage, setTotalPages } = HomeAction.actions
export default HomeAction.reducer