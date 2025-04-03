import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import Barcode from "react-barcode";

// ✅ ตัวเลือก Dropdown กระบวนการ
const processOptions = [
  "MATERAIL", "QC", "CAM1", "CNC1", "ML", "QC FN", "เสร็จงาน",
  "CNC SPAR", "CAM 1", "CAM 2", "CNC 1", "CNC 2"
];

// ✅ เริ่มด้วย 2 แถว
const initialProcessList = [
  {
    id: 1, process: "MATERAIL", target_time: "00:30", start_time: "",
    stop_time: "", worker_id: "", elapsed_time: "00:00", remark: "-"
  },
  {
    id: 2, process: "CAM1", target_time: "00:30", start_time: "",
    stop_time: "", worker_id: "", elapsed_time: "00:00", remark: "-"
  }
];

const ProcessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [processList, setProcessList] = useState(initialProcessList);
  const [jobDetails, setJobDetails] = useState({
    received_date: "12/03/2568",
    due_date: "20/03/2568"
  });

  // ✅ Real-time elapsed time update
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

  // ✅ Dropdown/Field Handlers
  const handleProcessChange = (index, newValue) => {
    const updatedList = [...processList];
    updatedList[index].process = newValue;
    setProcessList(updatedList);
  };

  const handleInputChange = (index, field, value) => {
    const updatedList = [...processList];
    updatedList[index][field] = value;
    setProcessList(updatedList);
  };

  const handleSave = () => {
    alert("✅ บันทึกข้อมูลสำเร็จ!");
    console.log("📦 บันทึก:", processList);
  };

  const handleAddProcess = () => {
    setProcessList((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        process: "MATERAIL",
        target_time: "00:30",
        start_time: "",
        stop_time: "",
        worker_id: "",
        elapsed_time: "00:00",
        remark: "-"
      },
    ]);
  };

  return (
    <div className="p-6 bg-gray-50 flex-1 overflow-auto font-['Prompt']">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        ย้อนกลับ
      </button>

      {/* 🔳 Header with Barcode */}
      <div className="bg-white rounded-md shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Job {id}</h2>
            <p className="text-sm text-gray-500">JD-{id}</p>
          </div>
          <div className="flex flex-col items-center">
  <Barcode value={id} width={1.5} height={50} fontSize={12} />
  <p className="text-xs mt-1">{id}</p>
</div>
          <div className="text-right space-y-1 mt-4 md:mt-0">
            <p className="text-sm"><span className="font-semibold">วันรับงาน:</span> {jobDetails.received_date}</p>
            <p className="text-sm"><span className="font-semibold">กำหนดส่ง:</span> {jobDetails.due_date}</p>
          </div>
        </div>
      </div>

      {/* 🧾 Process Table */}
      <div className="bg-white rounded-md shadow-md overflow-auto">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-bold">กระบวนการผลิต</h3>
          <button
            onClick={handleAddProcess}
            className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
          >
            เพิ่มกระบวนการ
          </button>
        </div>

        <table className="w-full text-sm border-t">
          <thead>
            <tr className="bg-black text-white text-center">
              <th className="p-3">ลำดับ</th>
              <th className="p-3">กระบวนการ</th>
              <th className="p-3">เป้าหมาย (นาที)</th>
              <th className="p-3">รหัสพนักงาน</th>
              <th className="p-3">เริ่ม</th>
              <th className="p-3">หยุด</th>
              <th className="p-3">รหัสพนักงาน</th>
              <th className="p-3">เริ่ม</th>
              <th className="p-3">หยุด</th>
              <th className="p-3">รวมเวลา</th>
              <th className="p-3">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {processList.map((process, index) => (
              <tr key={index} className="border-b text-center hover:bg-gray-50">
                <td className="p-2">{process.id}</td>
                <td className="p-2">
                  <select
                    value={process.process}
                    onChange={(e) => handleProcessChange(index, e.target.value)}
                    className="border rounded px-2 py-1 text-xs w-full bg-white"
                  >
                    {processOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={process.target_time}
                    onChange={(e) => handleInputChange(index, "target_time", e.target.value)}
                    className="border rounded px-2 py-1 text-xs text-center w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={process.worker_id}
                    onChange={(e) => handleInputChange(index, "worker_id", e.target.value)}
                    className="border rounded px-2 py-1 text-xs text-center w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="time"
                    value={process.start_time}
                    onChange={(e) => handleInputChange(index, "start_time", e.target.value)}
                    className="border rounded px-2 py-1 text-xs w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="time"
                    value={process.stop_time}
                    onChange={(e) => handleInputChange(index, "stop_time", e.target.value)}
                    className="border rounded px-2 py-1 text-xs w-full"
                  />
                </td>
                <td className="p-2">
                  <input type="text" className="border rounded px-2 py-1 text-xs text-center w-full" disabled value="" />
                </td>
                <td className="p-2">
                  <input type="time" className="border rounded px-2 py-1 text-xs w-full" disabled />
                </td>
                <td className="p-2">
                  <input type="time" className="border rounded px-2 py-1 text-xs w-full" disabled />
                </td>
                <td className="p-2 font-semibold text-xs text-green-700">{process.elapsed_time}</td>
                <td className="p-2">
                  <input
                    type="text"
                    value={process.remark}
                    onChange={(e) => handleInputChange(index, "remark", e.target.value)}
                    className="border rounded px-2 py-1 text-xs text-center w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 💾 Save Button */}
      <div className="flex justify-end mt-6">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center space-x-2 shadow"
          onClick={handleSave}
        >
          <FaSave />
          <span>บันทึกข้อมูล</span>
        </button>
      </div>
    </div>
  );
};

export default ProcessDetails;