import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const RegisterPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.post("/api/v1/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("Registered Successfully!");
        // setTimeout(() => navigate("/login"), 1000);
        navigate("/login")
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      toast.error("Something went wrong");
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
            <Form.Item
              label="Register As"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select your role">
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="freelancer">Freelancer</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={<span className="text-gray-700 font-medium">Profile Image (optional)</span>}
              name="image"
              valuePropName="file"
              getValueFromEvent={(e) => e?.target?.files?.[0]} // handle file extract
            >
              <label className="block w-full cursor-pointer">

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition"
                />
                {imageFile && (
                  <p className="mt-1 text-sm text-green-700">
                    Selected: {imageFile.name}
                  </p>
                )}
              </label>
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
