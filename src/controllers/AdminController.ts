import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVendor = async(id: string | undefined, email?: string) => {
	if(email){
		return await Vendor.findOne({ email: email })
	}else {
		return await Vendor.findById(id)
	}
}

export const CreateVendor = async (req:Request, res: Response, next: NextFunction) => {
	const { name, ownerName, foodTypes, pinCode, address, phone, email, password } = <CreateVendorInput>req.body;

	const existVendor = await FindVendor('', email);

	if(existVendor !== null){
		return res.json({ msg: "A vendor is exist with this email ID"});
	}

	// generate a salt
	const salt = await GenerateSalt();
	const userPassword = await GeneratePassword(password, salt);
	// encrypt password

	const CreateVendor = await Vendor.create({
		name: name, 
		ownerName: ownerName, 
		foodTypes: foodTypes, 
		pinCode: pinCode, 
		address: address, 
		phone: phone, 
		email: email, 
		password: userPassword,
		salt: salt,
		serviceAvailable: false,
		coverImage: [],
		rating: 0,
		foods: []
	})
	return res.json(CreateVendor)
}

export const GetVendors = async (req:Request, res: Response, next: NextFunction) => {
	const vendors = await Vendor.find();

	if(vendors !== null){
		return res.json(vendors)
	}

	return res.json({ msg: "vendors data not available" })
}

export const GetVendorById = async (req:Request, res: Response, next: NextFunction) => {
	const vendorId = req.params.id;

	const vendor = await FindVendor(vendorId);

	if(vendor !== null){
		return res.json(vendor)
	}

	return res.json({ msg: "vendor data not available" })
}