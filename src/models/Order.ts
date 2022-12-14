import mongoose, { Schema, Document } from "mongoose";

export interface OrderDoc extends Document {
	orderId: string;
	items: [any];
	totalAmount: number;
	orderDate: Date;
	paidThrough: string;
	paymentResponse: string;
	orderStatus: string;
}

const OrderSchema = new Schema({
	orderId: { type: String, required: true },
	items: [
		{
			food: { type: Schema.Types.ObjectId, ref: "food", required: true },
			unit: { type: Number, required: true }
		}
	],
	totalAmount: { type: Number, required: true },
	orderDate: { type: Date },
	paidThrough: { type: String },
	paymentResponse: { type: String },
	orderStatus: { type: String },
},{
	toJSON: {
		transform(_doc, ret){
			delete ret.createdAt,
			delete ret.updatedAt
		}
	},
	timestamps: true,
	versionKey: false
});

const Order = mongoose.model<OrderDoc>('order', OrderSchema);

export { Order };