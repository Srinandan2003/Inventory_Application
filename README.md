# SmartInventory

SmartInventory is a web-based inventory management application designed to help users manage their inventory efficiently. It allows users to perform CRUD operations on inventory items, track stock levels, generate reports, and includes user authentication with role-based access control. The app is built with a modern tech stack, ensuring a responsive and user-friendly experience.

## Features

### Minimum Requirements
- **CRUD Operations**: Create, Read, Update, and Delete inventory items.
- **Item Tracking**: Track item details including name, quantity, category, and status (in-stock, low-stock, out-of-stock).
- **Item Categorization and Search**: Categorize items and search/filter by name, category, or status.
- **Stock Alerts**: Visual indicators and toast notifications for low-stock items (quantity ≤ 5).
- **Inventory Reports**: Generate basic reports showing total items, low-stock items, and items by category.
- **Role-Based Access Control (RBAC)**: Supports two roles:
  - **Admin**: Can add, edit, and delete items.
  - **Viewer**: Can only view items.

### Additional Features
- **User Authentication**: Secure login and signup using JSON Web Tokens (JWT).
- **Responsive Design**: Fully responsive UI using Tailwind CSS and DaisyUI, ensuring compatibility across devices.
- **Dark Mode**: Toggle between light and dark themes for better user experience.
- **Push Notifications**: Toast notifications for low-stock items using `react-toastify`.
- **Form Validation**: Client-side validation for item forms to ensure valid input (e.g., positive quantity, required fields).
- **Tabbed Navigation**: Switch between inventory list and reports using tabs.

## Project Structure

The project is divided into two main directories:

- **backend**: Node.js/Express server with MongoDB for data storage.
- **frontend**: React app built with Vite, styled with Tailwind CSS and DaisyUI.

### Directory Overview
- **backend/**
  - `controllers/`: Contains logic for handling items and authentication.
  - `models/`: Mongoose schemas for items and users.
  - `routes/`: API routes for items and authentication.
  - `server.js`: Main server file.
- **frontend/**
  - `src/components/`: React components (e.g., `ItemList.jsx`, `Login.jsx`, `Reports.jsx`).
  - `src/context/`: React context for managing authentication state.
  - `src/App.jsx`: Main app component with routing logic.

## Technologies Used

- **Frontend**:
  - React (with Vite)
  - Tailwind CSS and DaisyUI (for styling)
  - Axios (for API requests)
  - React Toastify (for notifications)
- **Backend**:
  - Node.js and Express
  - MongoDB with Mongoose
  - JSON Web Tokens (JWT) for authentication
  - Bcrypt for password hashing
- **Database**: MongoDB (local or cloud-based)

## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (running locally or a cloud URI from MongoDB Atlas)
- npm (comes with Node.js)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>