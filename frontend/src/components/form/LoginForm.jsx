import { useState } from "react";
import { Link } from "react-router-dom";
import InputLabel from "../input/InputLabel";
import InputCheckbox from "../input/InputCheckbox";

const LoginForm = () => {
    const [isChecked, setIsChecked] = useState(false);

    const showPasswordCheck = () => {
        setIsChecked(!isChecked);
    }

    const login = async (email, password) => {
        const query = new URLSearchParams();
        query.append('email', email);
        query.append('password', password);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/login?${query.toString()}`, {
            method: 'POST'
        }).then(res => res.json());

        if (response.status) {
            const user = response.payload.user;
            localStorage.setItem('user', JSON.stringify(user));

            if (user.position === 'student' || user.position === 'lecturer') {
                window.location.replace('/home');
                return;
            } else if (user.position === 'admin') {
                window.location.replace('/admin');
                return;
            }
        }

        alert(response.message);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;

        login(email, password);
    }

    return (
        <form onSubmit={handleSubmit}>
                <>
                    <InputLabel id='inputEmail' type='email'>Email address</InputLabel>
                    <InputLabel id='inputPassword' type={isChecked ? 'text' : 'password'}>Password</InputLabel>
                    <InputCheckbox id='showPasswordCheck' onChange={showPasswordCheck}>Show Password</InputCheckbox>
                </>
                
            <div className="row mx-0 mb-3">
                <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <div className="text-center">
                <p>Dont have account? <Link to={'/register'}>Sign up</Link></p>
            </div>
        </form>
    )
}

export default LoginForm;