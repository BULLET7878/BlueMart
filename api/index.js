import dotenv from "dotenv";
dotenv.config();

import app from "../server/app.js";
import connectDB from "../server/configs/db.js";
import connectCloudinary from "../server/configs/cloudinary.js";

export default async (req, res) => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from Vercel Environment Variables. Please add it in the Vercel Dashboard.");
        }
        await connectDB();
        await connectCloudinary();
        return app(req, res);
    } catch (error) {
        console.error("Vercel Backend Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message
        });
    }
};
