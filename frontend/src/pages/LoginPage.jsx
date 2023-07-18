import { useEffect } from "react";
import LoginForm from "../components/form/LoginForm";

const LoginPage = () => {

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            if (user.position === 'student' || user.position === 'lecturer') {
                window.location.replace('/home');
            } else if (user.position === 'admin') {
                window.location.replace('/admin');
            }
        }
    }, []);

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col" style={{ width: '350px' }}>
                    <div className="row">
                        <div className="col">
                            <h2 className="text-primary">Login</h2>
                            <p>Welcome, Please enter your details</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;