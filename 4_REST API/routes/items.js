import express from 'express';
import Item from '../models/item.js'; // Correct path to the model

const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Item.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add or update an item
router.post('/', async (req, res) => {
  try {
    const { id, name, description } = req.body;
    let item;
    if (id) {
      // Update item if ID is provided
      item = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
      if (!item) return res.status(404).json({ message: 'Item not found' });
    } else {
      // Add a new item if no ID is provided
      item = new Item({ name, description });
      await item.save();
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
