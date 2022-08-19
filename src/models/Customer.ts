import mongoose, { Schema, Document } from "mongoose";
import { OrderDoc } from "./Order";

interface CustomerDoc extends Document {
	email: string;
	password: string;
	salt: string;
	firstName: string;
	lastName: string;
	address: string;
	phone: string;
	otp: number;
	otp_expiry: Date;
	verified: boolean;
	lat: number;
	lng: number;
	orders: [OrderDoc]
}

const CustomerSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	salt: { type: String, required: true },
	firstName: { type: String },
	lastName: { type: String },
	address: { type: String },
	phone: { type: String, required: true },
	otp: { type: Number, required: true },
	otp_expiry: { type: Date, required: true },
	verified: { type: Boolean, required: true},
	lat: { type: Number },
	lng: { type: Number },
	orders: [
		{
			type: Schema.Types.ObjectId,
			ref: 'order'
		}
	]
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

const Customer = mongoose.model<CustomerDoc>('customer', CustomerSchema);

export { Customer };