import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/security/Login';
import Signup from './components/security/Signup';
import ProtectedRoute from './components/security/ProtectedRoute';
import './App.css';

// Placeholder Dashboard component
const Dashboard = () => (
  <div className="dashboard-container">
    <h1>Welcome to Quick Cart Admin</h1>
    <p>You are logged in!</p>
    <button onClick={() => window.location.href = '/login'} className="btn-secondary">Log Out (Mock)</button>
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
            <Route path="/" element={<Dashboard />} />
            {/* Add more protected routes here */}
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
