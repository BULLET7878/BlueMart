import { Request, Response } from "express";
import { ProductService } from "../services/ProductService.js";

const productService = ProductService.getInstance();

export const addProduct = async (req: Request, res: Response) => {
    try {
        const productData = JSON.parse(req.body.productData);
        const images = req.files as Express.Multer.File[];

        const product = await productService.addProduct(productData, images);
        
        console.log("Product Added Successfully");
        res.json({ success: true, message: "Product Added Successfully", product });

    } catch (error: any) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const productList = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.json({ success: true, products });
    } catch (error: any) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const productById = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const product = await productService.getProductById(id);
        res.json({ success: true, product });

    } catch (error: any) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const changeStock = async (req: Request, res: Response) => {
    try {
        const { id, inStock } = req.body;
        await productService.updateStock(id, inStock);
        res.json({ success: true, message: "Stock Updated Successfully" });
    } catch (error: any) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};