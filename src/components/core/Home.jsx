import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Load from './Load';
import Net from '../errors/Internet';

const Home = () => {
    const [load, setLoad] = useState(true);
    const booksPerPage = 9;
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [online, setOnline] = useState(navigator.onLine);
    useEffect(() => {
        const handleOnline = () => {
            setOnline(navigator.onLine);
        };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOnline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOnline);
        };
    }, []);
    useEffect(() => {
        (async () => {
            try {
                if (online) {
                    setLoad(true);
                    const cachedData = localStorage.getItem('search');
                    if (cachedData) {
                        const parsedData = JSON.parse(cachedData);
                        setBooks(parsedData.docs);
                        setTotalPages(Math.ceil(parsedData.numFound / booksPerPage));
                    } else {
                        const response = await axios.get(`https://openlibrary.org/search.json?title=harry+potter&page=${currentPage}`);
                        setBooks(response.data.docs);
                        setTotalPages(Math.ceil(response.data.numFound / booksPerPage));
                        localStorage.setItem('search', JSON.stringify(response.data));
                    }
                }
            } finally {
                setLoad(false);
            }
        })();
    }, [currentPage, online]);
    const renderPageNumbers = () => {
        const pages = totalPages <= 7 ? Array.from({ length: totalPages }, (_, i) => i + 1) : [1, 2, 3, 4, 5, 6, 7, '...', totalPages];
        return (
            <>
                {pages.map((page, index) => (
                    <span
                        key={index}
                        onClick={() => handlePageClick(page)}
                        className={`cursor-pointer px-3 py-1 rounded-full ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {page}
                    </span>
                ))}
            </>
        );
    };
    const handlePageClick = (page) => {
        if (page === '...') {
            setCurrentPage(page);
        }
    };
    const startIdx = (currentPage - 1) * booksPerPage;
    const endIdx = startIdx + booksPerPage;
    return (
        <>
            {load ? (
                <Load />
            ) : (
                <>
                    {online ? (
                        <>
                            <div className="mt-16 grid grid-cols-3">
                                {books.slice(startIdx, endIdx).map(book => (
                                    <div className="flex w-[600px] h-[320px] m-[20px] p-[10px] shadow-[0_0_20px_#000]">
                                        <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                            alt={book.title}
                                            className="w-[210px] h-[300px] border-solid border-2 border-[#808080]" />
                                        <div className="ml-4">
                                            <h1 className="text-center font-black text-xl mb-5">{book.title}</h1>
                                            <h2 className="text-sm mb-2">Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center">
                                {renderPageNumbers()}
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