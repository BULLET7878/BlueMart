import { Request, Response } from "express";
import { OrderService } from "../services/OrderService.js";

const orderService = OrderService.getInstance();

export const placeOrderCOD = async (req: Request, res: Response) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        await orderService.placeOrderCOD(userId as string, items, address);
        return res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error: any) {
        return res.json({ success: false, message: error.message });
    }
}

export const placeOrderUPI = async (req: Request, res: Response) => {
    try {
        const { items, address, utrNumber } = req.body;
        const userId = req.userId;

        if (!address || items.length === 0 || !utrNumber) {
            return res.json({ success: false, message: "Invalid data or missing UTR" });
        }

        await orderService.placeOrderUPI(userId as string, items, address, utrNumber);
        return res.json({ success: true, message: "Order Placed Successfully. Payment verification pending." });

    } catch (error: any) {
        return res.json({ success: false, message: error.message });
    }
}

export const placeOrderStripe = async (req: Request, res: Response) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        const result = await orderService.placeOrderStripe(userId as string, items, address, origin as string);
        return res.json(result);

    } catch (error: any) {
        return res.json({ success: false, message: error.message });
    }
}

export const stripeWebhooks = async (req: Request, res: Response) => {
    try {
        const sig = req.headers['stripe-signature'];
        await orderService.handleStripeWebhook(req.body, sig as string);
        res.json({ received: true });
    } catch (error: any) {
        console.error("Stripe Webhook Error:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
}

export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.userId || req.query.userId;
        const orders = await orderService.getUserOrders(userId as string);
        res.json({ success: true, orders });
    } catch (error: any) {
        res.json({ success: false, message: error.message });
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json({ success: true, orders });
    } catch (error: any) {
        res.json({ success: false, message: error.message });
    }
}