import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {

  dbName: 'reactnodeauth'
  
}).then(() => {

  console.log('Database Connected Successfully.');

}).catch((error) => {

  console.error('Error connecting to database:', error);

});

export default mongoose;

