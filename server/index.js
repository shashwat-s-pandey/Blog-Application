import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/User.js'
import blogRoutes from './routes/blog.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

//connection
mongoose.connect('mongodb+srv://shashwatssp:Ssp%40mongo123@cluster0.zutey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log("MongoDB connection is successful"))
.catch((error)=> console.log("Error in connection", error))

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:3000'
}))

//routes
app.use('/user', userRoutes)
app.use('/blog', blogRoutes)

app.listen(8000, () => console.log("Server running on port 8000"))