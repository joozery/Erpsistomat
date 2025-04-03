import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaQrcode,
  FaBell,
  FaChartPie,
  FaClipboardList,
  FaTasks,
} from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      label: "แดชบอร์ด",
      path: "/dashboard",
      icon: (isActive) => (
        <HiOutlineViewGrid className={`text-lg ${isActive ? "text-blue-600" : "text-blue-400"}`} />
      ),
    },
    {
      label: "การจัดการผู้ใช้งาน",
      path: "/dashboard/user-management",
      icon: (isActive) => (
        <FaUsers className={`text-lg ${isActive ? "text-purple-600" : "text-purple-400"}`} />
      ),
    },
    {
      label: "Process QR Code",
      path: "/dashboard/process-qrcode",
      icon: (isActive) => (
        <FaQrcode className={`text-lg ${isActive ? "text-green-600" : "text-green-400"}`} />
      ),
    },
    {
      label: "การแจ้งเตือน",
      path: "/dashboard/notifications",
      icon: (isActive) => (
        <FaBell className={`text-lg ${isActive ? "text-red-500" : "text-red-400"}`} />
      ),
    },
    {
      label: "สรุปรายการทั้งหมด",
      path: "/dashboard/monthly-summary",
      icon: (isActive) => (
        <FaChartPie className={`text-lg ${isActive ? "text-gray-800" : "text-gray-500"}`} />
      ),
    },
    {
      label: "แพลนงานทั้งหมด",
      path: "/dashboard/all-plans",
      icon: (isActive) => (
        <FaTasks className={`text-lg ${isActive ? "text-yellow-600" : "text-yellow-400"}`} />
      ),
    },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col font-['Prompt']">
      {/* 🔹 โลโก้ */}
      <div className="p-5 flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-auto h-10" />
      </div>

      {/* 🔹 เมนู */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2 mt-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={index}
                className={`flex items-center gap-3 p-2 rounded-md transition-all duration-150 ${
                  isActive
                    ? "bg-blue-50 text-black font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item.icon(isActive)}
                <Link to={item.path} className="flex-1">
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 🔹 Footer */}
      <div className="text-center text-gray-400 text-xs pb-4 mt-auto">
        © 2025 Sistomat
      </div>
    </div>
  );
};

export default Sidebar;