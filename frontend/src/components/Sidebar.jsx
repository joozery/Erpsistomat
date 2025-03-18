import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaQrcode, FaBell, FaChartBar, FaClipboardList } from "react-icons/fa";
import logo from "../assets/logo.png";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col font-['Prompt']">
      {/* ✅ โลโก้ */}
      <div className="p-5 flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-15 h-10" />
      </div>

      {/* ✅ เมนูหลัก */}
      <nav className="flex-1">
        <ul className="space-y-2 px-4">
          <li className="flex items-center p-2 hover:bg-gray-100 rounded text-base">
            <FaChartBar className="mr-3 text-gray-600" />
            <Link to="/dashboard">แดชบอร์ด</Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-100 rounded text-base">
            <FaUsers className="mr-3 text-gray-600" />
            <Link to="/dashboard/user-management">การจัดการผู้ใช้งาน</Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-100 rounded text-base">
            <FaQrcode className="mr-3 text-gray-600" />
            <Link to="/dashboard/process-qrcode">Process QR Code</Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-100 rounded text-base">
            <FaBell className="mr-3 text-gray-600" />
            <Link to="/dashboard/notifications">การแจ้งเตือน</Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-100 rounded text-base">
            <FaClipboardList className="mr-3 text-gray-600" />
            <Link to="/dashboard/monthly-summary">สรุปรายการทั้งหมด</Link>
          </li>
        </ul>
      </nav>

      {/* ✅ Copyright */}
      <div className="text-center text-gray-500 text-sm pb-4">
        © 2025 Sistomat
      </div>
    </div>
  );
};

export default Sidebar;