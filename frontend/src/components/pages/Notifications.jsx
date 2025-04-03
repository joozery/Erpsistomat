import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

const getIcon = (type) => {
  const size = "text-xl";
  switch (type) {
    case "success":
      return <FaCheckCircle className={`text-green-500 ${size}`} />;
    case "warning":
      return <FaExclamationTriangle className={`text-yellow-500 ${size}`} />;
    case "error":
      return <FaTimesCircle className={`text-red-500 ${size}`} />;
    case "info":
    default:
      return <FaInfoCircle className={`text-blue-500 ${size}`} />;
  }
};

const mockNotifications = [
  {
    id: 1,
    type: "success",
    title: "อัปโหลดไฟล์สำเร็จ",
    description: "คุณได้อัปโหลดเอกสารไปยังระบบแล้ว",
    time: "5 นาทีที่แล้ว",
  },
  {
    id: 2,
    type: "warning",
    title: "ระบบจะปิดปรับปรุงคืนนี้",
    description: "เริ่มตั้งแต่เวลา 00:00 - 02:00",
    time: "30 นาทีที่แล้ว",
  },
  {
    id: 3,
    type: "error",
    title: "ล้มเหลวในการบันทึกข้อมูล",
    description: "กรุณาตรวจสอบการเชื่อมต่อเครือข่าย",
    time: "1 ชั่วโมงที่แล้ว",
  },
  {
    id: 4,
    type: "info",
    title: "มีเวอร์ชันใหม่ของระบบ",
    description: "กรุณารีเฟรชหน้าเว็บเพื่อใช้งาน",
    time: "เมื่อวานนี้",
  },
];

const Notifications = () => {
  return (
    <div className="p-6 font-['Prompt'] bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">การแจ้งเตือน</h1>

      <div className="space-y-4">
        {mockNotifications.map((note) => (
          <div
            key={note.id}
            className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="mr-4 mt-1">{getIcon(note.type)}</div>
            <div className="flex-1">
              <h2 className="text-base font-semibold">{note.title}</h2>
              <p className="text-sm text-gray-600">{note.description}</p>
              <p className="text-xs text-gray-400 mt-1">{note.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;