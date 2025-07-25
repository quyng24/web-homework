import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navigate} from 'react-router-dom';
import ProtectedRouter from './routers/ProtectedRouter';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import { useEffect, useState } from 'react';
import { authProvider } from './context/auth';

function App() {
  const [roleName, setRoleName] = useState('');
  const safeGetRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role || null;
  } catch {
    return null;
  }
};
  useEffect(() => {
    authProvider.init();
    setRoleName(safeGetRole());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRouter role="admin">
              <AdminDashboard/>
            </ProtectedRouter>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRouter role="user">
              <UserDashboard />
            </ProtectedRouter>
          }
        />

        <Route
          path="*"
          element={
            roleName === "admin" ? (
              <AdminDashboard />
            ) : roleName === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App
