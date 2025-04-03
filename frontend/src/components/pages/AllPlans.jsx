import React from "react";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const mockPlans = [
  { department: "MAT", color: "#22c55e", percentage: 75, date: "24 เมษายน 2568" },
  { department: "QC", color: "#ef4444", percentage: 50, date: "24 เมษายน 2568" },
  { department: "CNC", color: "#8b5cf6", percentage: 60, date: "24 เมษายน 2568" },
  { department: "MAT", color: "#22c55e", percentage: 40, date: "24 เมษายน 2568" },
  { department: "QC", color: "#ef4444", percentage: 80, date: "24 เมษายน 2568" },
  { department: "CNC", color: "#8b5cf6", percentage: 90, date: "24 เมษายน 2568" },
];

const summaryData = [
  { department: "MAT", jobs: 17 },
  { department: "QC", jobs: 18 },
  { department: "CNC", jobs: 20 },
  { department: "MAT", jobs: 11 },
  { department: "MAT", jobs: 17 },
  { department: "MAT", jobs: 40 },
  { department: "MAT", jobs: 30 },
];

const AllPlans = () => {
  return (
    <div className="p-6 font-['Prompt'] bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6">สรุปการทำงานระยะเวลาสั้นสุด</h1>

      {/* 🔄 การ์ดแสดงแผน */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {mockPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow flex flex-col items-center justify-center text-center"
          >
            <p className="font-semibold mb-3" style={{ color: plan.color }}>
              กระบวนการ {plan.department}
            </p>
            <div className="w-24 h-24 mb-2">
              <CircularProgressbar
                value={plan.percentage}
                text={`${plan.percentage}%`}
                styles={buildStyles({
                  textColor: "#111",
                  pathColor: plan.color,
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
            <p className="text-sm text-gray-600">
              สิ้นสุดระยะเวลาวันที่ {plan.date}
            </p>
          </div>
        ))}
      </div>

      {/* 📦 สรุปจำนวนงานทั้งหมด (ดีไซน์ใหม่แบบมืออาชีพ) */}
<h2 className="text-lg font-semibold mb-4">จำนวนงานทั้งหมด</h2>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
  {summaryData.map((item, index) => {
    let bgColor = "bg-gray-100";
    let textColor = "text-gray-700";
    if (item.department === "MAT") {
      bgColor = "bg-green-50";
      textColor = "text-green-600";
    } else if (item.department === "QC") {
      bgColor = "bg-red-50";
      textColor = "text-red-600";
    } else if (item.department === "CNC") {
      bgColor = "bg-purple-50";
      textColor = "text-purple-600";
    }

    return (
      <div
        key={index}
        className={`p-5 rounded-xl shadow-sm ${bgColor} border border-gray-200 hover:shadow-md transition-all duration-200`}
      >
        <p className={`text-sm font-medium mb-1 ${textColor}`}>
          แผนก {item.department}
        </p>
        <p className="text-3xl font-bold text-gray-900">{item.jobs} งาน</p>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default AllPlans;