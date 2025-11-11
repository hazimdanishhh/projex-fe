// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import ProtectedRoute from "../context/ProtectedRoute";
import SideNav from "../components/sideNav/SideNav";

export default function AdminLayout() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="content">
        <SideNav />

        <main>
          <Navbar />
          <Outlet />
          {/* Renders the nested admin page */}
        </main>
      </div>
    </ProtectedRoute>
  );
}
