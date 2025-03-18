import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../SideBar Section/Sidebar";
import ProcessQRCode from "../Body Section/ProcessQRCode";
import ProcessDetails from "../Body Section/ProcessDetails"; // ✅ Import ProcessDetails

function ProcessQRCodePage() {
  const { id } = useParams(); // ✅ ดึงค่า ID จาก URL

  return (
    <div className="dashboard flex">
      <div className="dashboardContainer flex">
        <Sidebar />
        {/* ✅ ถ้ามี id ให้แสดง ProcessDetails, ถ้าไม่มีให้แสดง ProcessQRCode */}
        {id ? <ProcessDetails /> : <ProcessQRCode />}
      </div>
    </div>
  );
}

export default ProcessQRCodePage;