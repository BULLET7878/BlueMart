import Address, { IAddress } from '../models/Address.js';
import { BaseRepository } from './BaseRepository.js';

export class AddressRepository extends BaseRepository<IAddress> {
    constructor() {
        super(Address);
    }
}
