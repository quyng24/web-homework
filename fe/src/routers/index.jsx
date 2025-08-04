import { Navigate } from "react-router-dom";
import { lazy } from "react";

import ProtectedRouter from "./ProtectedRouter";

const Login = lazy(() => import("../pages/Login"));

const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminTopic = lazy(() => import("../pages/admin/AdminTopic"));
const AdminQuestions = lazy(() => import("../pages/admin/AdminQuestions"));

const UserDashboard = lazy(() => import("../pages/user/UserDashboard"));
const UserTopic = lazy(() => import("../pages/user/UserTopic"));
const UserQuiz = lazy(() => import("../pages/user/UserQuiz"));
const UserResult = lazy(() => import("../pages/user/UserResult"));
const UserHistory = lazy(() => import("../pages/user/UserHistory"));
const UserResultById = lazy(() => import("../pages/user/UserResultById"));

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
    path: "/admin/topic/:topicId/questions",
    element: (
      <ProtectedRouter role="admin">
        <AdminQuestions/>
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
    path: "/user/history",
    element: (
      <ProtectedRouter role="user">
        <UserHistory/>
      </ProtectedRouter>
    )
  },
  {
    path: "/user/result-detail/:resultId",
    element: (
      <ProtectedRouter role="user">
        <UserResultById/>
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
  }
];
