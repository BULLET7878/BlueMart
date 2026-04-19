import { ProductRepository } from '../repositories/ProductRepository.js';
import { v2 as cloudinary } from 'cloudinary';

export class ProductService {
    private static instance: ProductService;
    private productRepository: ProductRepository;

    private constructor() {
        this.productRepository = new ProductRepository();
    }

    public static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    async addProduct(productData: any, images: any[]) {
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(
                    item.path,
                    { resource_type: "image" }
                );
                return result.secure_url;
            })
        );

        return await this.productRepository.create({ ...productData, image: imagesUrl });
    }

    async getAllProducts() {
        return await this.productRepository.find({});
    }

    async getProductById(id: string) {
        return await this.productRepository.findById(id);
    }

    async updateStock(id: string, inStock: boolean) {
        return await this.productRepository.update(id, { inStock } as any);
    }
}
