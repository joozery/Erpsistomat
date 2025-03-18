import React from "react";

const Notifications = () => {
  const notifications = [
    { id: 1, message: "New user registered", time: "5 mins ago" },
    { id: 2, message: "Payment received from John Doe", time: "30 mins ago" },
    { id: 3, message: "System update available", time: "1 hour ago" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <p className="text-gray-600 mt-2">Recent system notifications.</p>

      <div className="mt-6 bg-white shadow-md rounded p-4">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notif) => (
              <li key={notif.id} className="p-3">
                <p className="text-gray-800">{notif.message}</p>
                <span className="text-gray-500 text-sm">{notif.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications; // ✅ ต้องมี export default
