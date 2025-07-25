import React, { useEffect, useState } from 'react'
import Layout from "../../components/Layout";
import axios from "axios";

const User = () => {

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Fetch users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-center text-[#204C41] mb-6">User List</h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-[#204C41] text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Freelancer</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={user.image || "https://i.pravatar.cc/150?img=3"}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.isFreelancer ? "Yes" : "No"}</td>
                  <td className="px-6 py-4">
                    <button className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-xs">
                      Block
                    </button>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === i + 1
                ? "bg-[#204C41] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default User;