import React, { useState } from 'react'
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js";
import axios from "axios";
import toast from 'react-hot-toast';

const NotificationPage = () => {

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("unread");
   const dispatch = useDispatch();

  const handleMarkAllRead = async() => {
     try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  const handleDeleteAllRead = async() => {
      try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Somthing Went Wrong In Ntifications");
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-center text-[#204C41] mb-6">
          Notifications
        </h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            onClick={() => setActiveTab("unread")}
            className={`px-4 py-2 rounded-md font-medium ${activeTab === "unread"
              ? "bg-[#204C41] text-white"
              : "bg-gray-100 text-gray-700"
              }`}
          >
            Unread
          </button>
          <button
            onClick={() => setActiveTab("read")}
            className={`px-4 py-2 rounded-md font-medium ${activeTab === "read"
              ? "bg-[#204C41] text-white"
              : "bg-gray-100 text-gray-700"
              }`}
          >
            Read
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end mb-4">
          {activeTab === "unread" ? (
            <button
              onClick={handleMarkAllRead}
              className="text-sm text-[#204C41] hover:underline"
            >
              Mark All Read
            </button>
          ) : (
            <button
              onClick={handleDeleteAllRead}
              className="text-sm text-[#204C41] hover:underline"
            >
              Delete All Read
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {(activeTab === "unread"
            ? user?.notifcation
            : user?.seennotification
          )?.map((notificationMgs, index) => (
            <div
              key={index}
              onClick={() => navigate(notificationMgs.onClickPath)}
              className="bg-white rounded-md shadow-md p-4 cursor-pointer hover:bg-gray-50 transition"
            >
              <p className="text-gray-700">{notificationMgs.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default NotificationPage