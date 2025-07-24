import express from "express";
import { loginController, registerController, authController } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

//route object
const router = express.Router()

//routes
//loigin
router.post('/login', loginController);

//register
router.post('/register', registerController)

//Auth
router.post("/getUserData", authMiddleware, authController);

export default router