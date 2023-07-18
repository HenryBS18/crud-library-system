import { useState, useEffect } from "react";
import Modal from "./Modal";
import InputLabel from "./input/InputLabel";
import InputDate from "./input/InputDate";

const BookListUser = () => {
    const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchUser();
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const books = await fetch(`${process.env.REACT_APP_API_URL}/books`).then(books => books.json());
        setBooks(books.payload);
    }

    const fetchUser = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }

    const fetchBook = async (id) => {
        const book = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
            method: 'GET'
        }).then(res => res.json()).then(res => res.payload.book);

        setBook(book);
    }

    const handleBorrowBook = async (e) => {
        e.preventDefault();

        const quantity = document.getElementById('inputQuantity').value;
        const returnDate = document.getElementById('inputReturnDate').value;

        borrowBook(user.id, book.book_id, quantity, returnDate);
    }

    const borrowBook = async (userID, bookID, quantity, returnDate) => {
        const query = new URLSearchParams();
        query.append('userID', userID);
        query.append('bookID', bookID);
        query.append('quantity', quantity);
        query.append('returnDate', returnDate);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/borrows/add?${query.toString()}`, {
            method: 'POST'
        }).then(res => res.json());

        fetchBooks();
        alert(response.message);
    }

    const handleQuantityChanges = (e) => {
        setQuantity(e.target.value);
    }

    return (
        <>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Publisher</th>
                        <th scope="col">Cover</th>
                        <th scope="col">Available</th>
                        <th scope="col">Borrow</th>
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
                                const { book_id, title, author, publisher,
                                    cover, available_quantity } = book;

                                return (
                                    <tr key={book_id}>
                                        <th scope="row">{book_id}</th>
                                        <td>{title}</td>
                                        <td>{author}</td>
                                        <td>{publisher}</td>
                                        <td>{cover}</td>
                                        <td>{available_quantity}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#borrowBookModal"
                                                onClick={() => fetchBook(book_id)}>Borrow
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )
                    }
                </tbody>
            </table >

            {
                <Modal id='borrowBookModal' >
                    <form onSubmit={handleBorrowBook} onChange={handleQuantityChanges}>
                        <InputLabel type='text' id='inputTitle' value={book.title}>Title</InputLabel>
                        <InputLabel type='number' id='inputQuantity' value={quantity}>Quantity</InputLabel>
                        <InputDate id='inputReturnDate'>Return Date</InputDate>
                        <div className="modal-footer pe-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary me-0">Borrow</button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    );
}

export default BookListUser;