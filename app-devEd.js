// 1. import express
const express = require('express');
// 2. run express
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

// import routes
const postsRoute = require('./routes/posts');
app.use ('/posts', postsRoute);

// MOVE TO ROUTES / POSTS.JS
// //Middleware = function that executes when routes are hit
// app.use('/posts', () => {
//     console.log('This is a middleware running');
// });

// ROUTES
app.get('/', (req, res) => {
    res.send('We are on Home page!')
});


// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true },
    () => console.log('connected to db!')
)

// start listening to the server
app.listen(3000);