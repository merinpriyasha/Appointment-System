import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js';

//dotenv config
dotenv.config()

//mongodb connection
connectDB();

//rest object
const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true })); // for form-data (like images)

//routes
app.use('/api/v1/user', userRoutes)

//port 
const port = process.env.PORT || 8080
//listen port
app.listen(port, () => {
  console.log(`Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})
