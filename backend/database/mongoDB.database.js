import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB = process.env.MONGODB_URI



const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(MONGO_DB)
        console.log("Successfully connected to DB : ", connect.connection.host)
    } catch (error) {
        console.log("Error occured while connecting DB :",error.message)
    }
}

export default connectDB