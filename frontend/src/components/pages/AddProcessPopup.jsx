import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddProcessPopup = ({ showPopup, setShowPopup, onProcessAdded }) => {
  const [newProcess, setNewProcess] = useState({
    projectId: "",
    receivedDate: "",
    dueDate: "",
  });

  // 📌 ฟังก์ชันเรียก API เพื่อเพิ่มโปรเจค
  const handleAddProcess = async () => {
    if (!newProcess.projectId || !newProcess.receivedDate || !newProcess.dueDate) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await fetch("https://serversistomat-90ef5fb4c2ca.herokuapp.com/api/projects/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProcess),
      });

      if (!response.ok) {
        throw new Error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }

      alert("เพิ่มโปรเจคสำเร็จ!");
      setShowPopup(false);
      setNewProcess({ projectId: "", receivedDate: "", dueDate: "" });

      if (onProcessAdded) {
        onProcessAdded(); // 📌 ใช้เพื่อ refresh data หลังจากเพิ่มสำเร็จ
      }
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถเพิ่มโปรเจคได้");
    }
  };

  if (!showPopup) return null; // ✅ ไม่แสดง Popup ถ้า showPopup เป็น false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        {/* ✅ Header Popup */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">เพิ่มโปรเจคใหม่</h2>
          <FaTimes className="text-gray-500 cursor-pointer" onClick={() => setShowPopup(false)} />
        </div>

        {/* ✅ ฟอร์มกรอกข้อมูล */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">เลขที่โปรเจค</label>
            <input
              type="text"
              placeholder="เลขที่โปรเจค"
              className="border p-2 w-full rounded-md text-sm mt-1"
              value={newProcess.projectId}
              onChange={(e) => setNewProcess({ ...newProcess, projectId: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">วันที่รับงาน</label>
            <input
              type="date"
              className="border p-2 w-full rounded-md text-sm mt-1"
              value={newProcess.receivedDate}
              onChange={(e) => setNewProcess({ ...newProcess, receivedDate: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">วันที่เริ่มงาน</label>
            <input
              type="date"
              className="border p-2 w-full rounded-md text-sm mt-1"
              value={newProcess.dueDate}
              onChange={(e) => setNewProcess({ ...newProcess, dueDate: e.target.value })}
            />
          </div>
        </div>

        {/* ✅ ปุ่มบันทึก */}
        <div className="flex justify-end mt-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm" onClick={handleAddProcess}>
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProcessPopup;