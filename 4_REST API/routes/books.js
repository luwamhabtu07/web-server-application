import express from 'express';
import Book from './models/book.js'; // Updated path to book model

const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Book.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add or update a book
router.post('/', async (req, res) => {
  try {
    const { id, name, description } = req.body;
    let book;
    if (id) {
      // Update book if ID is provided
      book = await Book.findByIdAndUpdate(id, { name, description }, { new: true });
      if (!book) return res.status(404).json({ message: 'Book not found' });
    } else {
      // Add a new book if no ID is provided
      book = new Book({ name, description });
      await book.save();
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

