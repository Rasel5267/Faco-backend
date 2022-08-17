import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { CreateCustomerInputs, UserLoginInputs, EditCustomerProfileInput } from "../dto";
import { validate } from "class-validator";
import {  GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP, GenerateOtp, ValidatePassword } from "../utility";
import { Customer } from "../models";


export const CustomerSignup = async(req: Request, res: Response, next: NextFunction) => {
	const customerInputs = plainToClass(CreateCustomerInputs, req.body);

	const inputErrors = await validate(customerInputs, { validationError: { target: true }})

	if(inputErrors.length > 0){
		return res.status(400).json(inputErrors)
	}

	const { email, phone, password } = customerInputs;

	const salt = await GenerateSalt();
	const userPassword = await GeneratePassword(password, salt);


	const existCustomer = await Customer.findOne({ email: email })

	if(existCustomer !== null){
		return res.status(400).json({message: 'An user exist with this email ID'})
	}

	const { otp, expiry } = GenerateOtp();
	
	const result = await Customer.create({
		email: email,
        password: userPassword,
        salt: salt,
		firstName: '',
        lastName: '',
        address: '',
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
		verified: false,
        lat: 0,
        lng: 0
	});

	if(result){
		// send the otp to customer
		await onRequestOTP(otp, email);

		// generate signature
		const signature = GenerateSignature({
			_id: result._id,
			email: result.email,
			verified: result.verified
		})

		// send the result
		return res.status(200).json({signature, verified: result.verified, email: result.email})
	}

	return res.json({ msg: "Fail to Signup"});
}

export const CustomerLogin = async(req: Request, res: Response, next: NextFunction) => {
	const customerInputs = plainToClass(UserLoginInputs, req.body);

    const validationError = await validate(customerInputs, {validationError: { target: true}})

    if(validationError.length > 0){
        return res.status(400).json(validationError);
    }

    const { email, password } = customerInputs;
    const customer = await Customer.findOne({ email: email});
    if(customer){
        const validation = await ValidatePassword(password, customer.password, customer.salt);
        
        if(validation){

            const signature = GenerateSignature({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            })

            return res.status(200).json({
                signature,
                email: customer.email,
                verified: customer.verified
            })
        }
    }
	return res.json({ msg: "Fail to SignIn"});
}

export const CustomerVerify = async(req: Request, res: Response, next: NextFunction) => {
	const { otp } = req.body;
	const customer = req.user;

	if(customer){
        const profile = await Customer.findById(customer._id);
        if(profile){
            if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()){
                profile.verified = true;

                const updatedCustomerResponse = await profile.save();

                const signature = GenerateSignature({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                })

                return res.status(200).json({
                    signature,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                })
            }
            
        }

    }

    return res.status(400).json({ msg: 'Unable to verify Customer'});
}

export const GetCustomerProfile = async(req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
 
    if(customer){
        
        const profile =  await Customer.findById(customer._id);
        
        if(profile){
             
            return res.status(201).json(profile);
        }

    }
    return res.status(400).json({ msg: 'Error while Fetching Profile'})
}

export const EditCustomerProfile = async(req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;

    const customerInputs = plainToClass(EditCustomerProfileInput, req.body);

    const validationError = await validate(customerInputs, {validationError: { target: true}})

    if(validationError.length > 0){
        return res.status(400).json(validationError);
    }

    const { firstName, lastName, address } = customerInputs;

    if(customer){
        
        const profile =  await Customer.findById(customer._id);
        
        if(profile){
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const result = await profile.save()
            
            return res.status(201).json(result);
        }

    }
    return res.status(400).json({ msg: 'Error while Updating Profile'});
}