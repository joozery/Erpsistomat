import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // ✅ Import React Spinner
import logo from "../../assets/logo.png"; // ✅ Import โลโก้

const API_URL = "https://serversistomat-90ef5fb4c2ca.herokuapp.com/api/users/login";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ State สำหรับ Loading

  // ✅ ฟังก์ชัน Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("📡 กำลังส่งข้อมูลไปที่ API:", { username, password }); // ✅ Debug ก่อนส่งข้อมูล

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log("📩 API Response:", data); // ✅ Debug ผลลัพธ์ที่ได้จาก API

      if (response.ok) {
        // ✅ บันทึก Token และเปลี่ยนหน้าไป Dashboard
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", data.token); // บันทึก token
        navigate("/dashboard");
      } else {
        setError(data.message || "❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
      }
    } catch (err) {
      console.error("❌ API Error:", err); // ✅ Debug ถ้า fetch ไม่สำเร็จ
      setError("❌ มีปัญหาในการเชื่อมต่อเซิร์ฟเวอร์!");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-red-200 font-['Prompt']">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* ✅ โลโก้ */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-18 h-16" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          เข้าสู่ระบบ
        </h2>

        {/* ✅ แสดงข้อความ Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* ✅ ฟอร์ม Login */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none font-medium"
              placeholder="กรอกชื่อผู้ใช้"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-2">
              รหัสผ่าน
            </label>
            <input
              type="password"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none font-medium"
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;