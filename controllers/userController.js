import userModel from '../models/userModels.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerController = async(req, res) => {
  try{

      const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }

     const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
    
  }catch(error){
    console.log(error)
    res.status(500).send({success: false, message})
  }
}

export const  loginController = () => {
}
