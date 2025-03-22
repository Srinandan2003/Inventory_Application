import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [items, setItems] = useState([]);
  const LOW_STOCK_THRESHOLD = 5;

  // Fetch items from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items for report:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Calculate report data
  const totalItems = items.length;
  const lowStockItems = items.filter((item) => item.quantity <= LOW_STOCK_THRESHOLD).length;

  // Group items by category
  const itemsByCategory = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="card-title mb-4">Inventory Report</h2>
      <div className="space-y-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Items</div>
            <div className="stat-value">{totalItems}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Low Stock Items</div>
            <div className="stat-value">{lowStockItems}</div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Items by Category</h3>
          {Object.keys(itemsByCategory).length === 0 ? (
            <p>No items available.</p>
          ) : (
            <ul className="list-disc pl-5">
              {Object.entries(itemsByCategory).map(([category, count]) => (
                <li key={category}>
                  {category}: {count} items
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;