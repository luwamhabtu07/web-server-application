import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import booksRouter from './routes/books.js'; // Updated to books

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Set Mongoose strictQuery option
mongoose.set('strictQuery', false); // Explicitly set strictQuery to false

// Connect to MongoDB
const mongoURI = 'mongodb+srv://dbuser:3425@cluster0.hzkhl9o.mongodb.net/sccproject?retryWrites=true&w=majority&appName=Cluster0'; // Updated URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/books', booksRouter); // Updated to books

// Start the server
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
