import { Token } from '../utils/interfaces';
export const supportedTokens = (isTestnet: boolean = false): Array<Token> => {
	console.log('Testnet: ', isTestnet);
	if (isTestnet) {
		return [
			{
				symbol: 'USDT',
				address: '0xedf348C20E8B5C4a1270a3Ff961b42510494EaD5',
				decimals: 18,
				balance: (0.0).toString(),
				amountInUsd: (0.0).toString(),
				info: null,
			},
			{
				symbol: 'LINK',
				address: '0x84b9b910527ad5c03a9ca831909e21e236ea7b06',
				decimals: 18,
				balance: (0.0).toString(),
				amountInUsd: (0.0).toString(),
				info: null,
			},
			{
				symbol: 'BTCB',
				address: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
				decimals: 18,
				balance: (0.0).toString(),
				amountInUsd: (0.0).toString(),
				info: null,
			},
		];
	}
	return [
		{
			symbol: 'BTC',
			address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
			decimals: 18,
			balance: (0.0).toString(),
			amountInUsd: (0.0).toString(),
			info: null,
		},
		{
			symbol: 'ETH',
			address: '0x4DB5a66E937A9F4473fA95b1cAF1d1E1D62E29EA',
			decimals: 18,
			balance: (0.0).toString(),
			amountInUsd: (0.0).toString(),
			info: null,
		},

		{
			symbol: 'USDT',
			address: '0x55d398326f99059ff775485246999027b3197955',
			decimals: 6,
			balance: (0.0).toString(),
			amountInUsd: (0.0).toString(),
			info: null,
		},
		{
			symbol: 'BNB',
			address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
			decimals: 18,
			balance: (0.0).toString(),
			amountInUsd: (0.0).toString(),
			info: null,
		},
		{
			symbol: 'USDC',
			address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
			decimals: 6,
			balance: (0.0).toString(),
			amountInUsd: (0.0).toString(),
			info: null,
		},
	];
};
