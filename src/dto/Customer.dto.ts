import { IsEmail, IsEmpty, Length } from 'class-validator';

export class CreateCustomerInputs {
	@IsEmail()
	email: string;

	@Length(7, 13)
	phone: string;

	@Length(6, 12)
	password: string;
}

export interface CustomerPayload {
	_id: string;
	email: string;
	verified: boolean
}

export class UserLoginInputs {
	@IsEmail()
	email: string;

	@Length(6, 12)
	password: string;
}

export class EditCustomerProfileInput {
   
    @Length(3,16)
    firstName: string;

    @Length(3,16)
    lastName: string;
    
    @Length(6,30)
    address: string;
}

export class CartItem {
	_id: string;
	unit: number;
}