import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "./Server/Connection.js";
import router from './Routes/Router.js'
dotenv.config();
const app = express();


app.use(express.json())
app.use(cors())

app.use('/api/', router)

const PORT = process.env.PORT || 8000

app.listen(PORT, (error) => {
    console.log(`Server logged at port ${PORT}`)
})