// Import express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

// Import user routes
const user = require('./routes/user.routes');

// Import book routes
const book = require('./routes/book.routes');

// Initialize the app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Set xxxx/user as base url for user
app.use('/user', user);

// Set xxxx/book as base url for user
app.use('/book', user);

module.exports = app;
