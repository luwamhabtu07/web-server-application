import mongoose from 'mongoose';

// Define the schema for your items
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  // Add other fields as needed
});

// Create a model using the schema
const Item = mongoose.model('Item', itemSchema);

export default Item;
