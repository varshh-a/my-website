// server/index.ts
import express from 'express';
import cors from 'cors';
import { connectDB } from './db';

const app = express();
app.use(cors()); // Allow requests from frontend

// Example GET endpoint
app.get('/products', async (req, res) => {
  try {
    const db = await connectDB();
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});