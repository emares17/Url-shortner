const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

// DB Connection
connectDB();

// EJS
app.set('view engine', 'EJS');

// Bodyparser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes
app.use('/', require('./routes/index.js'));

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
