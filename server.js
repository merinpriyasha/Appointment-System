import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'

//dotenv config
dotenv.config()
//rest object
const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => {
  res.status(200).send({
    message: "server running"
  })
})

//port 
const port = process.env.PORT || 8080
//listen port
app.listen(port, () => {
  console.log(`Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})
