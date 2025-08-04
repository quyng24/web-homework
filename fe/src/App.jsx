import './App.css';
import { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { authProvider } from './context/auth';
import {routes} from './routers/index'

function App() {
  const [roleName, setRoleName] = useState(null);
  useEffect(() => {
    const checkRole = async () => {
      await authProvider.init();
      console.log(authProvider.user.role);
      setRoleName(authProvider?.user?.role);
    };
    checkRole();
    console.log("🏁 Component loaded");
  console.log("👤 authProvider:", authProvider);
  }, []);
  return (
    <Router>
      <Suspense fallback={<div className='w-full h-[100vh] flex justify-center items-center text-xl font-medium text-blue-500'>Đang tải trang...</div>}>
        <Routes>
          {routes(roleName).map(({ path, element }, idx) => (
            <Route key={idx} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App
