import { Request, Response } from "express";
import { AddressService } from "../services/AddressService.js";

const addressService = AddressService.getInstance();

export const addAddress = async (req: Request, res: Response) => {
  try {
    const { address } = req.body;
    const userId = req.userId;
    await addressService.addAddress({ ...address, userId });
    res.json({ success: true, message: "Address Added Successfully" });

  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
}

export const getAddress = async (req: Request, res: Response) => {
  try {
    const userId = req.userId || req.query.userId;
    const addresses = await addressService.getUserAddresses(userId as string);
    res.json({ success: true, addresses });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
}
