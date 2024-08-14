import mongoose from 'mongoose';

// Define the schema for books
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  // Add other fields as needed
});

// Create a model using the schema
const Book = mongoose.model('Book', bookSchema);

export default Book;

