import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import "./styles/fonts.scss";
import "./styles/sections.scss";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/user/dashboard/Dashboard";
import Error404 from "./pages/error/Error404";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminCreateUser from "./pages/admin/create-user/AdminCreateUser";
import AdminUsers from "./pages/admin/users/AdminUsers";
import UserDetails from "./pages/admin/users/userDetails/UserDetails";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import Profile from "./pages/user/profile/Profile";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import ThemeProvider from "./context/ThemeContext";
import Projects from "./pages/user/workspace/projects/Projects";
import Tasks from "./pages/user/workspace/tasks/Tasks";
import Help from "./pages/user/help/Help";
import RegisterPage from "./pages/register/RegisterPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route index element={<LoginPage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes are nested in a "UserLayout" or "Admin Layout" */}
            {/* Then Each nested route is nested in their respective layout component */}

            {/* Logged In User Only Routes */}
            <Route path="/user" element={<UserLayout />}>
              <Route path="/user/dashboard" element={<Dashboard />} />
              <Route path="/user/profile" element={<Profile />} />

              {/* WORKSPACE */}
              <Route path="/user/workspace/projects" element={<Projects />} />
              <Route path="/user/workspace/tasks" element={<Tasks />} />

              {/* HELP */}
              <Route path="/user/help" element={<Help />} />
            </Route>

            {/* Admin Only Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/create-user" element={<AdminCreateUser />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/users/:userId" element={<UserDetails />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </Route>

            {/* Catch-all route must come last */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
