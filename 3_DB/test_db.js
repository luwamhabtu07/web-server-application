'use strict';

import mongoose from 'mongoose';
import { Book } from './models/book.js';

async function run() {
    // Check if mongoose is already connected
    if (mongoose.connection.readyState === 0) {
        try {
            // Connect to MongoDB
            await mongoose.connect('mongodb://localhost/sccproject', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Mongoose connected.");
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            return;
        }
    }

    try {
        // Return all records
        console.log("All records:");
        let books = await Book.find({}).lean();
        console.log(books);

        // Return a single record
        let book = await Book.findOne({ "title": "Moby Dick" }).lean();
        console.log("Record with title 'Moby Dick':");
        console.log(book);

        // Delete a single record
        let result = await Book.deleteOne({ "title": "Moby Dick" });
        console.log("Delete result:");
        console.log(result);

        // Insert or update a single record
        const newBook = { 'title': 'Pride and Prejudice', 'author': 'Jane Austen', 'pubdate': new Date('1813-01-01') };
        console.log("Inserting or updating record:");
        result = await Book.updateOne({ title: newBook.title }, newBook, { upsert: true });
        console.log(result);

    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection when done
        await mongoose.connection.close();
        console.log("Mongoose connection closed.");
    }
}

run();