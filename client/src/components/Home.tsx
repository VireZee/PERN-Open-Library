import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOnline, setLoad, Books, setBooks, setCurrentPage, setTotalPages, setStatus } from './redux/HomeAction'
import { RootState } from './redux/Store'
import axios, { AxiosResponse, AxiosError } from 'axios'
import Load from './Load'
import Net from './errors/Internet'
import NB from './errors/NoBooks'

interface Props {
    search: string,
    isUser: {
        user_id: number
    } | null
}
interface URLParams {
    title?: string
    isbn?: string
    page?: string
}
const Home: React.FC<Props> = ({ search, isUser }) => {
    const dispatch = useDispatch()
    const homeState = useSelector((state: RootState) => state.HOME)
    const { title, isbn, page }: URLParams = Object.fromEntries(new URLSearchParams(window.location.search))
    const str = title || isbn
    const pg = Number(page) || 1
    const fetchStatus = async (isbn: string) => {
        if (isUser && isUser.user_id) {
            try {
                const res = await axios.get(`http://localhost:3001/API/fetch`, {
                    params: { user_id: isUser.user_id, isbn },
                    withCredentials: true
                })
                dispatch(setStatus(res.data))
            } catch (err) {
                const XR = err as AxiosError
                alert('Fetch Error: ' + XR)
            }
        }
    }
    const addToCollection = async (isbn: string) => {
        if (!isUser) {
            location.href = '/login'
        } else if (isUser.user_id) {
            try {
                await axios.post('http://localhost:3001/API/add', {
                    user_id: isUser.user_id,
                    isbn
                }, { withCredentials: true })
                fetchStatus(isbn)
            } catch (err) {
                const XR = err as AxiosError
                alert(XR)
            }
        }
    }
    React.useEffect(() => {
        console.log('Home.tsx =>', isUser)
        const handleOnline = () => dispatch(setOnline(navigator.onLine))
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOnline);
        (async () => {
            const fetchBooks = async () => {
                const type = /^\d{10}(\d{3})?$/.test(search ?? '') ? 'isbn' : 'title'
                const query = search ? search.split(' ').join('+') : 'harry+potter'
                const res = await axios.get(`https://openlibrary.org/search.json?${type}=${query}&page=${homeState.currentPage}`)
                booksData(res)
                dispatch(setLoad(false))
            }
            const booksData = (res: AxiosResponse) => {
                if (res.data.numFound === 0) {
                    dispatch(setBooks([]))
                } else {
                    dispatch(setBooks(res.data.docs))
                    dispatch(setTotalPages(Math.ceil(res.data.numFound / 100)))
                }
            }
            if (homeState.online) {
                dispatch(setLoad(true))
                if (search) {
                    dispatch(setCurrentPage(1))
                    await fetchBooks()
                } else {
                    const type = /^\d{10}(\d{3})?$/.test(str ?? '') ? 'isbn' : 'title'
                    const query = str ? str.split(' ').join('+') : 'harry+potter'
                    const response = await axios.get(`https://openlibrary.org/search.json?${type}=${query}&page=${pg}`)
                    booksData(response)
                    dispatch(setLoad(false))
                }

            }
            // if (isUser && isUser.user_id) {
            //     homeState.books.forEach((book: Books) => {
            //         if (book.isbn) {
            //             fetchStatus(book.isbn.find(isbn => isbn.length === 13) || book.isbn[0])
            //         }
            //     })
            // }
        })()
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOnline)
        }
    }, [homeState.online, homeState.book, search])
    const pageNumbers = () => {
        const pages = []
        const addPages = (s: number, e: number) => {
            for (let i = s; i <= e; i++) {
                pages.push(i)
            }
        }
        if (homeState.totalPages <= 9) {
            addPages(1, homeState.totalPages)
        } else {
            if (search || pg <= 6) {
                addPages(1, 7)
                pages.push('...', homeState.totalPages)
            } else if (pg <= homeState.totalPages - 4) {
                pages.push(1, '...')
                addPages(pg - 3, pg + 1)
                pages.push('...', homeState.totalPages)
            } else if (pg <= homeState.totalPages - 3) {
                pages.push(1, '...')
                addPages(pg - 3, pg + 1)
                pages.push(homeState.totalPages - 1, homeState.totalPages)
            } else if (pg <= homeState.totalPages - 2) {
                pages.push(1, '...')
                addPages(pg - 4, pg + 1)
                pages.push(homeState.totalPages)
            } else if (pg <= homeState.totalPages - 1) {
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
                        <a href={`s?${/^\d{10}(\d{3})?$/.test(search ?? '') ? 'isbn' : 'title'}=${search ? search.split(' ').join('+') : 'harry+potter'}&page=${homeState.currentPage}`}>
                            {page}
                        </a>
                    </span>
                ))}
            </>
        )
    }
    return (
        <>
            {homeState.load ? (
                <Load />
            ) : (
                <>
                    {homeState.online ? (
                        <>
                            {homeState.books.length === 0 ? (
                                <NB />
                            ) : (
                                <>
                                    <div className="mt-16 grid grid-cols-3">
                                        {homeState.books.map((book: Books, idx: number) => (
                                            <div key={idx} className="flex w-[600px] h-[320px] m-[20px] p-[10px] shadow-[0_0_20px_#000]">
                                                <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                                    alt={book.title}
                                                    className="w-[210px] h-[300px] border-solid border-2 border-[#808080]" />
                                                <div className="ml-4">
                                                    <h1 className="text-center font-black text-xl mb-5">{book.title}</h1>
                                                    <h2 className="text-sm mb-2">Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</h2>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={book.isbn ? homeState.status[book.isbn.find(isbn => isbn.length === 13) || book.isbn[0]] || false : false}
                                                            onChange={() => { if (book.isbn) addToCollection(book.isbn.find(isbn => isbn.length === 13) || book.isbn[0]) }}
                                                            disabled={!book.isbn}
                                                        />
                                                        <span>Add to Collection</span>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center">
                                        {pageNumbers()}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <Net />
                    )}
                </>
            )}
        </>
    )
}
export default Home