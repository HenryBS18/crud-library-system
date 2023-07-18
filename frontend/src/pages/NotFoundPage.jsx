import { useEffect } from "react";

const NotFoundPage = () => {
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
}

export default NotFoundPage;