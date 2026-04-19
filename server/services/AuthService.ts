import { UserRepository } from '../repositories/UserRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
    private static instance: AuthService;
    private userRepository: UserRepository;

    private constructor() {
        this.userRepository = new UserRepository();
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async register(userData: { name: string, email: string, password: string }) {
        const { name, email, password } = userData;

        const existingUser = await this.userRepository.findOne({ email });
        if (existingUser) {
            throw new Error("User Already Exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword
        } as any);

        const token = this.generateToken(user._id.toString());
        return { user, token };
    }

    async login(userData: { email: string, password: string }) {
        const { email, password } = userData;

        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid Credentials");
        }

        const token = this.generateToken(user._id.toString());
        return { user, token };
    }

    async sellerLogin(userData: { email: string, password: string }) {
        const { email, password } = userData;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
            return { token };
        } else {
            throw new Error("Invalid Credentials");
        }
    }

    async getUserById(userId: string) {
        return await this.userRepository.findById(userId);
    }

    async updateCart(userId: string, cartItems: any) {
        return await this.userRepository.update(userId, { cartItems } as any);
    }

    private generateToken(userId: string): string {
        return jwt.sign(
            { id: userId },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );
    }
}
