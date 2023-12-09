const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to datatbase
mongoose.
connect('mongodb+srv://admin:PASSWORD@backendprojekt.run5ycn.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to MongoDB')
  app.listen(3000,() => {
    console.log("Node API app is running on port 3000")
  });
}).catch(() =>{
  console.log(error)
})

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});