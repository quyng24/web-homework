import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRouter from './routers/ProtectedRouter';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import { useEffect, useState } from 'react';
import { authProvider } from './context/auth';

function App() {
  const [roleName, setRoleName] = useState('');
  useEffect(() => {
    authProvider.init();
    setRoleName(JSON.parse(localStorage.getItem('user')).role);
  }, []);
  console.log(roleName)
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

        <Route path="*" element={roleName === 'admin' ? <AdminDashboard/> : roleName === 'user' ? <UserDashboard/> : <Login/>} />
      </Routes>
    </Router>
  );
}

export default App
