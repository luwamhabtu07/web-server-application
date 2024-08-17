import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Create an ES module-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dummy data
const items = [
  { id: 1, name: 'The Book of Laughter and Forgetting', details: 'Details of Item 1' },
  { id: 2, name: 'Kill a Mockingbird', details: 'Details of Item 2' },
  { id: 3, name: 'The Great Gatsby', details: 'Details of Item 3' },
  { id: 4, name: 'Sense and Sensibility', details: 'Details of Item 4' },
  { id: 5, name: 'he Great Adventure', details: 'Details of Item 5' },
];

// Route for the home page
app.get('/', (req, res) => {
  res.render('home', { items: JSON.stringify(items) });
});

// Route for the details page
app.get('/details/:id', (req, res) => {
  const item = items.find(item => item.id === parseInt(req.params.id));
  res.render('details', { item });
});

app.listen(app.get('port'), () => {
  console.log(`Express started on http://localhost:${app.get('port')}`);
});