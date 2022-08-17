import 'dotenv/config';
import express from "express";
import App from './services/ExpressApp';
import dbConnection from './services/Database';
import { PORT } from './config';

const StartServer = async () => {
	const app = express();

	await dbConnection();

	await App(app);

	app.listen(PORT || 8000, () => {
		console.clear();
		console.log(`App is listening on port ${PORT}`);
	})
}

StartServer();

