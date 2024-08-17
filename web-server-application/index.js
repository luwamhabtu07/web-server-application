import express from'express';
import mongoose from'mongoose';
import cors from'cors';
import { Book } from'./models/book.js';  // Adjust the path if needed
const app = express();

// Middleware setup
app.use(cors());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

// MongoDB connectionconst mongoURI = 'mongodb+srv://dbuser:3425@cluster0.hzkhl9o.mongodb.net/sccproject?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() =>console.log('Connected to MongoDB'))
  .catch(err =>console.error('Could not connect to MongoDB', err));

// Routes
app.get('/', async (req, res, next) => {
  try {
    const books = awaitBook.find({}).lean();  // Fixed: Removed `await` keyword from `awaitBook`
    res.render('home_react', { items: JSON.stringify(books) });
  } catch (err) {
    next(err);
  }
});

// Other routes...

app.listen(app.get('port'), () => {
  console.log(`Express started on http://localhost:${app.get('port')}`);
});
