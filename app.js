require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');

const morgan = require('morgan');
app.use(morgan('combined'));

// Connect to datatbase
mongoose.
connect(process.env.DB_URI)
.then(() => {
  console.log('Connected to MongoDB')
}).catch(() =>{
  console.log(error)
})

const articlesRoutes = require('./api/routes/articles.js');
const usersRoutes = require('./api/routes/users.js');
app.use('/articles', articlesRoutes);
app.use('/users', usersRoutes);

module.exports = app;