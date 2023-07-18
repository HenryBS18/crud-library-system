import { useState, useEffect } from "react";

const BorrowedHistory = () => {
    const [borrowingList, setBorrowingList] = useState([]);
    const [bookTitles, setBookTitles] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        const fetchBorrowingList = async (userID) => {
            const borrowingList = await fetch(`${process.env.REACT_APP_API_URL}/borrows/user/${userID}`).then(res => res.json()).then(res => res.payload.borrows);
            const filteredBorrowingList = borrowingList.filter(borrow => borrow.actual_return_date !== null);

            setBorrowingList(filteredBorrowingList);
        }
        fetchBorrowingList(user.id)
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

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Borrow Date</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Actual Return Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    borrowingList.length < 1 ? (
                        <tr>
                            <td colSpan="7" className="text-center">No History</td>
                        </tr>
                    ) : (
                        borrowingList.map((borrow) => {
                            const { borrow_id, book_id, book_quantity, borrow_date, return_date, actual_return_date} = borrow;

                            return (
                                <tr key={borrow_id}>
                                    <th scope="row">{borrow_id}</th>
                                    <td>{bookTitles[book_id] || ''}</td>
                                    <td>{book_quantity}</td>
                                    <td>{borrow_date}</td>
                                    <td>{return_date}</td>
                                    <td>{actual_return_date}</td>
                                </tr>
                            );
                        })
                    )
                }
            </tbody>
        </table >
    );
}

export default BorrowedHistory;