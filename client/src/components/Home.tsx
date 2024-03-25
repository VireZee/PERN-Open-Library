import React from 'react';
import axios, { AxiosResponse } from 'axios';
import Load from './Load';
import Net from './errors/Internet';
import NB from './errors/NoBooks';

interface Props {
    search: string | undefined;
}
interface Books {
    cover_i: number;
    title: string;
    author_name: string[];
}
interface State {
    online: boolean;
    load: boolean;
    books: Books[];
    currentPage: number;
    totalPages: number;
}
type Action =
    | { type: 'SET_ONLINE'; payload: boolean }
    | { type: 'SET_LOAD'; payload: boolean }
    | { type: 'SET_BOOKS'; payload: Books[] }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_TOTAL_PAGES'; payload: number };
interface URLParams {
    title?: string;
    isbn?: string;
    page?: string;
}
const initialState: State = {
    online: navigator.onLine,
    load: true,
    books: [],
    currentPage: 1,
    totalPages: 1,
};
const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_ONLINE':
            return { ...state, online: action.payload };
        case 'SET_LOAD':
            return { ...state, load: action.payload };
        case 'SET_BOOKS':
            return { ...state, books: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_TOTAL_PAGES':
            return { ...state, totalPages: action.payload };
        default:
            return state;
    }
};
const Home: React.FC<Props> = ({ search }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { online, load, books, currentPage, totalPages } = state;
    const { title, isbn, page }: URLParams = Object.fromEntries(new URLSearchParams(window.location.search));
    const str = title || isbn;
    const pg = Number(page) || 1;
    React.useEffect(() => {
        const handleOnline = () => dispatch({ type: 'SET_ONLINE', payload: navigator.onLine });
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOnline);
        (async () => {
            const booksData = (res: AxiosResponse) => {
                if (res.data.numFound === 0) {
                    dispatch({ type: 'SET_BOOKS', payload: [] });
                } else {
                    dispatch({ type: 'SET_BOOKS', payload: res.data.docs });
                    dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(res.data.numFound / 100) });
                }
            };
            const fetch = async () => {
                const type = /^\d{10}(\d{3})?$/.test(search ?? '') ? 'isbn' : 'title';
                const query = search ? search.split(' ').join('+') : 'harry+potter';
                const response = await axios.get(`https://openlibrary.org/search.json?${type}=${query}&page=${currentPage}`);
                booksData(response);
            };
            try {
                switch (online) {
                    case true:
                        dispatch({ type: 'SET_LOAD', payload: true });
                        if ((title === null || isbn === null) && page === null) {
                            await fetch();
                        } else {
                            if (search) {
                                dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
                                await fetch();
                            } else {
                                const type = /^\d{10}(\d{3})?$/.test(str ?? '') ? 'isbn' : 'title';
                                const query = str ? str.split(' ').join('+') : 'harry+potter';
                                const response = await axios.get(`https://openlibrary.org/search.json?${type}=${query}&page=${pg}`);
                                booksData(response);
                            }
                        }
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.error(e);
            } finally {
                dispatch({ type: 'SET_LOAD', payload: false });
            }
        })();
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOnline);
        };
    }, [online, search]);
    const pageNumbers = () => {
        const pages = [];
        const addPages = (s: number, e: number) => {
            for (let i = s; i <= e; i++) {
                pages.push(i);
            }
        };
        if (totalPages <= 9) {
            addPages(1, totalPages);
        } else {
            if (pg <= 6) {
                addPages(1, 7);
                pages.push('...', totalPages);
            } else if (pg <= totalPages - 4) {
                pages.push(1, '...');
                addPages(pg - 3, pg + 1);
                pages.push('...', totalPages);
            } else if (pg <= totalPages - 3) {
                pages.push(1, '...');
                addPages(pg - 3, pg + 1);
                pages.push(totalPages - 1, totalPages);
            } else if (pg <= totalPages - 2) {
                pages.push(1, '...');
                addPages(pg - 4, pg + 1)
                pages.push(totalPages);
            } else if (pg <= totalPages - 1) {
                pages.push(1, '...');
                addPages(pg - 5, pg + 1);
            } else {
                pages.push(1, '...');
                addPages(pg - 6, pg)
            }
        }
        const handleClick = (page: any) => {
            switch (page) {
                case '...':
                    break;
                default:
                    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
                    break;
            }
        };
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
        );
    };
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
                                        {books.map((book, idx) => (
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
    );
};
export default Home;