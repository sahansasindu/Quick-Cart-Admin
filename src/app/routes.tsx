import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/security/Login';
import Signup from '../components/security/Signup';
import OtpVerification from '../components/security/OtpVerification';
import ProtectedRoute from '../components/security/ProtectedRoute';
import AdminLayout from '../components/layout/AdminLayout';
import ManageProducts from '../components/admin/ManageProducts';
import ManageCategories from '../components/admin/ManageCategories';
import ManageDiscounts from '../components/admin/ManageDiscounts';
import DashboardHome from '../components/admin/DashboardHome';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<OtpVerification />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/manage-categories" element={<ManageCategories />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/manage-discounts" element={<ManageDiscounts />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
