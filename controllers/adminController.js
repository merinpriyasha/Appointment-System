import freelancerModel from './../models/freelancerModel.js';
import userModel from '../models/userModels.js';

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({ isAdmin: false });
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

export const getAllFreelancersController = async (req, res) => {
  try {
    const freelancers = await freelancerModel.find({});
    res.status(200).send({
      success: true,
      message: "Freelancer Data list",
      data: freelancers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting freelancer data",
      error,
    });
  }
};

// freelancer account status
export const changeAccountStatusController = async (req, res) => {
  try {
    const { freelancerId, status } = req.body;
    const freelancer = await freelancerModel.findByIdAndUpdate(freelancerId, { status });
    const user = await userModel.findOne({ _id: freelancer.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "freelancer-account-request-updated",
      message: `Your Freelancer Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isFreelancer = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};