import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Define other fields as needed
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
