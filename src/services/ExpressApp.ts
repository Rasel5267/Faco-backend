import express, { Application } from "express";
import path from 'path';
import cors from 'cors';
import { AdminRoute, CustomerRoute, ShoppingRoute, VendorRoute } from '../routes';

export default async(app: Application) => {
	app.use(express.json());
	app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
	app.use(express.urlencoded({ extended: true }));

	app.use('/images', express.static(path.join(__dirname, 'images')));

	app.use('/admin', AdminRoute);
	app.use('/vendor', VendorRoute);
	app.use('/customer', CustomerRoute);
	app.use(ShoppingRoute);

	return app;
}
