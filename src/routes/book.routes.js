const express = require('express');
const book = require('../controllers/book.controller');

const router = express.Router();

// Create book
router.post('/', book.create);

// Retrieve books matching query params
router.get('/', book.get);

// Retrieve all books
router.get('/all', book.getAll);

// Retrieve books by title
router.get('/title/:title', book.getByField);

// Retrieve books by isbn
router.get('/isbn/:isbn', book.getByField);

// Retrieve books by description
router.get('/description/:description', book.getByField);

// Retrieve books by author
router.get('/author/:author', book.getByField);

// Retrieve books by publicationDate
router.get('/publicationDate/:publicationDate', book.getByField);

// Retrieve books by publisher
router.get('/publisher/:publisher', book.getByField);

// Retrieve books by price
router.get('/price/:price', book.getByField);

// Replace an existing book with isbn
router.put('/:isbn', book.replaceByIsbn);

// Update an existing book partially with isbn
router.patch('/:isbn', book.editByIsbn);

// Delete an existing book with isbn
router.delete('/:isbn', book.deleteByIsbn);

module.exports = router;
