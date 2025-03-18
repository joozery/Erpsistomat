import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave, FaClock, FaUser } from "react-icons/fa";
import QRCode from "react-qr-code"; // ✅ ใช้ react-qr-code

// ✅ ตัวเลือก Dropdown กระบวนการ
const processOptions = ["MATERAIL", "QC", "CAM1", "CNC1", "ML", "QC FN", "เสร็จงาน","CNC SPAR","CAM 1","CAM 2","CNC 1","CNC 2"];

// ✅ Mockup Data
const initialProcessList = Array(10).fill().map((_, index) => ({
  id: index + 1,
  process: "MATERAIL",
  target_time: "00:30",
  start_time: "",
  stop_time: "",
  worker_id: "",
  elapsed_time: "00:00",
  remark: "-"
}));

const ProcessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [processList, setProcessList] = useState(initialProcessList);
  const [jobDetails, setJobDetails] = useState({ received_date: "2025-03-18", due_date: "2025-03-25" });

  // ✅ อัปเดตเวลาแบบเรียลไทม์เมื่อกระบวนการกำลังทำงาน
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessList((prevList) =>
        prevList.map((process) => {
          if (process.start_time && !process.stop_time) {
            const start = new Date(`2024-01-01T${process.start_time}:00`);
            const now = new Date();
            const elapsedMs = now - start;
            const elapsedMin = Math.floor(elapsedMs / 60000);
            const elapsedHours = Math.floor(elapsedMin / 60);
            const elapsedMins = elapsedMin % 60;

            return {
              ...process,
              elapsed_time: `${String(elapsedHours).padStart(2, "0")}:${String(elapsedMins).padStart(2, "0")}`,
            };
          }
          return process;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ ฟังก์ชันเปลี่ยนค่าของ Dropdown (กระบวนการ)
  const handleProcessChange = (index, newValue) => {
    const updatedList = [...processList];
    updatedList[index].process = newValue;
    setProcessList(updatedList);
  };

  // ✅ ฟังก์ชันเปลี่ยนค่าของ `input`
  const handleInputChange = (index, field, value) => {
    const updatedList = [...processList];
    updatedList[index][field] = value;
    setProcessList(updatedList);
  };

  // ✅ บันทึกข้อมูล
  const handleSave = () => {
    alert("✅ บันทึกข้อมูลสำเร็จ!");
    console.log("🔹 ข้อมูลที่บันทึก:", processList);
  };

  return (
    <div className="p-6 bg-gray-100 flex-1 overflow-auto font-['Prompt']">
      {/* ✅ ปุ่มย้อนกลับ */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        ย้อนกลับ
      </button>

      {/* ✅ ข้อมูล JOB */}
      <div className="bg-yellow-300 p-6 rounded-md mb-6 shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800">กระบวนการผลิต</h2>
        <div className="flex justify-between mt-3 text-lg font-semibold text-gray-700">
          <span>📌 JOB: {id}</span>
          <span>📅 วันที่รับงาน: {jobDetails.received_date}</span>
          <span>⏳ กำหนดส่ง: {jobDetails.due_date}</span>
        </div>
      </div>

      {/* ✅ ตารางข้อมูล */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-300 border-b text-gray-700">
              <th className="p-3">ลำดับที่</th>
              <th className="p-3">กระบวนการ</th>
              <th className="p-3">เป้าหมาย (นาที) <FaClock className="inline" /></th>
              <th className="p-3">เริ่ม</th>
              <th className="p-3">หยุด</th>
              <th className="p-3">รวมเวลา</th>
              <th className="p-3">รหัสพนักงาน <FaUser className="inline" /></th>
              <th className="p-3">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {processList.map((process, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{process.id}</td>
                <td className="p-3">
                  <select className="border p-2 rounded w-full" value={process.process} onChange={(e) => handleProcessChange(index, e.target.value)}>
                    {processOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <input type="time" className="border p-2 rounded w-full" step="60" value={process.target_time} onChange={(e) => handleInputChange(index, "target_time", e.target.value)} />
                </td>
                <td className="p-3">
                  <input type="time" className="border p-2 rounded w-full" step="60" value={process.start_time} onChange={(e) => handleInputChange(index, "start_time", e.target.value)} />
                </td>
                <td className="p-3">
                  <input type="time" className="border p-2 rounded w-full" step="60" value={process.stop_time} onChange={(e) => handleInputChange(index, "stop_time", e.target.value)} />
                </td>
                <td className="p-3 text-center font-bold">{process.elapsed_time}</td>
                <td className="p-3">
                  <input type="text" className="border p-2 rounded w-full text-center" value={process.worker_id} onChange={(e) => handleInputChange(index, "worker_id", e.target.value)} />
                </td>
                <td className="p-3">
                  <input type="text" className="border p-2 rounded w-full text-center" value={process.remark} onChange={(e) => handleInputChange(index, "remark", e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ ปุ่มบันทึก */}
      <div className="flex justify-end mt-6">
        <button className="bg-green-600 text-white px-6 py-3 rounded-md flex items-center space-x-2 hover:bg-green-700" onClick={handleSave}>
          <FaSave className="mr-2" />
          <span>บันทึกข้อมูล</span>
        </button>
      </div>
    </div>
  );
};

export default ProcessDetails;