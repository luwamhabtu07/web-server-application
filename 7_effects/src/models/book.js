// src/models/book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pubdate: { type: Date, required: true }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
