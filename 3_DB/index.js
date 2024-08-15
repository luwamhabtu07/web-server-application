import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { Book } from './models/book.js';

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import cors from 'cors';
app.use('/api', cors());

app.engine('hbs', engine({
    defaultLayout: "main.hbs",
    extname: '.hbs'
}));
app.set("view engine", "hbs");

// MongoDB connection
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/sccproject', {
    // No deprecated options
})
.then(() => console.log('Mongoose connected.'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res, next) => {
    Book.find({}).lean()
        .then((books) => {
            res.render('home', { books });
        })
        .catch(err => next(err));
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/detail', (req, res, next) => {
    Book.findOne({ title: req.query.title }).lean()
        .then((book) => {
            res.render('details', { result: book });
        })
        .catch(err => next(err));
});

app.post('/detail', (req, res, next) => {
    Book.findOne({ title: req.body.title }).lean()
        .then((book) => {
            res.render('details', { result: book });
        })
        .catch(err => next(err));
});

app.get('/delete', (req, res, next) => {
    Book.deleteOne({ title: req.query.title })
        .then(result => {
            let deleted = result.deletedCount !== 0;
            return Book.countDocuments();
        })
        .then(total => {
            res.type('text/html');
            res.render('delete', { title: req.query.title, deleted: deleted, total: total });
        })
        .catch(err => next(err));
});

// 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});
