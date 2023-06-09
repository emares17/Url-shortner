const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const path = require('path')
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');



// Load config
dotenv.config({ path: './config/config.env' });

// DB Connection
connectDB();

// Public 
app.use(express.static('public'));

// EJS
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes
app.use('/', require('./routes/index.js'));

// Error Handler
app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
