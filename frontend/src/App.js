import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootPage from './pages/RootPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<RootPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/home' element={<UserPage />} />
				<Route path='/admin' element={<AdminPage />} />
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}

export default App;
