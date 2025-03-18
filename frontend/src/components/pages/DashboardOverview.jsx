import React, { useState } from "react";
import { FaUsers, FaChartPie, FaChartBar, FaCheck, FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto"; // ✅ ใช้ Chart.js อัตโนมัติ

const DashboardOverview = () => {
  const [darkMode, setDarkMode] = useState(false);

  // ✅ ข้อมูล Mock สำหรับกราฟวงกลม
  const pieData = {
    labels: ["ทำงานระยะไกล", "ทำงานที่ออฟฟิศ"],
    datasets: [
      {
        data: [65, 35], // 65% Remote, 35% On-site
        backgroundColor: ["#4A90E2", "#C2C2C2"],
        hoverBackgroundColor: ["#357ABD", "#A0A0A0"],
      },
    ],
  };

  // ✅ ข้อมูล Mock สำหรับกราฟแท่ง
  const barData = {
    labels: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
    datasets: [
      {
        label: "โปรเจค",
        data: [50, 120, 180, 200, 230, 280, 310],
        backgroundColor: "#4A90E2",
      },
      {
        label: "งานที่รอ",
        data: [30, 80, 100, 120, 140, 180, 210],
        backgroundColor: "#C2C2C2",
      },
    ],
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen p-6 font-['Prompt']`}>
      
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ภาพรวมระบบ</h1>
        <button 
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* ✅ Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
          <h2 className="text-lg font-bold">จำนวนพนักงานทั้งหมด</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">352</p>
            <span className="text-green-500 flex items-center"><FaArrowUp /> +15%</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
          <h2 className="text-lg font-bold">จำนวนพนักงานลางาน</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">22</p>
            <span className="text-red-500 flex items-center"><FaArrowDown /> -10%</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
          <h2 className="text-lg font-bold">พนักงานใหม่</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">32</p>
            <span className="text-green-500 flex items-center"><FaArrowUp /> +12%</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
          <h2 className="text-lg font-bold">อัตราความสุข</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">82%</p>
            <span className="text-red-500 flex items-center"><FaArrowDown /> -11%</span>
          </div>
        </div>
      </div>

      {/* ✅ กราฟและข้อมูลเพิ่มเติม */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        {/* ✅ กราฟวงกลม */}
        <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4">รูปแบบการทำงาน</h2>
          <Doughnut data={pieData} />
        </div>

        {/* ✅ กราฟแท่ง */}
        <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg col-span-2">
          <h2 className="text-lg font-bold mb-4">ปริมาณงานโครงการ</h2>
          <Bar data={barData} />
        </div>
      </div>

      {/* ✅ รายการสมัครงาน */}
      <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-6">
        <h2 className="text-lg font-bold mb-4">การสมัครงาน</h2>
        <div className="flex items-center space-x-4">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">สมัครทั้งหมด 60%</span>
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">ผ่านคัดเลือก 22%</span>
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">รอพิจารณา 10%</span>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">ปฏิเสธ 8%</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;