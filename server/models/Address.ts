import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAddress extends Document {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipcode: number;
    country: string;
    phone: string;
}

const addressSchema: Schema = new mongoose.Schema({
    userId:{type:String , required:true},
    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
    email:{type:String , required:true},
    street:{type:String , required:true},
    city:{type:String , required:true},
    state:{type:String , required:true},
    zipcode:{type:Number , required:true},
    country:{type:String , required:true},
    phone:{type:String , required:true},

})

const Address: Model<IAddress> = mongoose.models.address || mongoose.model<IAddress>('address', addressSchema);

export default Address;