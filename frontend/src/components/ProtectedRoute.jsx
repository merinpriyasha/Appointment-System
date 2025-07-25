import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [loadingUser, setLoadingUser] = useState(true);

  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    } finally {
      setLoadingUser(false); // always stop loading
    }
  };

  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      getUser();
    } else {
      setLoadingUser(false);
    }
  }, [user]);

  if (loadingUser) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#204C41]"></div>
      </div>
    );
  }

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return children;
}
