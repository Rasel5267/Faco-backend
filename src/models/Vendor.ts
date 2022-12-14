import mongoose, { Schema, Document } from "mongoose";

interface VendorDoc extends Document {
	name: string;
	ownerName: string;
	foodTypes: [string];
	pinCode: string;
	address: string;
	phone: string;
	email: string;
	password: string;
	salt: string;
	serviceAvailable: boolean,
	coverImage: string,
	public_id: string,
	rating: number,
	foods: any
}

const VendorSchema = new Schema({
	name: { type: String, required: true },
	ownerName: { type: String, required: true },
	foodTypes: { type: [String] },
	pinCode: { type: String, required: true },
	address: { type: String },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	salt: { type: String, required: true },
	serviceAvailable: { type: Boolean },
	coverImage: { type: String },
	public_id: { type: String },
	rating: { type: Number },
	foods: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'food'
	}]
},{
	toJSON: {
		transform(_doc, ret){
			delete ret.password,
			delete ret.salt,
			delete ret.createdAt,
			delete ret.updatedAt
		}
	},
	timestamps: true,
	versionKey: false
});

const Vendor = mongoose.model<VendorDoc>('vendor', VendorSchema);

export { Vendor };