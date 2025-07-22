import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white)
  }catch(error){
    console.log(`Mongodb server issue ${error}`.bgRed.white)
  }
}

export default connectDB;