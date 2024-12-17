import mongoose from 'mongoose';
import { config } from '../config';
import { tgMessage } from '../TG/tgBot';

const connectDB = async () => {
	try {
		await mongoose.connect(config.APP.DB!, {
			connectTimeoutMS: 60000,
			socketTimeoutMS: 60000,
		});
		let message = '\n****BSC LIQUIDSNIPER DB Connection Successful****';
		console.log(message);
		// tgMessage(message);
	} catch (error) {
		let message = `Error BSC LIQUIDSNIPER DB Connection: ${error}`;
		console.log(message);
		// tgMessage(message);
	}
};

connectDB();
