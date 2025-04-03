import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "../SideBar Section/Sidebar"; // ✅ Import Sidebar
import DashboardOverview from "../pages/DashboardOverview";
import ProcessQRCode from "../pages/ProcessQRCode";
import UserManagement from "../pages/UserManagement";
import Notifications from "../pages/Notifications";
import MonthlySummary from "../pages/MonthlySummary";
import ProcessDetails from "../pages/ProcessDetails"; // ✅ Import ProcessDetails
import AllPlans from "../pages/AllPlans"; // ✅ Import หน้าแพลนงานทั้งหมด

const MainContent = () => {
  const location = useLocation();
  const { id } = useParams(); // ✅ ใช้ useParams() ดึงค่า id ถ้ามี
  const currentPath = location.pathname;

  return (
    <div className="dashboard flex">
      <Sidebar /> {/* ✅ แสดง Sidebar ทุกหน้า */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        
        {/* ✅ แสดงเนื้อหาตามเส้นทาง */}
        {currentPath === "/dashboard" && <DashboardOverview />}
        {currentPath === "/dashboard/process-qrcode" && <ProcessQRCode />}
        {currentPath === "/dashboard/user-management" && <UserManagement />}
        {currentPath === "/dashboard/notifications" && <Notifications />}
        {currentPath === "/dashboard/monthly-summary" && <MonthlySummary />}
        {currentPath === "/dashboard/all-plans" && <AllPlans />}

        {/* ✅ รองรับ path `/dashboard/process-details/:id` */}
        {currentPath.startsWith("/dashboard/process-details/") && id && (
          <ProcessDetails id={id} />
        )}

        {/* ✅ แสดงข้อความ Default ถ้าไม่มีเส้นทางที่ตรงกัน */}
        {![
          "/dashboard",
          "/dashboard/process-qrcode",
          "/dashboard/user-management",
          "/dashboard/notifications",
          "/dashboard/monthly-summary",
        ].includes(currentPath) &&
          !currentPath.startsWith("/dashboard/process-details/") && (
            <h1 className="text-2xl font-bold text-red-500">Page Not Found</h1>
          )}
      </div>
    </div>
  );
};

export default MainContent;