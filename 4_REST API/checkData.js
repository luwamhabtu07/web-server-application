import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://dbuser:3425@cluster0.hzkhl9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Item = mongoose.model('Item', itemSchema);

const checkData = async () => {
  try {
    const items = await Item.find();
    console.log('Fetched items:', items);
  } catch (err) {
    console.error('Error fetching items:', err);
  } finally {
    mongoose.connection.close();
  }
};

checkData();
