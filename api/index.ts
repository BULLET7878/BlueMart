import dotenv from "dotenv";
dotenv.config();

import app from "../server/app.ts";
import connectDB from "../server/configs/db.ts";

export default async (req: any, res: any) => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from Vercel Environment Variables. Please add it in the Vercel Dashboard.");
        }
        await connectDB();
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
