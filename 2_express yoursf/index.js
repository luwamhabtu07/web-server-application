import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getAll, getItem } from './data.js';

const app = express();
const port = 3000;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

// Default route
app.get('/', (req, res) => {
  const books = getAll(); // Fetch all books
  res.render('home', { books }); // Render home template with books data
});

// Detail route
app.get('/details', (req, res) => {
  const book = getItem(req.query.id); // Fetch a specific book by ID
  if (book) {
    res.render('detail', { book }); // Render detail template with book data
  } else {
    res.status(404).send('Book not found'); // Handle the case where the book is not found
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
