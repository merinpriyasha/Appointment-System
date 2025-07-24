import React from "react";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("Registered Successfully!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100 px-4">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 md:p-10 rounded-xl shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            Register Form
          </h1>
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            className="space-y-4"
          >
            <Form.Item
              label={<span className="text-gray-700 font-medium">Name</span>}
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                className="py-2"
                placeholder="Enter your full name"
                type="text"
                required
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-gray-700 font-medium">Email</span>}
              name="email"
              rules={[
                { required: true, type: "email", message: "Invalid email" },
              ]}
            >
              <Input
                type="email"
                className="py-2"
                placeholder="example@mail.com"
                required
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Password</span>
              }
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password className="py-2" placeholder="••••••••" />
            </Form.Item>
            <Link
              to="/login"
              className="block text-center text-blue-600 hover:underline mt-4 md:mt-6 text-sm md:text-base"
            >
              Already a user? login here
            </Link>
            <button
              className="w-full bg-[#204C41] hover:bg-[#183B33] transition text-white font-semibold py-2 rounded-md"
              type="submit"
            >
              Register
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
