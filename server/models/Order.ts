import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrderItem {
    productId: string;
    quantity: number;
}

export interface IOrder extends Document {
    userId: string;
    items: IOrderItem[];
    amount: number;
    address: string;
    status: string;
    paymentType: string;
    isPaid: boolean;
    utrNumber?: string;
}

const orderSchema: Schema = new mongoose.Schema({
    userId:{type:String,required:true, ref:'user'},
    items:[{
        productId:{type:String,required:true, ref:'product'},
        quantity:{type:Number,required:true}
    }],

    amount:{type:Number,required:true},
    address:{type:String,required:true,ref:'address'},
    status:{type:String,default:'Order Placed'},
    paymentType:{type:String,required:true},
    isPaid:{type:Boolean,required:true,default:false},
    utrNumber: { type: String },
},{timestamps:true});

const Order: Model<IOrder> = mongoose.models.order || mongoose.model<IOrder>('order', orderSchema);

export default Order;
