// src/layouts/UserLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import ProtectedRoute from "../context/ProtectedRoute";
import SideNav from "../components/sideNav/SideNav";

export default function UserLayout() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
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
