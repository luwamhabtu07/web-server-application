import express from 'express';
import Item from '../models/item.js';

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).send('Database Error occurred');
    }
});

// Get item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(500).send('Database Error occurred');
    }
});

// Update or create an item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true });
        res.json(item);
    } catch (error) {
        res.status(500).send('Database Error occurred');
    }
});

// Delete an item
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send('Database Error occurred');
    }
});

export default router;
