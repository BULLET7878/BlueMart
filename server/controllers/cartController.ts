import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

const authService = AuthService.getInstance();

export const updateCart = async (req: Request, res: Response) => {
    const { userId, cartItems } = req.body;

    console.log("Updating cart for user: ", userId, " with items: ", cartItems);

    try {
        await authService.updateCart(userId, cartItems);
        res.json({ success: true, message: "Cart Updated Successfully" });
    } catch (error: any) {
        console.log("Error updating cart: ", error);
        res.json({ success: false, message: error.message });
    }
}