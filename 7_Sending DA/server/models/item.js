import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: String,
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
