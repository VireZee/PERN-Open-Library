import React from 'react';
import axios from 'axios';

const Main = () => {
    const [randomBooks, setRandomBooks] = React.useState([]);
    React.useEffect(() => {
        const fetchRandomBooks = async () => {
            try {
                const response = await axios.get('https://openlibrary.org/search.json?q=harry+potter');
                setRandomBooks(response.data.entries);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRandomBooks();
    }, []);
    return (
        <div></div>
    );
}
export default Main;