// src/db.js
import mongoose from 'mongoose';

// Replace this with your connection string
const connectionString = 'mongodb+srv://dbuser:3425@cluster0.hzkhl9o.mongodb.net/sccproject?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
