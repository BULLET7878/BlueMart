import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    cartItems: any;
}

const userSchema: Schema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true , unique: true},
    password:{type:String , required:true},
    cartItems:{type:Object , default:{}},

},{minimize: false});


const User: Model<IUser> = mongoose.models.user || mongoose.model<IUser>('User', userSchema);

export default User;