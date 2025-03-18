import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useLoading, Oval } from "@agney/react-loading"; // ✅ ใช้ React Loading
import AddProcessPopup from "./AddProcessPopup"; // ✅ Import Popup

const API_URL = "https://serversistomat-90ef5fb4c2ca.herokuapp.com/api/projects"; // ✅ URL ของ Backend

const ProcessQRCode = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [processList, setProcessList] = useState([]); // ✅ ใช้ state แทนค่าเริ่มต้น
  const [loading, setLoading] = useState(true); // ✅ เพิ่ม state โหลดข้อมูล
  const [showPopup, setShowPopup] = useState(false);
  const [newProcess, setNewProcess] = useState({ projectId: "", receivedDate: "", dueDate: "" });

  const navigate = useNavigate();
  const itemsPerPage = 5;

  // ✅ ใช้ React Loading
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval width="50" />,
  });

  // ✅ ดึงข้อมูลโปรเจคจาก API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProcessList(data);
        setLoading(false); // ✅ ปิด Loading เมื่อโหลดเสร็จ
      })
      .catch((err) => {
        console.error("❌ ไม่สามารถโหลดข้อมูล:", err);
        setLoading(false);
      });
  }, []);

  // ✅ ฟังก์ชันจัดรูปแบบวันที่ให้เป็น YYYY-MM-DD
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split("T")[0] : "-";
  };

  // ✅ กรองข้อมูลที่ค้นหา
  const filteredList = processList.filter((process) =>
    process.project_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ คำนวณหน้าปัจจุบันของข้อมูล
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  // ✅ เปลี่ยนหน้า
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-100 flex-1 overflow-auto font-['Prompt']">
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Process QR Code</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="ค้นหากระบวนการ..."
              className="border p-2 pl-9 rounded-md text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-red-700 text-white px-4 py-2 rounded-md text-sm" onClick={() => setShowPopup(true)}>
            + เพิ่มกระบวนการ
          </button>
        </div>
      </div>

      {/* ✅ แสดง Loading */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]" {...containerProps}>
          {indicatorEl}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {/* ✅ ตารางข้อมูล */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 border-b text-sm">
                <th className="p-3">เลขที่โปรเจค</th>
                <th className="p-3">อยู่ในขั้นตอน</th>
                <th className="p-3">วันที่รับงาน</th>
                <th className="p-3">ระยะเวลาทั้งหมด</th>
                <th className="p-3">กำหนดส่ง</th>
                <th className="p-3">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((process) => (
                <tr key={process.project_id} className="border-b hover:bg-gray-100 text-sm">
                  <td className="p-3">{process.project_id}</td>
                  <td className="p-3">QC</td> {/* ✅ Mock Data */}
                  <td className="p-3">{formatDate(process.received_date)}</td>
                  <td className="p-3">40 นาที</td> {/* ✅ Mock Data */}
                  <td className="p-3">{formatDate(process.due_date)}</td>
                  <td className="p-3">
                    <button 
                      className="text-blue-500 hover:underline text-xs" 
                      onClick={() => navigate(`/dashboard/process-details/${process.project_id}`)}
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Pagination */}
          <div className="flex justify-end mt-4">
            {[...Array(Math.ceil(filteredList.length / itemsPerPage)).keys()].map((number) => (
              <button
                key={number}
                className={`px-3 py-1 mx-1 border rounded text-sm ${currentPage === number + 1 ? "bg-red-700 text-white" : ""}`}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ✅ ใช้ Component Popup */}
      <AddProcessPopup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        newProcess={newProcess}
        setNewProcess={setNewProcess}
      />
    </div>
  );
};

export default ProcessQRCode;