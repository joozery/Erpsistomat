import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaChartBar, FaArrowUp, FaArrowDown } from "react-icons/fa";

const MonthlySummary = () => {
  const [darkMode, setDarkMode] = useState(false);

  // ✅ ข้อมูลสำหรับกราฟแท่ง (Mock Data)
  const barData = {
    labels: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
    datasets: [
      {
        label: "รายได้รวม (บาท)",
        data: [50000, 45000, 60000, 55000, 70000, 68000],
        backgroundColor: "#4A90E2",
      },
      {
        label: "จำนวนออเดอร์",
        data: [1200, 1100, 1400, 1300, 1500, 1600],
        backgroundColor: "#FFC107",
      },
    ],
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen p-6 font-['Prompt']`}>
      
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">สรุปผลการดำเนินงานรายเดือน</h1>
        <button 
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* ✅ Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
          <h2 className="text-lg font-bold">รายได้รวม</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">฿70,000</p>
            <span className="text-green-500 flex items-center"><FaArrowUp /> +15%</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
          <h2 className="text-lg font-bold">ลูกค้าใหม่</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">480 คน</p>
            <span className="text-red-500 flex items-center"><FaArrowDown /> -5%</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
          <h2 className="text-lg font-bold">จำนวนออเดอร์</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">1,600 รายการ</p>
            <span className="text-green-500 flex items-center"><FaArrowUp /> +12%</span>
          </div>
        </div>
      </div>

      {/* ✅ กราฟแท่งแสดงสถิติรายเดือน */}
      <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-6">
        <h2 className="text-lg font-bold mb-4 flex items-center"><FaChartBar className="mr-2" /> กราฟสรุปรายเดือน</h2>
        <Bar data={barData} />
      </div>

      {/* ✅ ตารางสรุปรายเดือน */}
      <div className="p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-6">
        <h2 className="text-lg font-bold mb-4">รายละเอียดสรุปรายเดือน</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 border-b text-sm">
              <th className="p-3">เดือน</th>
              <th className="p-3">รายได้รวม (บาท)</th>
              <th className="p-3">ลูกค้าใหม่</th>
              <th className="p-3">จำนวนออเดอร์</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 text-sm">
              <td className="p-3">มกราคม</td>
              <td className="p-3">฿50,000</td>
              <td className="p-3">500</td>
              <td className="p-3">1,200</td>
            </tr>
            <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 text-sm">
              <td className="p-3">กุมภาพันธ์</td>
              <td className="p-3">฿45,000</td>
              <td className="p-3">480</td>
              <td className="p-3">1,100</td>
            </tr>
            <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 text-sm">
              <td className="p-3">มีนาคม</td>
              <td className="p-3">฿60,000</td>
              <td className="p-3">530</td>
              <td className="p-3">1,400</td>
            </tr>
            <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 text-sm">
              <td className="p-3">เมษายน</td>
              <td className="p-3">฿55,000</td>
              <td className="p-3">520</td>
              <td className="p-3">1,300</td>
            </tr>
            <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 text-sm">
              <td className="p-3">พฤษภาคม</td>
              <td className="p-3">฿70,000</td>
              <td className="p-3">480</td>
              <td className="p-3">1,500</td>
            </tr>
            <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 text-sm">
              <td className="p-3">มิถุนายน</td>
              <td className="p-3">฿68,000</td>
              <td className="p-3">490</td>
              <td className="p-3">1,600</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlySummary;