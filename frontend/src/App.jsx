import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import DashboardOverview from "./components/pages/DashboardOverview";
import Notifications from "./components/pages/Notifications";
import UserManagement from "./components/pages/UserManagement";
import ProcessQRCode from "./components/pages/ProcessQRCode";
import ProcessDetails from "./components/pages/ProcessDetails"; 
import MonthlySummary from "./components/pages/MonthlySummary";
import Login from "./components/pages/Login"; 

// ✅ เช็คว่าผู้ใช้ล็อกอินหรือยัง
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // ✅ ใช้ Token
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Route สำหรับ Login */}
        <Route path="/login" element={<Login />} />

        {/* ✅ ใช้ Dashboard เป็น Layout หลัก */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<DashboardOverview />} /> 
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="process-qrcode" element={<ProcessQRCode />} />
          <Route path="monthly-summary" element={<MonthlySummary />} />
          <Route path="process-details/:id" element={<ProcessDetails />} /> 
        </Route>

        {/* ✅ Default Route ไปที่ Login ก่อน */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ หน้า 404 Not Found */}
        <Route path="*" element={<h1 className="text-center text-red-500 text-3xl">404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;