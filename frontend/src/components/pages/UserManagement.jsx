import React from "react";

const UserManagement = () => {
  const users = [
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Editor", status: "Inactive" },
    { id: 3, name: "Mike Johnson", role: "User", status: "Active" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <p className="text-gray-600 mt-2">Manage system users and their roles.</p>

      <div className="mt-6 bg-white shadow-md rounded p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.role}</td>
                <td className={`p-3 ${user.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; // ✅ ต้องมี export default
