import React, { useState } from 'react';
import axios from 'axios';

const Main = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 9;
    const [totalPages, setTotalPages] = useState(1);
    React.useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get(`https://openlibrary.org/search.json?title=harry+potter&page=${currentPage}`);
            setBooks(response.data.docs);
            setTotalPages(Math.ceil(response.data.numFound / booksPerPage));
        };
        fetchBooks();
    }, [currentPage]);
    const handlePageClick = (page) => {
        if (page === '...') {
            return;
        }
        setCurrentPage(page);
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxDisplayedPages = 7;
    
        if (totalPages <= maxDisplayedPages) {
          for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {
          const leftOffset = Math.floor(maxDisplayedPages / 2);
          const rightOffset = totalPages - leftOffset;
    
          if (currentPage <= leftOffset) {
            // Display pages 1 to maxDisplayedPages
            for (let i = 1; i <= maxDisplayedPages; i++) {
              pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
          } else if (currentPage >= rightOffset) {
            // Display totalPages - maxDisplayedPages + 1 to totalPages
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = totalPages - maxDisplayedPages + 1; i <= totalPages; i++) {
              pageNumbers.push(i);
            }
          } else {
            // Display currentPage - leftOffset + 1 to currentPage + rightOffset - 1
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = currentPage - leftOffset + 1; i <= currentPage + rightOffset - 1; i++) {
              pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
          }
        }
    
        return (
          <ul className="flex space-x-2 mt-4">
            {pageNumbers.map((number, index) => (
              <li
                key={index}
                className={`${
                  number === '...' || number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => handlePageClick(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        );
      };
    return (
        <div className="mt-16 grid grid-cols-3">
            {books.map(book => (
                <div className="flex w-[600px] h-[320px] m-[20px] p-[10px] shadow-[0_0_20px_#000]">
                    <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                        alt={book.title}
                        className=" w-[210px] h-[300px] border-solid border-2 border-[#808080]" />
                    <div className="ml-4">
                        <h1 className="text-center font-black text-xl mb-5">{book.title}</h1>
                        <h2 className="text-sm">Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</h2>
                        <h2 className="text-sm overflow-hidden overflow-ellipsis h-56">Subjects: {book.subject ? book.subject.join(', ') : 'Unknown'}</h2>
                    </div>
                </div>
            ))}
            {renderPageNumbers()}
        </div>
    );
}
export default Main;