import User from "../models/User.js";

export const updateCart= async(req,res)=>{
    const {userId,cartItems}=req.body;

    console.log("Updating cart for user: ", userId, " with items: ", cartItems);

    try{
        await User.findByIdAndUpdate(userId,{cartItems});
        res.json({success:true, message:"Cart Updated Successfully"})   
    }catch(error){
        console.log("Error updating cart: ", error);
        res.json({success:false, message:error.message})
    }
}