import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/menu/Menu";
import MenuItem from "../components/menu/MenuItem";
import BookListUser from "../components/BookListUser";
import BorrowingList from "../components/BorrowingList";
import BorrowedHistory from "../components/BorrowedHistory";

const UserPage = () => {
    const [user, setUser] = useState({});
    const [selectedMenu, setSelectedMenu] = useState('BookList');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        setSelectedMenu('BookList');
        if (user) {
            setUser(user);
            return;
        }

        window.location.replace('/login');
    }, []);

    const handleSelectMenu = (e) => {
        const id = e.target.id;
        setSelectedMenu(id);
    }

    const renderSelectedMenu = () => {
        const menuComponents = {
            BookList: <BookListUser />,
            BorrowingList: <BorrowingList />,
            BorrowedHistory: <BorrowedHistory />
        };

        return menuComponents[selectedMenu];
    }

    return (
        <>
            <Navbar name={user.name} />
            <div className="container mt-2">
                <div className="row">
                    <div className="col text-center px-0">
                        <h1>User</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <Menu>
                            <MenuItem id='BookList' name='Book List' color='danger' handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
                            <MenuItem id='BorrowingList' name='Borrowing List' color='success' handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
                            <MenuItem id='BorrowedHistory' name='History' color='primary' handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
                        </Menu>
                    </div>
                </div>
                <div className="row border">
                    <div className="col pt-2 overflow-x-scroll">
                        {renderSelectedMenu()}
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ height: '200px' }}>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserPage;