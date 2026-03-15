import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Strip from "stripe";
import User from "../models/User.js";


export const placeOrderCOD = async (req, res) => {

    try {
        const { items, address } = req.body;
        const userId = req.userId;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" })

        }
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.productId);
            return (await acc) + product.price * item.quantity;
        }, 0);

        amount += Math.floor(amount * 0.02)

        await Order.create({ userId, items, amount, address, paymentType: "COD", });

        // Clear user's cart after successful order
        await User.findByIdAndUpdate(userId, { cartItems: {} });

        return res.json({ success: true, message: "Order Placed Successfully" })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}





export const placeOrderStripe = async (req, res) => {

    try {
        const { items, address } = req.body;
        const userId = req.userId;
        const { origin } = req.headers;
        if (!address || items.length === 0) {
            console.log("Stripe order failed validation. Address:", address, "Items:", items);
            return res.json({ success: false, message: "Invalid data" })

        }

        let productData = [];
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.productId);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            return (await acc) + product.price * item.quantity;
        }, 0);

        amount += Math.floor(amount * 0.02)

        const order = await Order.create({ userId, items, amount, address, paymentType: "Online", });

        const stripeInstance = new Strip(process.env.STRIPE_SECRET_KEY);

        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: { name: item.name },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity
            }
        })

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }

        })
        return res.json({ success: true, url: session.url })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const stripeWebhooks = async (request, response) => {
    const stripeInstance = new Strip(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers['stripe-signature'];
    let event;

    event = stripeInstance.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
    )

    //handle the event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })

            const { orderId, userId } = session.data[0].metadata;

            await Order.findByIdAndUpdate(orderId, { isPaid: true });

            await User.findByIdAndUpdate(userId, { cartItems: {} })
            break;
        }

        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })

            const { orderId } = session.data[0].metadata;

            await Order.findByIdAndDelete(orderId);

            break;
        }
        default:
            console.error(`Unhandled event type ${event.type}`);
            break;
    }
    response.json({ received: true })


}


export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId || req.query.userId;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.productId address").sort({ createdAt: -1 });
        res.json({ success: true, orders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.productId address").sort({ createdAt: -1 });
        res.json({ success: true, orders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}