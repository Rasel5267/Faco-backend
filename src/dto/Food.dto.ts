import path from 'path';
export interface CreateFoodInputs {
	name: string;
	description: string;
	category: string;
	foodTypes: string;
	readyTime: number;
	price: number;
}

export interface simple_array {
	path: string;
}