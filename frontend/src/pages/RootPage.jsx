import { useEffect } from "react";

const RootPage = () => {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('user', user);

        if (user === null) window.location.replace('/login');

        if (user) {
            if (user.position === 'student' || user.position === 'lecturer') {
                window.location.replace('/home');
            } else if (user.position === 'admin') {
                window.location.replace('/admin');
            }
        }
    }, []);
}

export default RootPage;