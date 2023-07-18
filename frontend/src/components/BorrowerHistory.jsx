import { useState, useEffect } from "react";

const BorrowerHistory = () => {
    const [borrowers, setBorrowers] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [bookTitles, setBookTitles] = useState({});

    useEffect(() => {
        const fetchBorrowers = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/borrows`);
            const data = await response.json();
            const borrowers = data.payload.filter(borrow => borrow.actual_return_date !== null);

            setBorrowers(borrowers);
        };
        fetchBorrowers();
    }, []);

    useEffect(() => {
        const fetchUserNamesAndBookTitles = async () => {
            const userIDs = borrowers.map(borrower => borrower.user_id);
            const bookIDs = borrowers.map(borrower => borrower.book_id);

            const fetchUserByID = async (id) => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`).then(res => res.json());
                return response.payload.user.name;
            };

            const fetchBookByID = async (id) => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`).then(res => res.json());
                return response.payload.book.title;
            };

            const fetchAllUserNames = Promise.all(userIDs.map(fetchUserByID));
            const fetchAllBookTitles = Promise.all(bookIDs.map(fetchBookByID));

            const userNamesResult = await fetchAllUserNames;
            const bookTitlesResult = await fetchAllBookTitles;

            const userNamesMap = userIDs.reduce((acc, id, index) => {
                acc[id] = userNamesResult[index];
                return acc;
            }, {});

            const bookTitlesMap = bookIDs.reduce((acc, id, index) => {
                acc[id] = bookTitlesResult[index];
                return acc;
            }, {});

            setUserNames(userNamesMap);
            setBookTitles(bookTitlesMap);
        };

        if (borrowers.length > 0) {
            fetchUserNamesAndBookTitles();
        }
    }, [borrowers]);

    const dateFormatter = (date) => {
        const [borrowYear, borrowMonth, borrowDay] = date.split('-');
        return `${borrowDay}-${borrowMonth}-${borrowYear}`;
    }

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Borrower Name</th>
                    <th scope="col">Book Title</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Borrow Date</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Actual Return Date</th>
                </tr>
            </thead>
            <tbody>
                {borrowers.length === 0 ? (
                    <tr>
                        <td colSpan="8" className="text-center">No Borrower</td>
                    </tr>
                ) : (
                    borrowers.map((borrower, i) => {
                        const { borrow_id, user_id, book_id, book_quantity, borrow_date, return_date, actual_return_date } = borrower;

                        const userName = userNames[user_id] || '';
                        const bookTitle = bookTitles[book_id] || '';

                        return (
                            <tr key={borrow_id}>
                                <td>{borrow_id}</td>
                                <td>{userName}</td>
                                <td>{bookTitle}</td>
                                <td>{book_quantity}</td>
                                <td>{dateFormatter(borrow_date)}</td>
                                <td>{dateFormatter(return_date)}</td>
                                <td>{dateFormatter(actual_return_date)}</td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
};

export default BorrowerHistory;
