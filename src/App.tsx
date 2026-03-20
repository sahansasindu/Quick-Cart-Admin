import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/security/Login';
import Signup from './components/security/Signup';
import OtpVerification from './components/security/OtpVerification';
import ProtectedRoute from './components/security/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import AddCategory from './components/admin/AddCategory';
import AddProduct from './components/admin/AddProduct';
import ManageProducts from './components/admin/ManageProducts';
import ManageCategories from './components/admin/ManageCategories';
import AddDiscount from './components/admin/AddDiscount';
import ManageDiscounts from './components/admin/ManageDiscounts';
import './App.css';


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
          <Route path="/verify-email" element={<OtpVerification />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/manage-categories" element={<ManageCategories />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/manage-products" element={<ManageProducts />} />
              <Route path="/add-discount" element={<AddDiscount />} />
              <Route path="/manage-discounts" element={<ManageDiscounts />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
