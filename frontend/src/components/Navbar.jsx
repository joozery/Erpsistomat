import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCalendarAlt, FaFilter, FaFileExport, FaCaretDown } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "Guest",
    role: "Guest",
    profilePic: "/default-profile.png", // ✅ รูป Default
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ ดึงข้อมูล User จาก LocalStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        username: storedUser.username || "User",
        role: storedUser.role || "Member",
        profilePic: storedUser.profilePic || "/default-profile.png",
      });
    }
  }, []);

  // ✅ ฟังก์ชัน Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center relative">
      {/* ✅ Welcome Message */}
      <div>
        <h1 className="text-lg font-bold">Welcome {user.username}!</h1>
        <p className="text-sm text-gray-500">Today is {new Date().toDateString()}</p>
      </div>

      {/* ✅ Filters & Actions */}
      <div className="flex items-center space-x-3">
        <button className="flex items-center border p-2 rounded text-gray-600 text-sm">
          <FaCalendarAlt className="mr-2" /> Sep 11 - Oct 10
        </button>
        <button className="border p-2 rounded text-gray-600 text-sm">Monthly ▼</button>
        <button className="flex items-center border p-2 rounded text-gray-600 text-sm">
          <FaFilter className="mr-2" /> Filter
        </button>
        <button className="flex items-center border p-2 rounded text-gray-600 text-sm">
          <FaFileExport className="mr-2" /> Export
        </button>
      </div>

      {/* ✅ User Profile with Dropdown */}
      <div className="relative">
        <button 
          className="flex items-center space-x-3 focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src={user.profilePic} alt="User" className="w-10 h-10 rounded-full" />
          <div className="text-left">
            <h2 className="text-sm font-bold">{user.username}</h2>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <FaCaretDown className="text-gray-500 ml-2" />
        </button>

        {/* ✅ Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border p-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
            >
              ออกจากระบบ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;