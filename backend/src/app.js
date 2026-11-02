const express = require('express');
const cookieParser = require('cookie-parser');
const {connectDB} = require('./db/db');
const cors = require('cors');
const path = require('path');

const app = express();

// enabling cors for same origin policy
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Your exact React frontend URL
  credentials: true                // Allows cookies to be accepted/sent
}));


/**
 * use all the important middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//connect to the database
connectDB();


// Serve the uploads directory statically
app.use('/public', express.static(path.join(__dirname, '../public')));


/**
 * all imported routes
 */
const userAuth = require('./routes/userAuth.route');
const productRoutes = require('./routes/products.route');
const orderRoutes = require('./routes/orders.route');

// user and admin user auths
app.use("/api/auth", userAuth);

// product management
app.use("/api/products", productRoutes);

// order management
app.use("/api/orders", orderRoutes);

module.exports = app;