import { Request, Response, NextFunction } from "express";
import { CreateFoodInputs, EditVendorInputs, VendorLoginInput } from "../dto";
import { Food } from "../models";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVendor } from "./AdminController";

export const VendorLogin = async (req:Request, res: Response, next: NextFunction) => {
	const { email, password } = <VendorLoginInput>req.body;

	const existingVendor = await FindVendor('', email);

	if(existingVendor !== null){
		// validation and give access
		const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);

		if(validation){
			const signature = GenerateSignature({
				_id: existingVendor.id,
				email: existingVendor.email,
				foodTypes: existingVendor.foodTypes,
				name: existingVendor.name
			})
			return res.json(signature);
		}else {
			return res.json({ msg : "Password is not valid" });
		}
	}

	return res.json({ msg : "Vendor does not exist with this email ID" });
}

export const GetVendorProfile = async (req:Request, res: Response, next: NextFunction) => {
	const user = req.user;

	if(user){
		const existingVendor = await FindVendor(user._id)
		return res.json(existingVendor)
	}

	return res.json({ msg : "Vendor info not found" })
}

export const UpdateVendorProfile = async (req:Request, res: Response, next: NextFunction) => {
	
	const { name, address, phone, foodTypes } = <EditVendorInputs>req.body;
	const user = req.user;

	if(user){
		const existingVendor = await FindVendor(user._id);

		if(existingVendor !== null){
			existingVendor.name = name;
			existingVendor.address = address;
			existingVendor.phone = phone;
			existingVendor.foodTypes = foodTypes;

			const saveResult = await existingVendor.save();
			return res.json(saveResult);
		}
		return res.json(existingVendor);
	}

	return res.json({ msg : "Vendor info not found" });
}

export const UpdateVendorService = async (req:Request, res: Response, next: NextFunction) => {
	const user = req.user;

	if(user){
		const existingVendor = await FindVendor(user._id);
		
		if(existingVendor !== null){
			existingVendor.serviceAvailable = !existingVendor.serviceAvailable
			const saveResult = await existingVendor.save()
			return res.json(saveResult)
		}
		return res.json(existingVendor);
	}

	return res.json({ msg : "Vendor info not found" });
}

export const UpdateVendorCoverImage = async (req:Request, res: Response, next: NextFunction) => {
	const user = req.user;

	if(user){

		const vendor = await FindVendor(user._id);

		if(vendor !== null){
			const files = req.files as [Express.Multer.File]
			const images = files.map((file: Express.Multer.File) => file.filename);

			vendor.coverImage.push(...images);

			const result = await vendor.save();

			return res.json(result);
		}
	}

	return res.json({ msg : "Something went wrong with add cover image" });
}

export const AddFood = async (req:Request, res: Response, next: NextFunction) => {
	const user = req.user;

	if(user){
		const { name, description, category, foodTypes, readyTime, price } = <CreateFoodInputs>req.body;

		const vendor = await FindVendor(user._id);

		if(vendor !== null){
			const files = req.files as [Express.Multer.File]
			const images = files.map((file: Express.Multer.File) => file.filename);

			const createFood = await Food.create({
				vendorId: vendor._id,
				name: name,
				description: description,
				category: category,
				foodTypes: foodTypes,
				images: images,
				readyTime: readyTime,
				price: price,
				rating: 0
			})

			vendor.foods.push(createFood);
			const result = await vendor.save();

			return res.json(result);
		}
	}

	return res.json({ msg : "Something went wrong with add food" });
}

export const GetFoods = async (req:Request, res: Response, next: NextFunction) => {
	const user = req.user;

	if(user){
		const foods = await Food.find({ vendorId: user._id })

		if(foods !== null){
			return res.json(foods)
		}

		return res.json({ msg : "Food Not Available right now" })
	}

	return res.json({ msg : "Foods info not found" });
}