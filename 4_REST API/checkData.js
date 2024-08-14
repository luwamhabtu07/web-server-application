import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://dbuser:3425@cluster0.hzkhl9o.mongodb.net/sccproject?retryWrites=true&w=majority&appName=Cluster0'; // Updated URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bookSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Book = mongoose.model('Book', bookSchema);

const checkData = async () => {
  try {
    const books = await Book.find();
    console.log('Fetched books:', books);
  } catch (err) {
    console.error('Error fetching books:', err);
  } finally {
    mongoose.connection.close();
  }
};

checkData();
