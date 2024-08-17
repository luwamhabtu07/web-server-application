import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
const connectionString = "mongodb+srv://dbuser:3425@cluster0.hzkhl9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString, {
    dbName: 'sccproject',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const bookSchema = new Schema({
 title: { type: String, required: true },
 author: String,
 count: Number,
 pubdate: Date,
 inStore: Boolean
});

export const Book = mongoose.model('Book', bookSchema);