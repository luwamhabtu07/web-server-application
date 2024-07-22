// index.js
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import Item from './models/item.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('home', { items });
  } catch (err) {
    res.status(500).send('Error retrieving items');
  }
});

app.get('/detail', async (req, res) => {
  try {
    const item = await Item.findById(req.query.id);
    if (item) {
      res.render('detail', { item });
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving item');
  }
});

// Extra Credit: Delete Route
app.delete('/delete', async (req, res) => {
  try {
    const result = await Item.deleteOne({ _id: req.query.id });
    if (result.deletedCount > 0) {
      res.send('Item deleted successfully');
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(500).send('Error deleting item');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});