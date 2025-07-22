import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type:String,
    required: [true, 'name is required']
  },
 email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
})

const userModel = mongoose.model('users', userSchema);

export default userModel;