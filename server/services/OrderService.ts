import { OrderRepository } from '../repositories/OrderRepository.js';
import { ProductRepository } from '../repositories/ProductRepository.js';
import { UserRepository } from '../repositories/UserRepository.js';
import Stripe from 'stripe';

export class OrderService {
    private static instance: OrderService;
    private orderRepository: OrderRepository;
    private productRepository: ProductRepository;
    private userRepository: UserRepository;
    private stripe: Stripe;

    private constructor() {
        this.orderRepository = new OrderRepository();
        this.productRepository = new ProductRepository();
        this.userRepository = new UserRepository();
        const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy';
        this.stripe = new Stripe(stripeKey);
    }

    public static getInstance(): OrderService {
        if (!OrderService.instance) {
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }

    async calculateAmount(items: any[]) {
        let amount = 0;
        const productData = [];
        for (const item of items) {
            const product = await this.productRepository.findById(item.productId);
            if (product) {
                amount += product.price * item.quantity;
                productData.push({
                    name: product.name,
                    price: product.offerPrice,
                    quantity: item.quantity
                });
            }
        }
        amount += Math.floor(amount * 0.02);
        return { amount, productData };
    }

    async placeOrderCOD(userId: string, items: any[], address: string) {
        const { amount } = await this.calculateAmount(items);
        await this.orderRepository.create({ userId, items, amount, address, paymentType: "COD" } as any);
        await this.userRepository.update(userId, { cartItems: {} } as any);
        return { success: true };
    }

    async placeOrderUPI(userId: string, items: any[], address: string, utrNumber: string) {
        const { amount } = await this.calculateAmount(items);
        await this.orderRepository.create({ userId, items, amount, address, paymentType: "UPI", utrNumber, isPaid: false } as any);
        await this.userRepository.update(userId, { cartItems: {} } as any);
        return { success: true };
    }

    async placeOrderStripe(userId: string, items: any[], address: string, origin: string) {
        const { amount, productData } = await this.calculateAmount(items);
        const order = await this.orderRepository.create({ userId, items, amount, address, paymentType: "Online" } as any);

        const line_items = productData.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name },
                unit_amount: Math.floor(item.price + item.price * 0.02) * 100
            },
            quantity: item.quantity
        }));

        const session = await this.stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }
        });

        return { success: true, url: session.url };
    }

    async handleStripeWebhook(eventPayload: any, signature: string) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
        let event;

        try {
            event = this.stripe.webhooks.constructEvent(eventPayload, signature, endpointSecret);
        } catch (err: any) {
            throw new Error(`Webhook Error: ${err.message}`);
        }

        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object as any;
                const session = await this.stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                });
                const { orderId, userId } = session.data[0].metadata;
                await this.orderRepository.update(orderId, { isPaid: true } as any);
                await this.userRepository.update(userId, { cartItems: {} } as any);
                break;
            }
            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object as any;
                const session = await this.stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                });
                const { orderId } = session.data[0].metadata;
                await this.orderRepository.delete(orderId);
                break;
            }
        }

        return { success: true };
    }

    async getUserOrders(userId: string) {
        return await this.orderRepository.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        } as any);
    }

    async getAllOrders() {
        return await this.orderRepository.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        } as any);
    }
}
