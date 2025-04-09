import mongoose from "mongoose";


export async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });
        connection.on('error', (err) => {
            console.error("MongoDB connection error:");
            console.error(err);
        });
       process.exit();
       
    } catch (error) {
        console.error("MongoDB connection error:");
        console.error(error);
       
    }

}