const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const path = require('path')
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');



// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport)

// DB Connection
connectDB();

// Public 
app.use(express.static('public'));

// EJS
app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,})
}));

// Bodyparser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index.js'));
app.use('/oauth', require('./routes/oauth'));

// Error Handler
app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
