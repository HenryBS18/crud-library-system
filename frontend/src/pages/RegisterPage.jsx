import { useEffect } from "react";
import RegisterForm from "../components/form/RegisterForm";

const RegisterPage = () => {

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
        <div className="container d-flex flex-column justify-content-center align-items-center my-3" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col" style={{ width: '350px' }}>
                    <div className="row">
                        <div className="col">
                            <h2 className="text-primary">Register</h2>
                            <p>Welcome, Please enter your details</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;