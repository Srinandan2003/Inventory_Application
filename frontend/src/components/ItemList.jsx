import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemForm from './ItemForm';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemList = () => {
  const { role } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const LOW_STOCK_THRESHOLD = 5;

  // Fetch items from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      const newItems = response.data;
      setItems(newItems);
      setFilteredItems(newItems);

      // Check for low stock items and show toast
      const lowStockItems = newItems.filter((item) => item.quantity <= LOW_STOCK_THRESHOLD);
      if (lowStockItems.length > 0) {
        toast.warn(`⚠️ ${lowStockItems.length} item(s) are low on stock!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Filter items based on search and filters
  useEffect(() => {
    let filtered = items;

    // Filter by search term (name)
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter, statusFilter, items]);

  // Load items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Get unique categories for filter dropdown
  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <div>
      {/* Toast Container */}
      <ToastContainer />

      {/* Form for adding items (only for admins) */}
      {role === 'admin' ? (
        <ItemForm fetchItems={fetchItems} editingItem={null} setEditingItem={() => {}} />
      ) : (
        <p className="text-center text-gray-500 my-4">Only admins can add items.</p>
      )}

      {/* Search and Filter Section */}
      <div className="my-6 flex flex-col sm:flex-row gap-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-control">
          <select
            className="select select-bordered w-full sm:w-48"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <select
            className="select select-bordered w-full sm:w-48"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table to display items */}
      {filteredItems.length === 0 ? (
        <div className="text-center mt-4">
          <p className="text-lg text-gray-500">No items found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className={item.quantity <= LOW_STOCK_THRESHOLD ? 'bg-warning bg-opacity-20' : ''}
                >
                  <td>{item.name}</td>
                  <td>
                    {item.quantity}
                    {item.quantity <= LOW_STOCK_THRESHOLD && (
                      <span className="ml-2 badge badge-warning">Low Stock</span>
                    )}
                  </td>
                  <td>{item.category}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === 'in-stock'
                          ? 'badge-success'
                          : item.status === 'low-stock'
                          ? 'badge-warning'
                          : 'badge-error'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {role === 'admin' ? (
                      <>
                        <label
                          htmlFor="edit-modal"
                          className="btn btn-sm btn-primary mr-2"
                          onClick={() => setEditingItem(item)}
                        >
                          Edit
                        </label>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => deleteItem(item._id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">No actions available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for editing items */}
      {editingItem && role === 'admin' && (
        <>
          <input type="checkbox" id="edit-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Edit Item</h3>
              <ItemForm
                fetchItems={fetchItems}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
              />
              <div className="modal-action">
                <label htmlFor="edit-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemList;