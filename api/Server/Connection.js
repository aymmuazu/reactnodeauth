import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config()

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)
.then(() => {
    console.log('Database Connected Successfully.')
}).catch((error) => {
    console.log(Error)
})

export default mongoose;