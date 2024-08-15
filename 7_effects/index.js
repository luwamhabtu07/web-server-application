'use strict';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Book from './src/models/book.js'; // Ensure this matches your book.js export

const app = express();

const connectionString = 'mongodb+srv://dbuser:3425@cluster0.hzkhl9o.mongodb.net/sccproject?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // Allows direct navigation to static files
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

app.use(cors()); // Allow CORS for all routes

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/detail', (req, res, next) => {
    Book.findOne({ title: req.query.title }).lean()
        .then(book => res.render('details', { result: book }))
        .catch(err => next(err));
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.render('about');
});

// API routes
app.get('/api/v1/book/:title', (req, res, next) => {
    const title = req.params.title;
    Book.findOne({ title }, (err, result) => {
        if (err || !result) return next(err);
        res.json(result);
    });
});

app.get('/api/v1/books', (req, res, next) => {
    Book.find({}).lean()
        .then(books => res.json(books))
        .catch(err => next(err));
});

app.get('/api/v1/delete/:id', (req, res, next) => {
    Book.deleteOne({ "_id": req.params.id }).lean()
        .then(result => res.json({ "deleted": result }))
        .catch(err => next(err));
});

app.post('/api/v1/add/', (req, res, next) => {
    if (!req.body._id) { // Insert new document
        Book.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.json({ "error": err }));
    } else { // Update existing document
        Book.updateOne({ _id: req.body._id }, req.body, { upsert: true })
            .then(result => res.json(result))
            .catch(err => res.json({ "error": err }));
    }
});

app.get('/api/v1/add/:title/:author/:pubdate', (req, res, next) => {
    const { title, author, pubdate } = req.params;
    Book.updateOne({ title }, { title, author, pubdate }, { upsert: true })
        .then(result => res.json({ updated: result.nModified }))
        .catch(err => next(err));
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started on port', app.get('port'));
});
