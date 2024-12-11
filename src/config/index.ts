import 'dotenv/config';
import ethers, { WebSocketProvider } from 'ethers';

if (!process.env.WSS_URL) {
	throw new Error('WebSocket NOT Found!');
}
export const bscProvider = new WebSocketProvider(process.env.WSS_URL);

export const config = {
	APP: {
		PORT: process.env.PORT,
		SERVER_URL: process.env.SERVER_URL,
		NODE_ENV: process.env.NODE_ENV,
		DB: process.env.MONGO_URL,
	},
	PANCAKESWAP: {
		PROVIDER: bscProvider,
		ROUTER: `0x10ED43C718714eb63d5aA57B78B54704E256024E`.toLowerCase(),
		WBNB_ADDRESS: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
	},
	WALLET: {
		publicKey: process.env.PUBLIC_KEY,
		secretKey: process.env.SECRET_KEY,
	},
	TG: {
		botToken: process.env.BOT_TOKEN,
		users: process.env.TG_USERS,
	},
};
