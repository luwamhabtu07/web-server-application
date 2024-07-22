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
  const items = getAll();
  res.render('home', { items });
});

// Detail route
app.get('/details', (req, res) => {
  const item = getItem(req.query.id);
  if (item) {
    res.render('detail', { item });
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
