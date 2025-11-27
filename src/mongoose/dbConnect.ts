
import mongoose from 'mongoose';

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


