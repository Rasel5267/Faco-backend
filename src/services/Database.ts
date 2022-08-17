import mongoose from "mongoose";
import { MONGO_URI } from '../config';

export default async () => {
	try {
		mongoose.connect(MONGO_URI).then(result => {
			if(result){
				console.log('DB Connected')
			}
		})
	} catch (error) {
		console.log(error)
	}
}