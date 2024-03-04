import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Load from './Load';
import Net from './errors/Internet';
import NB from './errors/NoBooks';

interface Props {
    change: boolean;
    search: string | undefined;
}
interface Books {
    cover_i: number;
    title: string;
    author_name: string[];
}
const Home: React.FC<Props> = ({ change, search }) => {
    const [online, setOnline] = useState<boolean>(navigator.onLine);
    const [load, setLoad] = useState<boolean>(true);
    const [books, setBooks] = useState<Books[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const urlParams = React.useMemo(() => new URLSearchParams(window.location.search), []);
    const str = urlParams.get('title') || urlParams.get('isbn');
    const pg = urlParams.get('page');
    useEffect(() => {
        const handleOnline = () => setOnline(navigator.onLine);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOnline);
        (async () => {
            const booksData = (res: AxiosResponse) => {
                if (res.data.numFound === 0) {
                    setBooks([]);
                } else {
                    setBooks(res.data.docs);
                    setTotalPages(Math.ceil(res.data.numFound / 100));
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
                        setLoad(true);
                        if (urlParams.toString() === '') {
                            switch (change) {
                                case true:
                                    setCurrentPage(1);
                                    break;
                                default:
                                    break;
                            }
                            await fetch();
                        } else {
                            if (change) {
                                setCurrentPage(1);
                                await fetch();
                            } else {
                                const type = /^\d{10}(\d{3})?$/.test(str ?? '') ? 'isbn' : 'title';
                                const response = await axios.get(`https://openlibrary.org/search.json?${type}=${str}&page=${pg}`);
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
                setLoad(false);
            }
        })();
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOnline);
        };
    }, [online, currentPage, change, search, urlParams, str, pg]);
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
            if (currentPage <= 6) {
                addPages(1, 7);
                pages.push('...', totalPages);
            } else if (currentPage <= totalPages - 4) {
                pages.push(1, '...');
                addPages(currentPage - 3, currentPage + 1);
                pages.push('...', totalPages);
            } else if (currentPage <= totalPages - 3) {
                pages.push(1, '...');
                addPages(currentPage - 3, currentPage + 1);
                pages.push(totalPages - 1, totalPages);
            } else if (currentPage <= totalPages - 2) {
                pages.push(1, '...');
                addPages(currentPage - 4, currentPage + 1)
                pages.push(totalPages);
            } else if (currentPage <= totalPages - 1) {
                pages.push(1, '...');
                addPages(currentPage - 5, currentPage + 1);
            } else {
                pages.push(1, '...');
                addPages(currentPage - 6, currentPage)
            }
        }
        const handleClick = (page: any) => {
            switch (page) {
                case '...':
                    break;
                default:
                    setCurrentPage(page);
                    break;
            }
        };
        return (
            <>
                {pages.map((page, idx) => (
                    <span
                        key={idx}
                        onClick={() => handleClick(page)}
                        className={`cursor-pointer px-3 py-1 rounded-full ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                    >
                        <a href={`s?${/^\d{10}(\d{3})?$/.test(search ?? '') ? 'isbn' : 'title'}=${search ? search.split(' ').join('+') : 'harry+potter'}&page=${page}`}>
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