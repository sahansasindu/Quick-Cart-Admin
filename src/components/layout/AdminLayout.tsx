import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Quick Cart</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">Dashboard</Link>
          <Link to="/add-category" className="nav-item">Add Category</Link>
          <Link to="/manage-categories" className="nav-item">Manage Categories</Link>
          <Link to="/add-product" className="nav-item">Add Product</Link>
          <Link to="/manage-products" className="nav-item">Manage Products</Link>
          <Link to="/add-discount" className="nav-item">Add Discount</Link>
          <Link to="/manage-discounts" className="nav-item">Manage Discounts</Link>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
