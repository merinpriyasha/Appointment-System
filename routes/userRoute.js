import express from "express";
import {
  loginController,
  registerController,
  authController, applyFreelancerController, getAllNotificationController, deleteAllNotificationController
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

//route object
const router = express.Router()

//routes
//loigin
router.post('/login', loginController);

//register
router.post('/register', upload.single("image"), registerController)

//Auth
router.post("/getUserData", authMiddleware, authController);

//APply Doctor || POST
router.post("/apply-freelancer", authMiddleware, applyFreelancerController);

//Notifiaction  Freelancer || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
export default router