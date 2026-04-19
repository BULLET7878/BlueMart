import Product, { IProduct } from '../models/Product.js';
import { BaseRepository } from './BaseRepository.js';

export class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(Product);
    }
}
