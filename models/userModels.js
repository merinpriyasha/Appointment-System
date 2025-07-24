import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
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
  image: {
    type: String, // Store image URL
    default: "https://i.pravatar.cc/150?img=3"
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isFreelancer: {
    type: Boolean,
    default: false,
  },
  notifcation: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
})

const userModel = mongoose.model('users', userSchema);

export default userModel;