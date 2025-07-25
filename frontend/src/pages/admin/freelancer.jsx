import React, { useState, useEffect } from 'react'
import Layout from "./../../components/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";

const Freelancer = () => {

  const [freelancers, setFreelancers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Customize as needed

  const getFreelancers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllFreelancers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setFreelancers(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch freelancers.");
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        {
          freelancerId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getFreelancers(); // refresh list
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getFreelancers();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = freelancers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(freelancers.length / itemsPerPage);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-[#204C41] text-center mb-6">
          Manage Freelancers
        </h2>

        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#204C41] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {freelancers.map((freelancer) => (
                <tr key={freelancer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {freelancer.firstName} {freelancer.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {freelancer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {freelancer.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-3">
                    {freelancer.status === "pending" ? (
                      <button
                        onClick={() => handleAccountStatus(freelancer, "approved")}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAccountStatus(freelancer, "rejected")}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {freelancers.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-500 py-6"
                  >
                    No freelancers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${currentPage === page
                  ? "bg-[#204C41] text-white"
                  : "bg-gray-200 text-gray-700"
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </Layout>

  )
}

export default Freelancer