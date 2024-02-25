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
        const handleOnline = () => {
            setOnline(navigator.onLine);
        };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOnline);
        (async () => {
            try {
                if (online) {
                    setLoad(true);
                    const cachedData = localStorage.getItem('');
                    if (cachedData) {
                        const parsedData = JSON.parse(cachedData);
                        setBooks(parsedData.docs);
                        setTotalPages(Math.ceil(parsedData.numFound / 100));
                    } else {
                        const response = await axios.get(`https://openlibrary.org/search.json?title=harry+potter&page=${currentPage}`);
                        setBooks(response.data.docs);
                        setTotalPages(Math.ceil(response.data.numFound / 100));
                        localStorage.setItem('', JSON.stringify(response.data));
                    }
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
        if (totalPages <= 9) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else if (totalPages >= 10 && currentPage <= 6) {
            for (let i = 1; i <= 7; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        } else if (totalPages >= 10 && currentPage >= 7 && currentPage <= totalPages - 4) {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage - 3; i <= currentPage + 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        } else if (totalPages >= 10 && currentPage >= 7 && currentPage <= totalPages - 3) {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage - 3; i <= currentPage + 1; i++) {
                pages.push(i);
            }
            pages.push(totalPages - 1);
            pages.push(totalPages);
        } else if (totalPages >= 10 && currentPage >= 7 && currentPage <= totalPages - 2) {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage - 4; i <= currentPage + 1; i++) {
                pages.push(i);
            }
            pages.push(totalPages);
        } else if (totalPages >= 10 && currentPage >= 7 && currentPage <= totalPages - 1) {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage - 5; i <= currentPage + 1; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage - 6; i <= currentPage; i++) {
                pages.push(i);
            }
        }
        const handlePageClick = (page) => {
            if (page === '...') {
                return;
            }
            setCurrentPage(page);
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
    const startIdx = (currentPage - 1) * 100;
    const endIdx = startIdx + 100;
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