import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const OrderPlaced = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
            <div className="w-24 h-24 mb-6 bg-primary/10 rounded-full flex justify-center items-center">
                <svg
                    className="w-12 h-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    ></path>
                </svg>
            </div>
            <h2 className="text-3xl font-semibold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                Thank you for your purchase. Your order has been received and is being processed.
                You will receive a confirmation email shortly.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/my-orders"
                    className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dull transition"
                >
                    View My Orders
                </Link>
                <Link
                    to="/products"
                    className="px-6 py-2 border border-primary text-primary rounded hover:bg-primary/5 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderPlaced;
