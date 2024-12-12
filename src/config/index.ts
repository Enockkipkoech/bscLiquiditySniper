import 'dotenv/config';
import ethers, { WebSocketProvider, JsonRpcProvider } from 'ethers';
// import { createPublicClient, webSocket, PublicClient } from 'viem';
// import { bsc } from 'viem/chains';

if (!process.env.WSS_URL) {
	throw new Error('WebSocket NOT Found!');
}
export const bscProvider = new WebSocketProvider(process.env.WSS_URL);
export const rpcProvider = new JsonRpcProvider(process.env.WSS_URL);

// VIEMS

// Create a public client using WebSocket transport
// const client: PublicClient = createPublicClient({
// 	chain: bsc,
// 	transport: webSocket(
// 		'wss://bnb-mainnet.g.alchemy.com/v2/bgYM0XRWoavlCkcn4O1qx1j8NAmR73nI'
// 	),
// });

export const config = {
	PROVIDER: bscProvider,
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
	TOKENS_TO_WATCH: {
		KYOTO: '0x69104fb28f4BB9f6efc899bd1d94f386CDF1b9dA',
	},
};
