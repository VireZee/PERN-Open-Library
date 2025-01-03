import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOnline, setLoad, Books, setBooks, setCurrentPage, setTotalPages } from './redux/BookAction'
import { RootState } from './redux/Store'
import axios, { AxiosResponse, AxiosError } from 'axios'

interface Props {
    search: string,
    isUser: {
        user_id: number
    } | null
}
const Collection: React.FC<Props> = ({ isUser, search }) => {
    const dispatch = useDispatch()
    const colState = useSelector((state: RootState) => state.BOOK)
    const pg = colState.currentPage
    const removeCollection = async (isbn: string) => {
        if (isUser && isUser.user_id) {
            try {
                await axios.post('http://localhost:3001/API/remove', {
                    user_id: isUser.user_id,
                    isbn
                }, { withCredentials: true })
            } catch (err) {
                const XR = err as AxiosError
                alert(XR)
            }
        }
    }
    React.useEffect(() => {
        const handleOnline = () => dispatch(setOnline(navigator.onLine))
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOnline)
        const fetchCollection = async () => {
            try {
                dispatch(setLoad(true))
                const query = search ? search.split(' ').join('+') : ''
                const res = await axios.get(search
                    ? `http://localhost:3001/API/collection/s?u=${isUser!.user_id}&t=${query}&p=${colState.currentPage}`
                    : `http://localhost:3001/API/collection/s?u=${isUser!.user_id}&p=${colState.currentPage}`, { withCredentials: true })
                collectionData(res)
            } catch (err) {
                const XR = err as AxiosError
                alert('Fetch Error: ' + XR)
            } finally {
                dispatch(setLoad(false))
            }
        };
        const collectionData = (res: AxiosResponse) => {
            if (res.data.numFound === 0) {
                dispatch(setBooks([]))
            } else {
                dispatch(setBooks(res.data.collection))
                dispatch(setTotalPages(Math.ceil(res.data.totalCollection / 100)))
            }
        }
        if (colState.online) {
            fetchCollection()
        }
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOnline)
        }
    }, [isUser, colState.online, search])
    const pageNumbers = () => {
        const pages = []
        const addPages = (s: number, e: number) => {
            for (let i = s; i <= e; i++) {
                pages.push(i)
            }
        }
        if (colState.totalPages <= 9) {
            addPages(1, colState.totalPages)
        } else {
            if (search || pg <= 6) {
                addPages(1, 7)
                pages.push('...', colState.totalPages)
            } else if (pg <= colState.totalPages - 4) {
                pages.push(1, '...')
                addPages(pg - 3, pg + 1)
                pages.push('...', colState.totalPages)
            } else if (pg <= colState.totalPages - 3) {
                pages.push(1, '...')
                addPages(pg - 3, pg + 1)
                pages.push(colState.totalPages - 1, colState.totalPages)
            } else if (pg <= colState.totalPages - 2) {
                pages.push(1, '...')
                addPages(pg - 4, pg + 1)
                pages.push(colState.totalPages)
            } else if (pg <= colState.totalPages - 1) {
                pages.push(1, '...')
                addPages(pg - 5, pg + 1)
            } else {
                pages.push(1, '...')
                addPages(pg - 6, pg)
            }
        }
        const handleClick = (page: any) => {
            if (page === '...') {
                return
            } else {
                dispatch(setCurrentPage(page))
            }
        }
        return (
            <>
                {pages.map((page, idx) => (
                    <span
                        key={idx}
                        onClick={() => handleClick(page)}
                        className={`cursor-pointer px-3 py-1 rounded-full ${page === (search ? 1 : pg) ? 'bg-blue-500 text-white' : ''}`}
                    >
                        <a href={`s?${/^\d{10}(\d{3})?$/.test(search ?? '') ? 'isbn' : 'title'}=${search ? search.split(' ').join('+') : 'harry+potter'}&page=${colState.currentPage}`}>
                            {page}
                        </a>
                    </span>
                ))}
            </>
        )
    }
    return (
        <div className="mt-16">
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">This is Collection</h1>
        </div>
    )
}
export default Collection