import React from 'react'
import { Form, Input, TimePicker } from "antd";
import Layout from "../components/Layout.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js";
import axios from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";

const ApplyFreelancer = () => {

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-freelancer",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Somthing Went Wrrong ");
    }console.log(values)
  }

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold text-[#204C41] mb-8">
          Apply as a Freelancer
        </h1>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="bg-white shadow-lg p-6 md:p-10 rounded-xl space-y-6"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input className="py-2" placeholder="Your first name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input className="py-2" placeholder="Your last name" />
              </Form.Item>
              <Form.Item
                label="Phone No"
                name="phone"
                rules={[{ required: true, message: "Please enter phone number" }]}
              >
                <Input className="py-2" placeholder="Your contact number" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input className="py-2" type="email" placeholder="Your email" />
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input className="py-2" placeholder="Your website" />
              </Form.Item>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Professional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[{ required: true, message: "Please enter specialization" }]}
              >
                <Input className="py-2" placeholder="Your specialization" />
              </Form.Item>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true, message: "Please enter experience" }]}
              >
                <Input className="py-2" placeholder="Years of experience" />
              </Form.Item>
              <Form.Item
                label="Charge per Task"
                name="freelancerFee"
                rules={[{ required: true, message: "Please enter Charges per Task" }]}
              >
                <Input className="py-2" placeholder="Charges per task" />
              </Form.Item>
              <Form.Item
                label="Timings"
                name="timings"
                rules={[{ required: true, message: "Please select timings" }]}
              >
                <TimePicker.RangePicker
                  format="HH:mm"
                  className="w-full"
                  placeholder={["Start Time", "End Time"]}
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#204C41] text-white px-6 py-2 rounded-md hover:bg-[#183B33] transition"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </Layout>

  )
}

export default ApplyFreelancer