import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
    constructor(protected model: Model<T>) {}

    async create(data: Partial<Record<keyof T, any>>): Promise<T> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async findOne(query: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(query);
    }

    async find(query: FilterQuery<T> = {}): Promise<T[]> {
        return await this.model.find(query);
    }

    async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }
}
