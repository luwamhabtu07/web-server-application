// models/item.js
import mongoose from 'mongoose';

// Define the schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

// Create and export the model
const Item = mongoose.model('Item', itemSchema);
export default Item;
