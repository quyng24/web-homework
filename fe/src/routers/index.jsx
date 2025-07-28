import { Navigate } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import UserTopic from "../pages/user/UserTopic";
import Login from "../pages/Login";
import AdminTopic from "../pages/admin/AdminTopic";
import UserQuiz from "../pages/user/UserQuiz";
import UserResult from "../pages/user/UserResult";

export const routes = (roleName) => [
  { path: "/login", element: <Login /> },
  {
    path: "/admin",
    element: (
      <ProtectedRouter role="admin">
        <AdminDashboard />
      </ProtectedRouter>
    )
  },
  {
    path: "/admin/topic",
    element: (
      <ProtectedRouter role="admin">
        <AdminTopic/>
      </ProtectedRouter>
    )
  },
  {
    path: "/user",
    element: (
      <ProtectedRouter role="user">
        <UserDashboard />
      </ProtectedRouter>
    )
  },
  {
    path: "/user/topic",
    element: (
      <ProtectedRouter role="user">
        <UserTopic />
      </ProtectedRouter>
    )
  },
  {
    path: "/user/quiz/:topicId",
    element: (
      <ProtectedRouter role="user">
        <UserQuiz />
      </ProtectedRouter>
    )
  },
  {
    path: "/user/result/:topicId",
    element: (
      <ProtectedRouter role="user">
        <UserResult/>
      </ProtectedRouter>
    )
  },
  {
    path: "*",
    element:
      roleName === "admin" ? (
        <Navigate to="/admin" />
      ) : roleName === "user" ? (
        <Navigate to="/user" />
      ) : (
        <Navigate to="/login" />
      )
  },
];
