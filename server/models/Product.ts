import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    offerPrice: number;
    description: string[];
    image: string[];
    category: string;
    inStock: boolean;
}

const productSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    description: { type: Array, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.models.product || mongoose.model<IProduct>("product", productSchema);

export default Product;
