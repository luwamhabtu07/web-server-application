import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars'; // Add Handlebars engine
import booksRouter from './routes/books.js'; // Import updated routes

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('./public')); // Serve static files

// Set Mongoose strictQuery option
mongoose.set('strictQuery', false); // Explicitly set strictQuery to false

// Connect to MongoDB
const mongoURI = 'mongodb+srv://dbuser:3425@cluster0.hzkhl9o.mongodb.net/sccproject?retryWrites=true&w=majority&appName=Cluster0'; // Updated URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Mongoose connected.'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Set up Handlebars
app.engine('hbs', engine({
    defaultLayout: "main.hbs",
    extname: '.hbs'
}));
app.set("view engine", "hbs");

// Use routes
app.use('/books', booksRouter); // Use updated route

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

// 404 handler
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
