import React from 'react';
import axios from 'axios';

const Main = () => {
    const [books, setBooks] = React.useState([]);
    React.useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('https://openlibrary.org/search.json?title=harry+potter');
            setBooks(response.data.docs);
        };
        fetchBooks();
    }, []);
    return (
        <div className="mt-16 grid grid-cols-3">
            {books.map(book => (
                <div className="flex w-[600px] h-[320px] m-[20px] p-[10px] shadow-[0_0_20px_#000]">
                    <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt={book.title} className=" w-[210px] h-[300px] border-solid border-2 border-[#808080]" />
                    <div className="ml-4">
                        <h1 className="text-center font-black text-xl mb-5">{book.title}</h1>
                        <h2 className="text-sm">Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Main;