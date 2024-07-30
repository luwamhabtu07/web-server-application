import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';

// Load environment variables from .env file
dotenv.config();

// Set Mongoose `strictQuery` option to avoid deprecation warning
mongoose.set('strictQuery', true);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Define routes here
// For example:
// app.use('/api/items', itemRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
