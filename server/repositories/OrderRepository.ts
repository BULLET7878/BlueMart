import Order, { IOrder } from '../models/Order.js';
import { BaseRepository } from './BaseRepository.js';

export class OrderRepository extends BaseRepository<IOrder> {
    constructor() {
        super(Order);
    }
}
