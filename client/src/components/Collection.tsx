import React from 'react'
import { useQuery, useMutation, ApolloQueryResult, ApolloError } from '@apollo/client'
import { FETCH, REMOVE } from './graphql/book/Collection'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/Store'
import { setOnline, setLoad, Books, setBooks, setCurrentPage, setTotalPages } from './redux/CollectionAction'
import Load from './Load'
import Net from './error/Internet'
import NB from './error/NoBooks'

interface Props {
    search: string
    isUser: {
        user_id: number
    }
}
interface URLParams {
    title?: string
    page?: string
}
const Collection: React.FC<Props> = ({ isUser, search }) => {
    const { refetch } = useQuery(FETCH, { skip: true })
    const [remove] = useMutation(REMOVE)
    const dispatch = useDispatch()
    const colState = useSelector((state: RootState) => state.COL)
    const { title, page }: URLParams = Object.fromEntries(new URLSearchParams(window.location.search))
    const pg = Number(page)
    const fetchCollection = async () => {
        try {
            dispatch(setLoad(true))
            const res = await refetch({
                user_id: isUser!.user_id,
                search: search || title,
                page: pg || colState.currentPage
            })
            collectionData(res)
        } catch (err) {
            if (err instanceof ApolloError) alert('Fetch Error: ' + err.message)
            else alert('Fetch Error: An unexpected error occurred.')
        } finally {
            dispatch(setLoad(false))
        }
    }
    const collectionData = (res: ApolloQueryResult<{ collection: { found: number; collection: { cover_i: string; isbn: string; title: string; author_name: string; __typename: string }[]; totalCollection: number } }>) => {
        const { found, collection, totalCollection } = res.data.collection
        if (found === 0) dispatch(setBooks([]))
        else {
            dispatch(setBooks(collection))
            dispatch(setTotalPages(Math.ceil(totalCollection / 9)))
        }
    }
    const removeCollection = async (isbn: string) => {
        try {
            const { data } = await remove({
                variables: {
                    user_id: isUser!.user_id,
                    isbn
                }
            })
            if (data.remove) fetchCollection()
        } catch (err) {
            if (err instanceof ApolloError) alert(err.message)
            else alert('An unexpected error occurred.')
        }
    }
    const pageNumbers = () => {
        const pages = []
        const addPages = (s: number, e: number) => {
            for (let i = s; i <= e; i++) pages.push(i)
        }
        const { totalPages } = colState
        if (totalPages <= 9) addPages(1, totalPages)
        else if (search || pg <= 6) {
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
        const handleClick = (page: number) => {
            if (typeof page === 'number') dispatch(setCurrentPage(page))
        }
        return (
            <>
                {pages.map((page, idx) => (
                    <span
                        key={idx}
                        onClick={() => handleClick(page)}
                        className={`cursor-pointer px-3 py-1 rounded-full ${page === (search ? 1 : pg) ? 'bg-blue-500 text-white' : ''}`}
                    >
                        <a href={`collection?${search ? `title=${search.split(' ').join('+')}&page=${colState.currentPage}` : `page=${colState.currentPage}`}`}>
                            {page}
                        </a>
                    </span >
                ))}
            </>
        )
    }
    React.useEffect(() => {
        const handleOnline = () => dispatch(setOnline(navigator.onLine))
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOnline)
        fetchCollection()
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOnline)
        }
    }, [colState.online, search])
    return (
        <>
            {colState.load ? (
                <Load />
            ) : (
                <>
                    {colState.online ? (
                        <>
                            {colState.books.length === 0 ? (
                                <NB />
                            ) : (
                                <>
                                    <div className="mt-16 grid grid-cols-3">
                                        {colState.books.map((book: Books, idx: number) => (
                                            <div key={idx} className="flex w-[600px] h-[320px] m-[20px] p-[10px] shadow-[0_0_20px_#000]">
                                                <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                                    alt={book.title}
                                                    className="w-[210px] h-[300px] border-solid border-2 border-[#808080]" />
                                                <div className="ml-4">
                                                    <h1 className="text-center font-black text-xl mb-5">{book.title}</h1>
                                                    <h2 className="text-sm mb-2">Author(s): {book.author_name}</h2>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={true}
                                                            onChange={() => { removeCollection(book.isbn as string) }}
                                                        />
                                                        <span>Added to Collection</span>
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
export default Collection