import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'viewer'], // Define possible roles
    default: 'viewer', // Default role is viewer
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const userModel = mongoose.model('User', userSchema);