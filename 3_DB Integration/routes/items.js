import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('home', { items });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.render('detail', { item });
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Item.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).send('Item deleted successfully');
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
