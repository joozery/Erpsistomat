import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const users = [
  {
    id: 1,
    code: 335,
    name: "นายธณรัฐ การญจนเวทย์",
    machines: ["SPAR", "LATHE 2", "ML"],
  },
  {
    id: 2,
    code: 361,
    name: "นายอาชวัตร ยิ้มโภชน์",
    machines: ["LATHE 1", "LATHE 2", "ML"],
  },
  {
    id: 3,
    code: 367,
    name: "นายธีระยุทธ บ้านเปี่ยมขวัญ",
    machines: ["CNC 1", "CNC 2"],
  },
  {
    id: 4,
    code: 395,
    name: "น.ส.จิรัชพร ปานอร่ามวงศ์",
    machines: ["ADMIN 1", "MAT"],
  },
  {
    id: 5,
    code: 407,
    name: "นายณัฐพงศ์ เปล่งพานิช",
    machines: ["LATHE 1", "LATHE 2", "ML"],
  },
  {
    id: 6,
    code: 413,
    name: "นายอาทิตย์ หุ่นสมบูรณ์",
    machines: ["ADMIN 2", "MAT", "QC"],
  },
  {
    id: 7,
    code: 417,
    name: "นายกิตติคุณ สุขเกษม",
    machines: ["LATHE 1", "LATHE 2", "ML"],
  },
  {
    id: 8,
    code: 419,
    name: "นายจารุเดช ปัทมราช",
    machines: ["CNC 4"],
  },
  {
    id: 9,
    code: 421,
    name: "นายพีระพัฒน์ ทับสาร",
    machines: ["CNC 3", "CNC 4"],
  },
  {
    id: 10,
    code: 451,
    name: "น.ส.ณปภัช มโนรส",
    machines: ["QC", "ADMIN 3"],
  },
  {
    id: 11,
    code: 452,
    name: "นายจิรพงษ์ พงศ์ภานิช",
    machines: ["CAM 2", "CNC 3", "CNC 5"],
  },
  {
    id: 12,
    code: 453,
    name: "นายพัฒนชัย ชูใจ",
    machines: ["CAM 1", "CNC 1", "CNC 2"],
  },
];

// 🟦 ใช้สี badge ตามประเภทเครื่องจักร
const getBadgeColor = (machine) => {
  if (machine.includes("LATHE")) return "bg-yellow-100 text-yellow-800";
  if (machine.includes("CNC")) return "bg-purple-100 text-purple-700";
  if (machine.includes("ADMIN")) return "bg-pink-100 text-pink-600";
  if (machine.includes("MAT")) return "bg-green-100 text-green-700";
  if (machine.includes("QC")) return "bg-red-100 text-red-600";
  if (machine.includes("CAM")) return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-700";
};

const UserManagement = () => {
  return (
    <div className="p-6 font-['Prompt'] bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">การจัดการผู้ใช้งาน</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-black text-white uppercase">
            <tr>
              <th className="px-4 py-3">ลำดับ</th>
              <th className="px-4 py-3">รหัส</th>
              <th className="px-4 py-3">รายชื่อ</th>
              <th className="px-4 py-3">เครื่องจักร</th>
              <th className="px-4 py-3 text-center">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.code}</td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {user.machines.map((m, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(
                          m
                        )}`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;