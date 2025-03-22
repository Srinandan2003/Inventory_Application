import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ fetchItems, editingItem, setEditingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
    status: 'in-stock',
  });
  const [errors, setErrors] = useState({});

  // Populate form when editing an item
  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        quantity: editingItem.quantity,
        category: editingItem.category,
        status: editingItem.status,
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field being edited
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    const quantity = Number(formData.quantity);
    if (isNaN(quantity) || quantity < 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const dataToSend = {
        ...formData,
        quantity: Number(formData.quantity),
      };

      if (editingItem) {
        // Update item
        await axios.put(`http://localhost:5000/api/items/${editingItem._id}`, dataToSend);
      } else {
        // Add new item
        await axios.post('http://localhost:5000/api/items', dataToSend);
      }
      fetchItems(); // Refresh the list
      setEditingItem(null); // Clear editing state
      setFormData({ name: '', quantity: '', category: '', status: 'in-stock' }); // Reset form
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Item Name</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter item name"
          className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="text-error text-sm">{errors.name}</span>}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Quantity</span>
        </label>
        <input
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          className={`input input-bordered w-full ${errors.quantity ? 'input-error' : ''}`}
          value={formData.quantity}
          onChange={handleChange}
        />
        {errors.quantity && <span className="text-error text-sm">{errors.quantity}</span>}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <input
          type="text"
          name="category"
          placeholder="Enter category"
          className={`input input-bordered w-full ${errors.category ? 'input-error' : ''}`}
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && <span className="text-error text-sm">{errors.category}</span>}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <select
          name="status"
          className="select select-bordered w-full"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="low-stock">Low Stock</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editingItem ? 'Update Item' : 'Add Item'}
        </button>
        {editingItem && (
          <label htmlFor="edit-modal" className="btn btn-ghost">
            Cancel
          </label>
        )}
      </div>
    </form>
  );
};

export default ItemForm;