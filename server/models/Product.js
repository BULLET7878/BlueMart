import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    description: { type: Array, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
