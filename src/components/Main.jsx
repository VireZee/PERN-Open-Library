import React from 'react';
import axios from 'axios';

const Main = () => {
    const [books, setBooks] = React.useState([]);
    React.useEffect(() => {
        const fetchBooksBySearch = async () => {
            const response = await axios.get('https://openlibrary.org/search.json?title=harry+potter');
            setBooks(response.data.docs);
        };
        fetchBooksBySearch();
    }, []);
    return (
        <div className="mt-16 grid grid-cols-7">
            {books.map(book => (
                <div className="inline-block w-[230px] h-[390px] m-[20px] p-[10px] shadow-[0_0_20px_#000]">
                    {book.isbn && book.isbn[0] && (
                        <img src={`http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`} alt={book.title} className="border-solid border-2 border-[#808080]" />
                    )}
                </div>
            ))}
        </div>
    );
}
export default Main;