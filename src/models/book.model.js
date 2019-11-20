const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title requiered'],
  },
  isbn: {
    type: String,
    unique: true,
    required: [true, 'ISBN requiered'],
  },
  description: {
    type: String,
    required: [true, 'description requiered'],
  },
  author: {
    type: String,
    required: [true, 'author requiered'],
  },
  publicationDate: {
    type: Date,
    required: [true, 'publication date requiered'],
  },
  publisher: {
    type: String,
    required: [true, 'publisher requiered'],
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
