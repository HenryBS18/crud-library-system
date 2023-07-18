import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/menu/Menu";
import MenuItem from "../components/menu/MenuItem";
import BookListAdmin from "../components/BookListAdmin";
import AddBook from "../components/AddBook";
import UpdateBook from "../components/UpdateBook";
import BorrowerList from "../components/BorrowerList";
import BorrowerHistory from "../components/BorrowerHistory";

const AdminPage = () => {
    const [user, setUser] = useState({});
    const [selectedMenu, setSelectedMenu] = useState('BookList');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setUser(user);
            return;
        }

        window.location.replace('/login');
    }, []);

    const handleSelectMenu = (e) => {
        const id = e.target.id;
        setSelectedMenu(id);
    };

    const renderSelectedMenu = () => {
        const menuComponents = {
            BookList: <BookListAdmin />,
            AddBook: <AddBook />,
            UpdateBook: <UpdateBook />,
            ListBorrower: <BorrowerList />,
            History: <BorrowerHistory />,
        };

        return menuComponents[selectedMenu];
    }

    return (
        <>
            <Navbar name={user.name} />
            <div className="container mt-2">
                <div className="row">
                    <div className="col text-center px-0">
                        <h1>Admin</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <Menu>
                            <MenuItem id='BookList' name='Book List' color='danger' handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
                            <MenuItem id='AddBook' name='Add Book' color='success' handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
                            <MenuItem id='UpdateBook' name='Update Book' color='primary' handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
                            <MenuItem id='ListBorrower' name='List Borrowers' color='dark' handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
                            <MenuItem id='History' name='History' color='secondary' handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
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

export default AdminPage;