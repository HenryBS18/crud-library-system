import { Link } from "react-router-dom";

const Navbar = (props) => {
    const handeLogout = () => {
        localStorage.removeItem('user');
        window.location.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-0 border-1 border-bottom ">
            <div className="container p-0">
                <Link to={'/'} className="navbar-brand d-flex align-items-center py-1">
                    <img src="/library-logo.png" alt="Library Logo" width="60" height="60" />
                    <div className="fw-bold ms-1">Library</div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav me-3">
                        <li className="nav-item">
                            Welcome, {props.name}
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button type="button" className="btn btn-dark" onClick={handeLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;