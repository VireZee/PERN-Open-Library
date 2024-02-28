import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Load from './Load';
import Net from '../errors/Internet';

const Home = () => {
    const [online, setOnline] = useState(navigator.onLine);
    const [load, setLoad] = useState(true);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const handleOnline = () => setOnline(navigator.onLine);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOnline);
        (async () => {
            try {
                if (online) {
                    setLoad(true);
                    const response = await axios.get(`https://openlibrary.org/search.json?title=harry+potter&page=${currentPage}`);
                    setBooks(response.data.docs);
                    setTotalPages(Math.ceil(response.data.numFound / 100));
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
    }, [currentPage, online]);
    const pageNumbers = () => {
        const pages = [];
        const addPages = (s, e) => {
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
        const handlePageClick = (page) => {
            if (page !== '...') setCurrentPage(page);
        };
        return (
            <>
                {pages.map((page, idx) => (
                    <span
                        key={idx}
                        onClick={() => handlePageClick(page)}
                        className={`cursor-pointer px-3 py-1 rounded-full ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {page}
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
                    ) : (
                        <Net />
                    )}
                </>
            )}
        </>
    );
};
export default Home;