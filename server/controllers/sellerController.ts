import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

const authService = AuthService.getInstance();

export const sellerLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token } = await authService.sellerLogin({ email, password });

        res.cookie('sellerToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            message: "Logged In"
        });

    } catch (error: any) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const isSellerAuth = async (req: Request, res: Response) => {
    try {
        return res.json({
            success: true
        });
    } catch (error: any) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        });
    }
};

export const sellerLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.json({
            success: true,
            message: "Logged Out Successfully"
        });

    } catch (error: any) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
