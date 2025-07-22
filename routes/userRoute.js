import express from "express";
import { loginController, registerController } from "../controllers/userController.js";

//route object
const router = express.Router()

//routes
//loigin
router.post('/login', loginController);

//register
router.post('/register', registerController)
export default router