import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOnline, setLoad, Books, setBooks, setCurrentPage, setTotalPages } from './redux/HomeAction'
import { RootState } from './redux/Store'
import axios, { AxiosResponse } from 'axios'
import Load from './Load'
import Net from './errors/Internet'
import NB from './errors/NoBooks'

interface Props {
    search: string
}
interface URLParams {
    title?: string
    isbn?: string
    page?: string
}
const Home: React.FC<Props> = ({ search }) => {
    const dispatch = useDispatch()
    const { online, load, books, currentPage, totalPages } = useSelector((state: RootState) => state.HOME)
    const { title, isbn, page }: URLParams = Object.fromEntries(new URLSearchParams(window.location.search))
    const str = title || isbn
    const pg = Number(page) || 1
    React.useEffect(() => {
        const handleOnline = () => dispatch(setOnline(navigator.onLine))
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOnline);
        (async () => {
            const booksData = (res: AxiosResponse) => {
                if (res.data.numFound === 0) {
                    dispatch(setBooks([]))
                } else {
                    dispatch(setBooks(res.data.docs))
                    dispatch(setTotalPages(Math.ceil(res.data.numFound / 100)))
                }
            }
            const fetch = async () => {
                const type = /^\d{10}(\d{3})?$/.test(search ?? '') ? 'isbn' : 'title'
                const query = search ? search.split(' ').join('+') : 'harry+potter'
                const response = await axios.get(`https://openlibrary.org/search.json?${type}=${query}&page=${currentPage}`)
                booksData(response)
                dispatch(setLoad(false))
            }
            switch (online) {
                case true:
                    dispatch(setLoad(true))
                    if ((title === null || isbn === null) && page === null) {
                        await fetch()
                    } else {
                        if (search) {
                            dispatch(setCurrentPage(1))
                            await fetch()
                        } else {
                            const type = /^\d{10}(\d{3})?$/.test(str ?? '') ? 'isbn' : 'title'
                            const query = str ? str.split(' ').join('+') : 'harry+potter'
                            const response = await axios.get(`https://openlibrary.org/search.json?${type}=${query}&page=${pg}`)
                            booksData(response)
                            dispatch(setLoad(false))
                        }
                    }
                    break
                default:
                    dispatch(setLoad(false))
            }
        })()
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOnline)
        }
    }, [online, search])
    const pageNumbers = () => {
        const pages = []
        const addPages = (s: number, e: number) => {
            for (let i = s; i <= e; i++) {
                pages.push(i)
            }
        }
        if (totalPages <= 9) {
            addPages(1, totalPages)
        } else {
            if (search || pg <= 6) {
                addPages(1, 7)
                pages.push('...', totalPages)
            } else if (pg <= totalPages - 4) {
                pages.push(1, '...')
                addPages(pg - 3, pg + 1)
                pages.push('...', totalPages)
            } else if (pg <= totalPages - 3) {
                pages.push(1, '...')
                addPages(pg - 3, pg + 1)
                pages.push(totalPages - 1, totalPages)
            } else if (pg <= totalPages - 2) {
                pages.push(1, '...')
                addPages(pg - 4, pg + 1)
                pages.push(totalPages)
            } else if (pg <= totalPages - 1) {
                pages.push(1, '...')
                addPages(pg - 5, pg + 1)
            } else {
                pages.push(1, '...')
                addPages(pg - 6, pg)
            }
        }
        const handleClick = (page: any) => {
            switch (page) {
                case '...':
                    break
                default:
                    dispatch(setCurrentPage(page))
                    break
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
                        <a href={`s?${/^\d{10}(\d{3})?$/.test(search ?? '') ? 'isbn' : 'title'}=${search ? search.split(' ').join('+') : 'harry+potter'}&page=${currentPage}`}>
                            {page}
                        </a>
                    </span>
                ))}
            </>
        )
    }
    return (
        <>
            {load ? (
                <Load />
            ) : (
                <>
                    {online ? (
                        <>
                            {books.length === 0 ? (
                                <NB />
                            ) : (
                                <>
                                    <div className="mt-16 grid grid-cols-3">
                                        {books.map((book: Books, idx: number) => (
                                            <div key={idx} className="flex w-[600px] h-[320px] m-[20px] p-[10px] shadow-[0_0_20px_#000]">
                                                <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                                    alt={book.title}
                                                    className="w-[210px] h-[300px] border-solid border-2 border-[#808080]" />
                                                <div className="ml-4">
                                                    <h1 className="text-center font-black text-xl mb-5">{book.title}</h1>
                                                    <h2 className="text-sm mb-2">Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</h2>
                                                    <label className="flex items-center space-x-2">
                                                        <input type="checkbox" />
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