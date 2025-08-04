import { Navigate } from "react-router-dom";
import { authProvider } from "../context/auth";

export default function ProtectedRoute({ children, role }) {
  const checkAuthen = async () => {
    await authProvider.init();
    if (!authProvider.isAuthenticated) return <Navigate to="/login" />;
    if (role && authProvider?.user?.role !== role) return <Navigate to="/login" />;
    return children;
  }
  checkAuthen();
}