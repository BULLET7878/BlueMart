import User, { IUser } from '../models/User.js';
import { BaseRepository } from './BaseRepository.js';

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(User);
    }
}
