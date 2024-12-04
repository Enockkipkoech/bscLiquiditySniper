import 'dotenv/config';

export const config = {
	APP: {
		PORT: process.env.PORT,
		SERVER_URL: process.env.SERVER_URL,
		NODE_ENV: process.env.NODE_ENV,
	},
};
