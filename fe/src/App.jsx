import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navigate} from 'react-router-dom';
import ProtectedRouter from './routers/ProtectedRouter';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import { useEffect, useState } from 'react';
import { authProvider } from './context/auth';
import {routes} from './routers/index'
import UserTopic from './pages/user/UserTopic';

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
        {routes(roleName).map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App
