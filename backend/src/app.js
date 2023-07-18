import express from 'express';
import cors from 'cors';
import RegisterRoute from './routes/RegisterRoute.js';
import LoginRoute from './routes/LoginRoute.js';
import UserRoute from './routes/UserRoute.js';
import BookRoute from './routes/BookRoute.js';
import BorrowRoute from './routes/BorrowRoute.js';
import 'dotenv/config.js';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome')
});

app.use(RegisterRoute);
app.use(LoginRoute);
app.use(UserRoute);
app.use(BookRoute);
app.use(BorrowRoute);

app.use((req, res) => {
    res.status(404).json({ message: 'not found'});
});

app.listen(port, () => console.log(`Server up and running: ${process.env.BASE_API_URL}`));
