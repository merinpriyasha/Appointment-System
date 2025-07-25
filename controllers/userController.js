import userModel from '../models/userModels.js'
import freelancerModel from '../models/freelancerModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cloudinary from "../config/cloudinary.js";

export const registerController = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // upload image to Cloudinary
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "user_profiles" },
        (error, result) => {
          if (result?.secure_url) {
            imageUrl = result.secure_url;
            saveUser(); // Call the function below
          } else {
            return res.status(500).send({ success: false, message: "Cloudinary upload failed" });
          }
        }
      );

      // write stream to cloudinary
      result.end(req.file.buffer);
    } else {
      saveUser(); // If no image, still register
    }

    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }


    // Defensive check
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    async function saveUser() {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        image: imageUrl || undefined,
        isFreelancer: role === "freelancer",
        isAdmin: role === 'admin'
      });
      await newUser.save();
      res.status(201).send({ message: "Register Sucessfully", success: true });
    }

  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message })
  }
}

//login controller
export const loginController = async (req, res) => {

  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }

}

export const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.userId });
    user.password = undefined; //password hide
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

//Apply Doctor controller
export const applyFreelancerController = async (req, res) => {
  try {
    const newFreelancer = await freelancerModel({ ...req.body, status: "pending" });
    await newFreelancer.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-freelancer-request",
      message: `${newFreelancer.firstName} ${newFreelancer.lastName} Has Applied For A Freelancer Account`,
      data: {
        freelancerId: newFreelancer._id,
        name: newFreelancer.firstName + " " + newFreelancer.lastName,
        onClickPath: "/admin/freelancers",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Freelancer Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Freelancer",
    });
  }
};

//notification ctrl
export const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userId });
    const seennotification = user.seennotification;
    const notifcation = user.notifcation;
    seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification = notifcation;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// delete notifications
export const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notifcation = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};