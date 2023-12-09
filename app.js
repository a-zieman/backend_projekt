const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');

const morgan = require('morgan');
app.use(morgan('combined'));

// Connect to datatbase
mongoose.
connect('mongodb+srv://admin:PASSWORD@backendprojekt.run5ycn.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to MongoDB')
}).catch(() =>{
  console.log(error)
})

const articlesRoutes = require('./api/routes/articles.js');
app.use('/articles', articlesRoutes);

module.exports = app;