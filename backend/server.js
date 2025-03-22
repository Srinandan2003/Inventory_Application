import express from 'express';
import mongoose from 'mongoose';
import itemRoute from './routes/itemRoute.routes.js';
import authRoute from './routes/auth.routes.js'; // Import auth routes
import cors from 'cors';
import { protect } from './controllers/auth.controller.js'; // Import protect middleware

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI; // Replace with your MongoDB URI

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute); // Auth routes (signup, login)
app.use('/api', protect, itemRoute); // Protect item routes

// MongoDB Connection
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });