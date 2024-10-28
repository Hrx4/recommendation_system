import mongoose from "mongoose";
export const connectDB = async() => {
    try {
        if(process.env.MONGODB_URI)
        {const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo Connected ${conn}`);}

    else return null
    } catch (error ) {
        console.log(error)
        throw new Error ("MONGODB_URI is not set")
    }
};
