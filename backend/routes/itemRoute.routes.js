import express from 'express';
import { getItems, addItem, deleteItem, updateItem } from '../controllers/items.controller.js';
import { restrictToAdmin } from '../controllers/auth.controller.js';

const itemRoute = express.Router();

itemRoute.get('/items', getItems); // All authenticated users can view items
itemRoute.post('/items', restrictToAdmin, addItem); // Only admins can add items
itemRoute.delete('/items/:id', restrictToAdmin, deleteItem); // Only admins can delete items
itemRoute.put('/items/:id', restrictToAdmin, updateItem); // Only admins can update items

export default itemRoute;