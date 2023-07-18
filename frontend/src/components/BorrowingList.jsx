import { useState, useEffect } from "react";

const BorrowingList = () => {
    const [user, setUser] = useState({});
    const [borrowingList, setBorrowingList] = useState([]);
    const [bookTitles, setBookTitles] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);

        fetchBorrowingList(user.id);
    }, []);

    useEffect(() => {
        const getTitles = async () => {
            const bookIDs = borrowingList.map(borrow => borrow.book_id);

            const fetchBookByID = async (id) => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`).then(res => res.json());
                return response.payload.book.title;
            };

            const fetchAllBookTitles = Promise.all(bookIDs.map(fetchBookByID));
            const bookTitlesResult = await fetchAllBookTitles;

            const bookTitlesMap = bookIDs.reduce((acc, id, index) => {
                acc[id] = bookTitlesResult[index];
                return acc;
            }, {});

            setBookTitles(bookTitlesMap);
        }

        if (borrowingList.length > 0) {
            getTitles();
        }
    }, [borrowingList]);


    const fetchBorrowingList = async (userID) => {
        const borrowingList = await fetch(`${process.env.REACT_APP_API_URL}/borrows/user/${userID}`).then(res => res.json()).then(res => res.payload.borrows);
        const filteredBorrowingList = borrowingList.filter(borrow => borrow.actual_return_date === null);
        setBorrowingList(filteredBorrowingList);
    }

    const handleReturnBook = async (borrowID) => {
        const confirm = window.confirm(`Are you sure you want to return the book?`);

        const query = new URLSearchParams();
        query.append('actualReturnDate', todayDate());

        if (confirm) {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/borrows/${borrowID}?${query}`, {
                method: 'PATCH'
            }).then(res => res.json());

            fetchBorrowingList(user.id);
            alert(response.message);
        }
    }

    const todayDate = () => {
        const date = new Date();

        const day = date.getDay();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Borrow Date</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Return Book</th>
                </tr>
            </thead>
            <tbody>
                {
                    borrowingList.length < 1 ? (
                        <tr>
                            <td colSpan="7" className="text-center">You're not borrowing any book</td>
                        </tr>
                    ) : (
                        borrowingList.map((borrow) => {
                            const { borrow_id, book_id, book_quantity, borrow_date, return_date } = borrow;

                            return (
                                <tr key={borrow_id}>
                                    <th scope="row">{borrow_id}</th>
                                    <td>{bookTitles[book_id] || ''}</td>
                                    <td>{book_quantity}</td>
                                    <td>{borrow_date}</td>
                                    <td>{return_date}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => handleReturnBook(borrow_id)}
                                        >Return
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )
                }
            </tbody>
        </table >
    );
}

export default BorrowingList;
