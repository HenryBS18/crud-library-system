import { useState, useEffect } from "react";

const BookListAdmin = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await fetch(`${process.env.REACT_APP_API_URL}/books`).then(books => books.json());
            setBooks(books.payload);
        }
        fetchBooks();
    }, []);

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Cover</th>
                    <th scope="col">Available</th>
                    <th scope="col">Borrowed</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.length < 1 ? (
                        <tr>
                            <td colSpan="7" className="text-center">No books available</td>
                        </tr>
                    ) : (
                        books.map((book, i) => {
                            const { book_id, title, author, publisher, cover, 
                                available_quantity, borrowed_quantity } = book;

                            return (
                                <tr key={book_id}>
                                    <th scope="row">{book_id}</th>
                                    <td>{title}</td>
                                    <td>{author}</td>
                                    <td>{publisher}</td>
                                    <td>{cover}</td>
                                    <td>{available_quantity}</td>
                                    <td>{borrowed_quantity}</td>
                                </tr>
                            );
                        })
                    )
                }
            </tbody>
        </table>
    );
}

export default BookListAdmin;