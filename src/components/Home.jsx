import React, { useState } from 'react';
import axios from 'axios';
import Load from './Load';

const Home = () => {
    const [load, setLoad] = useState(true);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 9;
    const [totalPages, setTotalPages] = useState(1);
    React.useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`https://openlibrary.org/search.json?title=harry+potter&page=${currentPage}`);
                setBooks(response.data.docs);
                setTotalPages(Math.ceil(response.data.numFound / booksPerPage));
            } catch (e) {
                console.error(e);
            } finally {
                setLoad(false);
            }
        };
        fetchBooks();
    }, [currentPage]);
    const renderPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 1; i <= 7; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        }
        return (
            <>
                {pages.map((page, index) => (
                    <span
                        key={index}
                        onClick={() => handlePageClick(page)}
                        className={`cursor-pointer px-3 py-1 rounded-full ${page === '...' ? 'text-gray-500' : page === currentPage ? 'bg-blue-500 text-white' : ''
                            }`}
                    >
                        {page}
                    </span>
                ))}
            </>
        );
    };
    const handlePageClick = (page) => {
        if (page === '...') {
            return;
        }
        const params = new URLSearchParams(window.location.search);

        params.set('page', page);
        window.history.replaceState({}, '', `${window.location.pathname}search?t=harry+potter&${params.toString()}`);
        setCurrentPage(page);
    };
    const startIdx = (currentPage - 1) * booksPerPage;
    const endIdx = startIdx + booksPerPage;
    return (
        <>
            {load ? (
                <Load />
            ) : (
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
                                    <h2 className="text-sm line-clamp-[11]">Subjects: {book.subject ? book.subject.join(', ') : 'Unknown'}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        {renderPageNumbers()}
                    </div>
                </>
            )
            }
        </>
    );
}
export default Home;