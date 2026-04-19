import { AddressRepository } from '../repositories/AddressRepository.js';

export class AddressService {
    private static instance: AddressService;
    private addressRepository: AddressRepository;

    private constructor() {
        this.addressRepository = new AddressRepository();
    }

    public static getInstance(): AddressService {
        if (!AddressService.instance) {
            AddressService.instance = new AddressService();
        }
        return AddressService.instance;
    }

    async addAddress(addressData: any) {
        return await this.addressRepository.create(addressData);
    }

    async getUserAddresses(userId: string) {
        return await this.addressRepository.find({ userId });
    }

    async deleteAddress(id: string) {
        return await this.addressRepository.delete(id);
    }
}
