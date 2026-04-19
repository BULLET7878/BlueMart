import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

const authService = AuthService.getInstance();

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const { user, token } = await authService.register({ name, email, password });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            user: {
                email: user.email,
                name: user.name
            }
        });

    } catch (error: any) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required"
            });
        }

        const { user, token } = await authService.login({ email, password });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            user: {
                email: user.email,
                name: user.name
            }
        });

    } catch (error: any) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const isAuth = async (req: Request, res: Response) => {
    try {
        const user = await authService.getUserById(req.userId as string);

        return res.json({
            success: true,
            user
        });
    } catch (error: any) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
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
