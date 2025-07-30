import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { authProvider } from './context/auth';
import {routes} from './routers/index'

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
