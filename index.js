import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store); 
const port = process.env.APP_PORT || 5000;

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json()); // Middleware untuk mengurai body permintaan JSON
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

//store.sync();

// Rute untuk menangani permintaan GET /users
app.get('/users', (req, res) => {
    // Lakukan sesuatu di sini, misalnya mengambil data pengguna dari database
    res.status(200).json({ message: 'GET request to /users successful' });
});

app.post('/users', (req, res) => {
    const { name, email, password, confPassword, role } = req.body;
    console.log('Received user data:', { name, email, password, confPassword, role });
    res.status(200).json({ message: 'User created successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
