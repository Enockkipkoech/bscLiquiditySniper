import 'dotenv/config';
import ethers, { WebSocketProvider, JsonRpcProvider } from 'ethers';
import { RPCManager } from '../ERC20';

if (!process.env.WSS_URL) {
	throw new Error('WebSocket NOT Found!');
}
export const bscWSSProvider = new WebSocketProvider(process.env.WSS_URL);
export const provider = new JsonRpcProvider(process.env.RPC_URL);

const config = {
	PROVIDER: provider,
	APP: {
		PORT: process.env.PORT,
		SERVER_URL: process.env.SERVER_URL,
		NODE_ENV: process.env.NODE_ENV,
		DB: process.env.MONGO_URL,
	},
	PANCAKESWAP: {
		PROVIDER: bscWSSProvider,
		ROUTER: `0x10ED43C718714eb63d5aA57B78B54704E256024E`.toLowerCase(),
		WBNB_ADDRESS: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
	},
	WALLET: {
		publicKey: process.env.PUBLIC_KEY,
		secretKey: process.env.SECRET_KEY,
	},
	TG: {
		botToken: process.env.BOT_TOKEN,
		users: process.env.TG_USERS,
	},
	TOKENS_TO_WATCH: {
		KYOTO: '0x69104fb28f4BB9f6efc899bd1d94f386CDF1b9dA',
	},
};

export { config };
