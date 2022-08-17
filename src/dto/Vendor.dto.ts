export interface CreateVendorInput {
	name: string;
	ownerName: string;
	foodTypes: [string];
	pinCode: string;
	address: string;
	phone: string;
	email: string;
	password: string;
}

export interface EditVendorInputs {
	name: string;
	address: string;
	phone: string;
	foodTypes: [string];
}

export interface VendorLoginInput {
	email: string;
	password: string;
}

export interface VendorPayload {
	_id: string;
	email: string;
	name: string;
	foodTypes: [string];
}
