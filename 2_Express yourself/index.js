// index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAll, getItem } from './data.js';

const app = express();
const PORT = 3000;

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), 'views'));

// Serve static files (optional)
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

// Home route
app.get('/', (req, res) => {
    res.render('home', { plants: getAll() });
});

// Detail route
app.get('/details/:id', (req, res) => {
    const plant = getItem(req.params.id);
    if (plant) {
        res.render('detail', { plant });
    } else {
        res.status(404).send('Plant not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
