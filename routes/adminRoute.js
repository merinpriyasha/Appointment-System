import express from 'express';

import {
  getAllUsersController,
  getAllFreelancersController,
  changeAccountStatusController,
} from "../controllers/adminController.js"
import authMiddleware from "../middlewares/authMiddleware.js/"

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || Freelancer
router.get("/getAllFreelancers", authMiddleware, getAllFreelancersController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

export default router;