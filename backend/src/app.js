const express = require('express');
const cookieParser = require('cookie-parser');
const {connectDB} = require('./db/db');
const cors = require('cors');
const path = require('path');

const app = express();

// enabling cors for same origin policy
const allowedOrigins = [
  'https://tilthaimart.in',
  'https://www.tilthaimart.in',
  'https://admin.tilthaimart.in'
];
app.use(cors({
  origin: function (origin, callback) {
    // 1. Allow requests with no origin (like mobile apps, Postman, or server-to-server)
    if (!origin) return callback(null, true);
    
    // 2. Check if the incoming origin is in our allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origin is allowed
    } else {
      callback(new Error('Not allowed by CORS')); // Reject unauthorized domains
    }
  },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
