import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Dashboard = () => {
  console.log("✅ Dashboard Component Loaded"); // 🔹 Debug เช็คว่ามาไหม

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ✅ Sidebar */}
      <div className="w-64 bg-white border-r shadow-md">
        <Sidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 overflow-auto">
          <Outlet /> {/* ✅ Render child routes */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;