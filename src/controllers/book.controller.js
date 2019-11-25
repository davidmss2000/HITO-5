/* eslint-disable consistent-return */

const Book = require('../models/book.model');

// Create and save a new book
function create(req, res) {
  // Create a new book
  const book = new Book(req.body);

  // Save the new book
  book.save().then((newBook) => {
    res.status(200).send({ message: 'Saved book', newBook });
  }).catch((err) => {
    res.status(400).send({ message: 'Error saving book', err });
  });
}

// Retrieve books object
function get(req, res) {
  Book.find(req.query).then((book) => {
    res.status(200).send(book);
  }).catch((err) => {
    res.status(404).send({ message: 'No books found', err });
  });
}

// Replace the books information
function replaceByIsbn(req, res) {
  const { title } = req.body;
  const { isbn } = req.params;
  const { description } = req.body;
  const { author } = req.body;
  const { publicationDate } = req.body;
  const { publisher } = req.body;
  const { price } = req.body;

  if (!title || !isbn || !description || !author || !publicationDate || !publisher) {
    return res.status(400).send({ message: 'Missing params' });
  }

  if (price === undefined) {
    return res.status(400).send({ message: 'Missing params' });
  }
  // Create the new book
  const bookReplacement = req.body;

  Book.replaceOne({ isbn }, bookReplacement).then((book) => {
    res.status(200).send({ message: 'Book replaced', book });
  }).catch((err) => {
    res.status(404).send({ message: 'An error ocurred', err });
  });
}

// Update the book information
function editByIsbn(req, res) {
  const { isbn } = req.params;

  // Update the book
  Book.findOneAndUpdate({ isbn }, req.body, { new: true }, (error, book) => {
    if (error) res.status(500).send({ error });

    res.status(200).send({ message: 'Book updated', book });
  });

  Book.findOneAndUpdate({ isbn }, req.body, { new: true }).then((book) => {
    res.status(200).send({ message: 'Book updated', book });
  }).catch((err) => {
    res.status(500).send(err);
  });
}

// Deletes the book from the database
function deleteByIsbn(req, res) {
  const { isbn } = req.params;

  Book.findOneAndRemove({ isbn }).then((book) => {
    if (!book) res.status(404).send({ message: 'Book not found', book });
    else res.status(200).send({ message: 'Book deleted', book });
  }).catch((err) => {
    res.status(500).send({ err });
  });
}

// Retrieve books by each field
function getByField(req, res) {
  const field = req.params;

  Book.find(field).then((books) => {
    res.status(200).send(books);
  }).catch((err) => {
    res.status(404).send({ message: 'No books found', err });
  });
}

function getAll(req, res) {
  Book.find().then((books) => res.status(200).send(books));
}

function getBySubstring(req, res) {
  const field = req.params.field;
  const substring = req.body.substring;

  if (!field || !substring) return res.status(400).send({ message: 'Missing params' });

  query = {};
  query[field] = new RegExp(substring, 'i'); // 'i' means case insensitive

  Book.find(query, function callback(err, books) {
    if (err) return res.status(500).send({err});
    return res.status(200).send({books});
  });

}

module.exports = {
  get,
  create,
  replaceByIsbn,
  editByIsbn,
  deleteByIsbn,
  getByField,
  getAll,
  getBySubstring,
};
