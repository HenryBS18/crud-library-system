import { useState, useEffect } from "react";
import InputLabel from "./input/InputLabel";
import Modal from "./Modal";

const UpdateBook = () => {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const books = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
            method: 'GET'
        }).then(books => books.json());

        setBooks(books.payload);
    }

    const fetchBookByID = async (id) => {
        const book = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
            method: 'GET'
        }).then(res => res.json()).then(res => res.payload.book);

        setBook(book);
    }

    const updateBook = async (id, title, author, publisher, cover, quantity) => {
        const query = new URLSearchParams();

        query.append('title', title);
        query.append('author', author);
        query.append('publisher', publisher);
        query.append('cover', cover);
        query.append('availableQuantity', quantity);

        const result = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}/?${query.toString()}`, {
            method: 'PATCH'
        }).then(res => res.json());

        alert(result.message);
    }

    const handleUpdateBook = (e, id) => {
        e.preventDefault();

        const title = document.getElementById('inputTitle').value;
        const author = document.getElementById('inputAuthor').value;
        const publisher = document.getElementById('inputPublisher').value;
        const cover = document.getElementById('inputCover').value;
        const quantity = document.getElementById('inputQuantity').value;

        updateBook(id, title, author, publisher, cover, quantity);
    }

    const handleDeleteBook = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete?');

        if (confirm) {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
                method: 'DELETE'
            }).then(res => res.json()).catch(err => console.log(err.json()));

            fetchBooks();
            alert(response.message);
        }
    }

    return (
        <>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Update</th>
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
                                const { book_id, title } = book;

                                return (
                                    <tr key={book_id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{title}</td>
                                        <td>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 px-0 d-flex justify-content-center">
                                                        <button
                                                            className="btn btn-primary"
                                                            type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#updateBookModal"
                                                            onClick={() => fetchBookByID(book_id)}>Update
                                                        </button>
                                                    </div>
                                                    <div className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 px-0 d-flex justify-content-center">
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            onClick={() => handleDeleteBook(book_id)}>Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )
                    }
                </tbody>
            </table>

            {
                <Modal id='updateBookModal'>
                    <form onSubmit={(e) => handleUpdateBook(e, book.book_id)}>
                        <InputLabel type='text' id='inputTitle' value={book.title}>Title</InputLabel>
                        <InputLabel type='text' id='inputAuthor' value={book.author}>Author</InputLabel>
                        <InputLabel type='text' id='inputCover' value={book.cover}>Cover</InputLabel>
                        <InputLabel type='text' id='inputPublisher' value={book.publisher}>Publisher</InputLabel>
                        <InputLabel type='number' id='inputQuantity' value={book.available_quantity}>Quantity</InputLabel>

                        <div className="modal-footer pe-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary me-0">Save changes</button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    );
}

export default UpdateBook;