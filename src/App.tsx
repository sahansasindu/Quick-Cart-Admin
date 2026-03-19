import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/security/Login';
import Signup from './components/security/Signup';
import ProtectedRoute from './components/security/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import AddCategory from './components/admin/AddCategory';
import AddProduct from './components/admin/AddProduct';
import './App.css';

// Dashboard Home component
const DashboardHome = () => (
  <div className="dashboard-container">
    <h1>Admin Dashboard</h1>
    <p>Welcome to the Quick Cart Administration panel. Use the sidebar to manage categories and products.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
