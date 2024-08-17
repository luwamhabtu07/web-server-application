import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import itemRoutes from './routes/items.js';

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/api/items', itemRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
