import { useState } from "react";
import { Link } from "react-router-dom";
import InputLabel from "../input/InputLabel";
import InputSelectOptions from "../input/InputSelectOptions";
import InputCheckbox from "../input/InputCheckbox";

const RegisterForm = () => {
    const [isChecked, setIsChecked] = useState(false);

    const showPasswordCheck = () => {
        setIsChecked(!isChecked);
    }

    const register = async (name, email, position, faculty, major, password) => {
        const query = new URLSearchParams();

        query.append('name', name);
        query.append('email', email);
        query.append('position', position);
        query.append('faculty', faculty);
        query.append('major', major);
        query.append('password', password);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/register?${query.toString()}`, {
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

        const name = document.getElementById('inputName').value;
        const email = document.getElementById('inputEmail').value;
        const position = document.getElementById('inputPosition').value;
        const faculty = document.getElementById('inputFaculty').value;
        const major = document.getElementById('inputMajor').value;
        const password = document.getElementById('inputPassword').value;

        register(name, email, position, faculty, major, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputLabel id='inputName' type='text'>Name</InputLabel>
            <InputLabel id='inputEmail' type='email'>Email address</InputLabel>
            <InputSelectOptions id='inputPosition'>Position</InputSelectOptions>
            <InputLabel id='inputFaculty' type='text'>Faculty</InputLabel>
            <InputLabel id='inputMajor' type='text'>Major</InputLabel>
            <InputLabel id='inputPassword' type={isChecked ? 'text' : 'password'}>Password</InputLabel>
            <InputCheckbox id='showPasswordCheck' onChange={showPasswordCheck}>Show Password</InputCheckbox>

            <div className="row mx-0 mb-3">
                <button type="submit" className="btn btn-primary">Register</button>
            </div>
            <div className="text-center">
                <p>Have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </form>
    );
}

export default RegisterForm;