import React, { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import ItemList from './components/ItemList';
import Login from './components/Login';
import Signup from './components/Signup';
import Reports from './components/Reports';

function App() {
  const { user, logout } = useContext(AuthContext);
  const [showSignup, setShowSignup] = useState(false);
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('inventory'); // Add tab state

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">SmartInventory</a>
        </div>
        <div className="flex-none gap-2">
          {user && (
            <>
              <span className="mr-4">{user.email}</span>
              <button className="btn btn-ghost" onClick={logout}>Logout</button>
            </>
          )}
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {user ? (
          <>
            {/* Tabs */}
            <div className="tabs mb-6">
              <a
                className={`tab tab-bordered ${activeTab === 'inventory' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('inventory')}
              >
                Inventory
              </a>
              <a
                className={`tab tab-bordered ${activeTab === 'reports' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                Reports
              </a>
            </div>

            {/* Content */}
            {activeTab === 'inventory' ? <ItemList /> : <Reports />}
          </>
        ) : (
          <div>
            {showSignup ? (
              <>
                <Signup />
                <p className="text-center mt-4">
                  Already have an account?{' '}
                  <button className="link link-primary" onClick={() => setShowSignup(false)}>
                    Login
                  </button>
                </p>
              </>
            ) : (
              <>
                <Login />
                <p className="text-center mt-4">
                  Don't have an account?{' '}
                  <button className="link link-primary" onClick={() => setShowSignup(true)}>
                    Signup
                  </button>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;